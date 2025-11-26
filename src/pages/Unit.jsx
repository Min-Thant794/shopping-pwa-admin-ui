import React, { useEffect, useState } from 'react'
import { getAllUnit, addNewUnit, updateUnit, deleteUnit } from '../services/unit.service'
import { toast } from 'react-toastify';
import CreateForm from '../components/CreateForm';
import DataTable from '../components/DataTable';

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
      <CreateForm
        name = {unitName}
        setName = {setUnitName}
        handleNewName = {handleAddNewUnit}
        isLoading = {isLoading}
        labelName = "Create New Unit"
        placeHolder = "Enter Unit Name"
      />
      <DataTable
      title = "ALL UNITS"
      data = {allUnits}
      dataName = "Unit"
      singularName = "Unit"
      pluralName= "Units"
      editingId = {editingUnitId}
      editValue = {editUnitName}
      setEditingId = {setEditingUnitId}
      setEditValue = {setEditUnitName}
      onUpdate = {handleUpdateUnit}
      onDelete = {setDeleteTarget}
      />

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