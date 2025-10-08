import React, { useEffect, useState } from 'react'
import { getAllUnit, addNewUnit, updateUnit, deleteUnit } from '../services/unit.service'
import RippleButton from '../components/RippleButton'
import { MdEdit, MdDelete } from "react-icons/md";
import { toast } from 'react-toastify';

const Unit = () => {
  const [allUnits, setAllUnits] = useState([])
  const [unitName, setUnitName] = useState("")
  const [editingUnitId, setEditingUnitId] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [editUnitName, setEditUnitName] = useState("")
  const [deleteTarget, setDeleteTarget] = useState(null)

  const handleFetchAllUnits = async () => {
    try {
      setIsLoading(true)
      const response = await getAllUnit()
      if (response.success) {
        setAllUnits(response.data)
      }
    } catch (error) {
      console.log("Error Occurred During Fetching Units", error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    handleFetchAllUnits()
  }, [])

  const handleAddNewUnit = async () => {
    if (unitName.trim() === "") return;
    try {
      setIsLoading(true);
      const response = await addNewUnit({ name: unitName });
      if (response?.success) {
        toast.success(response?.message);
        setAllUnits(prev => [...prev, response.data]);
        setUnitName("");
      }
    } catch (error) {
      console.log("Error at addNewUnit", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateUnit = async (unitId, newName) => {
    if (newName.trim() === "") {
      toast.error("Unit name cannot be empty")
      return
    }

    setAllUnits(prev =>
      prev.map(unit =>
        unit._id === unitId ? { ...unit, name: newName } : unit
      )
    )

    setEditingUnitId(null)
    setEditUnitName("")

    try {
      const response = await updateUnit(unitId, { name: newName })
      response?.success && toast.success(response.message)
    } catch (error) {
      console.log("Error at updateUnit", error)
      toast.error("Failed to update unit")
    }
  }

  const handleDeleteUnit = async (unitId) => {
    setAllUnits(prev => prev.filter(unit => unit._id !== unitId));
    setDeleteTarget(null);

    try {
      const response = await deleteUnit(unitId);
      if(response?.success){
        toast.success(response.message)
      }
    } catch (error) {
      console.log("Error at deleteUnit", error);
      toast.error("Error deleting unit");
    } finally {
      setIsLoading(false);
    }
  };

  const unitLength = allUnits.length;

  return (
    <div className='flex flex-col relative gap-5 items-center justify-center'>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          handleAddNewUnit()
        }}
        className='flex p-3 items-center gap-5 w-full text-amber-50'>
        <label className='border-l-4 border-t-4 border-[#383838] rounded-md p-3 text-xl font-bold text-center'>Create New Unit</label>
        <input
          type="text"
          placeholder='Enter Unit Name'
          value={unitName}
          onChange={(e) => setUnitName(e.target.value)}
          className='outline-none border-r-4 rounded-md border-b-4 font-bold placeholder:text-right placeholder:text-lg text-right text-md border-[#383838] p-3' />
        <RippleButton
          onClick={handleAddNewUnit}
          className={`py-2 px-7 font-semibold rounded-md cursor-pointer bg-[#383838] active:opacity-80`}>
          Add
        </RippleButton>
        {
          isLoading && <div className='p-3 animate-spin rounded-full border-2 border-dotted border-l-white border-b-red-500 border-r-black'></div>
        }
      </form>

      <div className='px-3 w-full'>
        <div className='font-bold text-xl text-amber-50 pb-2 tracking-wide border-b-4 border-[#383838]'>
          ALL UNITS
        </div>
        <div className='flex flex-col gap-3 items-center'>
          <div>
            Total {unitLength} {unitLength > 1 ? "Units" : "Unit"} available in this store
          </div>
          <table className='table-fixed w-8/10 overflow-auto text-amber-50/80'>
            <thead>
              <tr className='flex justify-between rounded-lg text-lg border-b-4 border-[#707370] bg-[#262626]'>
                <th className='border-r-4 py-2 text-center border-[#707370] w-1/10 '>No.</th>
                <th className='text-center py-2 w-5/10 border-r-4 border-[#707370]'>Unit Name</th>
                <th className='text-center py-2 w-4/10'>Action</th>
              </tr>
            </thead>
            <tbody>
              {allUnits?.map((unit, index) => {
                const isEditing = editingUnitId === unit?._id
                return (
                  <tr
                    key={unit?._id || index}
                    className={`flex items-center font-bold justify-between rounded-lg border-b-4 border-[#707370] ${index % 2 === 0 ? "bg-[#383838]" : "bg-[#616161]"}`}
                  >
                    <td className='border-r-4 text-center border-[#707370] w-1/10 px-10 py-2'>{index + 1}</td>
                    {!isEditing ?
                      <td className='w-5/10 px-10 py-2 text-center border-r-4 border-[#707370]'>{unit?.name}</td>
                      :
                      <td className='w-5/10 px-10 py-2 border-r-4 border-[#707370]'>
                        <input
                        value={editUnitName}
                        onChange={(e) => setEditUnitName(e.target.value)}
                        className='w-full outline-none text-center' />
                      </td>
                    }

                    {!isEditing ?
                      <td
                        onClick={() => {
                          setEditingUnitId(unit?._id)
                          setEditUnitName(unit?.name)
                        }}
                        className='flex items-center justify-center cursor-pointer active:opacity-70 w-2/10 px-10 py-2 text-center border-r-4 border-[#707370]'>
                        <div className='w-full flex items-center justify-center gap-2'>
                          Edit
                          <MdEdit />
                        </div>
                      </td>
                      :
                      <td className='flex items-center justify-center cursor-pointer w-2/10 text-center border-r-4 border-[#707370]'>
                        <div
                          onClick={() => {
                            setEditingUnitId(null)
                            setEditUnitName("")
                          }}
                          className='w-1/2 border-r-4 py-2 border-[#707370] active:opacity-70'>
                          Cancel
                        </div>
                        <div
                          onClick={() => {
                            handleUpdateUnit(unit?._id, editUnitName)
                            setEditingUnitId()
                          }}
                          className='w-1/2 py-2 active:opacity-70'>
                          Save
                        </div>
                      </td>
                    }
                    <td className='flex items-center justify-center w-2/10 px-10 py-2 text-center'>
                      <RippleButton
                        onClick={() => setDeleteTarget(unit)}
                        className='flex items-center justify-center gap-2 cursor-pointer text-white font-semibold px-3 py-1 rounded-md active:opacity-80'>
                        Delete <MdDelete />
                      </RippleButton>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>

      {deleteTarget && (
        <div className='flex flex-col absolute top-65 bg-[#262626] p-6 rounded-lg shadow-lg border-2 border-[#707370] text-amber-50'>
          <div className='text-lg font-semibold'>
            Confirm Deletion
          </div>
          <div className='my-5'>
            Are you sure you want to delete <span className='font-bold text-red-400'>{deleteTarget.name}</span>?
          </div>
          <div className='flex justify-between'>
            <button
              onClick={() => setDeleteTarget(null)}
              className='bg-gray-600 hover:bg-gray-700 px-4 py-2 rounded-md'>
              Cancel
            </button>
            <button
              onClick={() => handleDeleteUnit(deleteTarget._id)}
              className='bg-red-600 hover:bg-red-700 px-4 py-2 rounded-md'>
              Confirm Delete
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default Unit