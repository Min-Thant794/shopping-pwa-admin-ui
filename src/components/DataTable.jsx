import React from 'react'
import RippleButton from './RippleButton'
import { MdEdit, MdDelete } from 'react-icons/md'

const DataTable = ({
    title,
    data,
    dataName,
    singularName,
    pluralName,
    editingId,
    editValue,
    setEditingId,
    setEditValue,
    onUpdate,
    onDelete
}) => {
  const dataLength = data?.length || 0

  return (
    <div className='px-3 w-full'>
        <div className='font-bold text-xl text-amber-50 pb-2 tracking-wide border-b-4 border-[#383838]'>
            {title}
        </div>
        <div className='flex flex-col gap-3 items-center'>
            <div>
            Total {dataLength} {dataLength > 1 ? pluralName : singularName} available in this store
            </div>
            <table className='table-fixed w-8/10 overflow-auto text-amber-50/80'>
            <thead>
                <tr className='flex justify-between rounded-lg text-lg border-b-4 border-[#707370] bg-[#262626]'>
                <th className='border-r-4 py-2 text-center border-[#707370] w-1/10 '>No.</th>
                <th className='text-center py-2 w-5/10 border-r-4 border-[#707370]'> {dataName} Name</th>
                <th className='text-center py-2 w-4/10'>Action</th>
                </tr>
            </thead>
            <tbody>
                {data?.map((item, index) => {
                const isEditing = editingId === item?._id
                return (
                    <tr
                    key={item?._id || index}
                    className={`flex items-center font-bold justify-between rounded-lg border-b-4 border-[#707370] ${index % 2 === 0 ? "bg-[#383838]" : "bg-[#616161]"}`}
                    >
                    <td className='border-r-4 text-center border-[#707370] w-1/10 px-10 py-2'>{index + 1}</td>
                    {!isEditing ?
                        <td className='w-5/10 px-10 py-2 text-center border-r-4 border-[#707370]'>{item?.name}</td>
                        :
                        <td className='w-5/10 px-10 py-2 border-r-4 border-[#707370]'>
                        <input
                        value={editValue}
                        onChange={(e) => setEditValue(e.target.value)}
                        className='w-full outline-none text-center' />
                        </td>
                    }

                    {!isEditing ?
                        <td
                        onClick={() => {
                            setEditingId(item?._id)
                            setEditValue(item?.name)
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
                            setEditingId(null)
                            setEditValue("")
                            }}
                            className='w-1/2 border-r-4 py-2 border-[#707370] active:opacity-70'>
                            Cancel
                        </div>
                        <div
                            onClick={() => {
                            onUpdate(item?._id, editValue)
                            setEditingId(null)
                            }}
                            className='w-1/2 py-2 active:opacity-70'>
                            Save
                        </div>
                        </td>
                    }
                    <td className='flex items-center justify-center w-2/10 px-10 py-2 text-center'>
                        <RippleButton
                        onClick={() => onDelete(item)}
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
  )
}

export default DataTable