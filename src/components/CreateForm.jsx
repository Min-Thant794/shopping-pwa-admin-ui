import React from 'react'
import RippleButton from './RippleButton'

const CreateForm = ({
    name,
    setName,
    handleNewName,
    isLoading,
    labelName,
    placeHolder
}) => {
  return (
    <form
        onSubmit={(e) => {
        e.preventDefault()
        handleNewName()
        }}
        className='flex p-3 items-center gap-5 w-full text-amber-50'>
        <label className='border-l-4 border-t-4 border-[#383838] rounded-md p-3 text-xl font-bold text-center'>{labelName}</label>
        <input
        type="text"
        placeholder= {placeHolder}
        value={name}
        onChange={(e) => setName(e.target.value)}
        className='outline-none border-r-4 rounded-md border-b-4 font-bold placeholder:text-right placeholder:text-lg text-right text-md border-[#383838] p-3' />
        <RippleButton
        className={`py-2 px-7 font-semibold rounded-md cursor-pointer bg-[#383838] active:opacity-80`}>
        Add
        </RippleButton>
        {
        isLoading && <div className='p-3 animate-spin rounded-full border-2 border-dotted border-l-white border-b-red-500 border-r-black'></div>
        }
    </form>
  )
}

export default CreateForm