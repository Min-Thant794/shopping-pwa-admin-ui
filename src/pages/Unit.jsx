import React, { useEffect, useState } from 'react'
import { getAllUnit } from '../services/unit.service'
import RippleButton from '../components/RippleButton'
import { MdEdit, MdDelete } from "react-icons/md";

const Unit = () => {
  const[allUnits, setAllUnits] = useState([])
  const[unitName, setUnitName] = useState("")
  const[isEdit, setIsEdit] = useState(false)
  const handleFetchAllUnits = async () => {
    try {
      const response = await getAllUnit()
      if(response.success){
        setAllUnits(response.data)
      }
    } catch (error) {
      console.log("Error Occurred During Fetching Units", error)
    }
  }

  useEffect(()=> {
    handleFetchAllUnits()
  }, [])

  const addNewUnit = () => {
    try {
      
    } catch (error) {
      
    }
  }

  const unitLength = allUnits.length;

  return (
    <div className='flex flex-col gap-5 items-center justify-center'>
      <form 
      action="" 
      onSubmit={(e) => {
        e.preventDefault()
        addNewUnit()}}
      className='flex p-3 items-center gap-5 w-full text-amber-50'>
        <label htmlFor="" className='border-l-4 border-t-4 border-[#383838] rounded-md p-3 text-xl font-bold text-center'>Create New Unit</label>
        <input 
        type="text" 
        placeholder='Enter Unit Name' 
        value={unitName} 
        onChange={(e) => setUnitName(e.target.value)}
        className='outline-none border-r-4 rounded-md border-b-4 font-bold placeholder:text-right placeholder:text-lg text-right text-md border-[#383838] p-3' />
        <RippleButton className={`py-2 px-7 font-semibold rounded-md cursor-pointer bg-[#383838] active:opacity-80`}>
          Add
        </RippleButton>
      </form>
      <div className='px-3 w-full'>
        <div className='font-bold text-xl text-amber-50 pb-2 tracking-wide border-b-4 border-[#383838]'>
          ALL UNITS
        </div>
        <div className='flex flex-col gap-3 items-center'>
          <div>
            Total {unitLength} {unitLength > 1 ? "Units" : "Unit"} available in this store
          </div>
          <table className='table-fixed w-8/10 text-amber-50/80'>
            <thead>
              <tr className='flex justify-between rounded-lg text-lg border-b-4 border-[#707370] bg-[#262626]'>
                <th className='border-r-4 py-2 text-center border-[#707370] w-1/10 '>No.</th>
                <th className='text-center py-2 w-5/10 border-r-4 border-[#707370]'>Unit Name</th>
                <th className='text-center py-2 w-4/10'>Action</th>
              </tr>
            </thead>
            <tbody>
              {
                allUnits?.map((unit, index) => {
                  return(
                    <tr 
                    key={index}
                    className={`flex items-center font-bold justify-between rounded-lg border-b-4 border-[#707370] ${index % 2 === 0 ? "bg-[#383838]" : "bg-[#616161]"}`}
                    >
                      <td className='border-r-4 text-center border-[#707370] w-1/10 px-10 py-2'>{index + 1}</td>
                      {
                        isEdit ?
                        <td className='w-5/10 px-10 py-2 text-center border-r-4 border-[#707370]'>{unit?.name}</td>
                        :
                        <input className='w-5/10 px-10 py-2 outline-none text-center border-r-4 border-[#707370]'/>
                      }
                      {
                        isEdit ?
                        <td 
                        onClick={() => setIsEdit(!isEdit)}
                        className='flex items-center justify-center cursor-pointer active:opacity-70 gap-2 w-2/10 px-10 py-2 text-center border-r-4 border-[#707370]'>
                          Edit 
                          <MdEdit />
                        </td>
                        :
                        <td
                        className='flex items-center justify-center cursor-pointer w-2/10 text-center border-r-4 border-[#707370]'>
                          <div
                          onClick={() => {setIsEdit(!isEdit)}}
                          className='w-1/2 border-r-4 py-2 border-[#707370] active:opacity-70'>
                            Cancel
                          </div>
                          <div
                          onClick={() => {setIsEdit(!isEdit)}}
                          className='w-1/2 py-2 active:opacity-70'>
                            Save
                          </div>
                        </td>
                      }
                      <td className='flex items-center justify-center cursor-pointer active:opacity-70 gap-2 w-2/10 px-10 py-2 text-center'>Delete <MdDelete /></td>
                    </tr>
                )
              })
              }
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default Unit