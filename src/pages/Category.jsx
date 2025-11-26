import React, { useEffect, useState } from 'react'
import CreateForm from '../components/CreateForm'
import { getAllCategory, addNewCategory, updateCategory, deleteCategory } from '../services/category.service'
import { toast } from 'react-toastify';
import DataTable from '../components/DataTable'

const Category = () => {

  const[allCategories, setAllCategories] = useState([])
  const[categoryName, setCategoryName] = useState("")
  const[isLoading, setIsLoading] = useState(false)
  const[editingCategoryId, setEditingCategoryId] = useState(null)
  const[editCategoryName, setEditCategoryName] = useState("")
  const[deleteTarget, setDeleteTarget] = useState(null)

  const handleFetchAllCategories = async () => {
    try {
      setIsLoading(true)
      const response = await getAllCategory()
      if(response.success){
        setAllCategories(response.data)
      }
      console.log("Response category", response.data)
    } catch (error) {
      console.log("Error Occurred During Fetching Categories", error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    handleFetchAllCategories()
  }, [])

  const handleAddNewCategory = async () => {
      if (categoryName.trim() === "") return;
      try {
        setIsLoading(true);
        const response = await addNewCategory({ name: categoryName });
        if (response?.success) {
          toast.success(response?.message);
          setAllCategories(prev => [...prev, response.data]);
          setCategoryName("");
        }
      } catch (error) {
        console.log("Error at addNewCategory", error);
      } finally {
        setIsLoading(false);
      }
    };

  const handleUpdateCategory = async(categoryId, newName) => {
    if (newName.trim() === ""){
      toast.error("Category name cannot be empty!")
      return
    }

    setAllCategories(prev =>
      prev.map(category =>
        category._id === categoryId ? { ...category, name: newName } : category
      )
    )

    setEditingCategoryId(null)
    setEditCategoryName("")
    try {
      const response = await updateCategory(categoryId, {name: newName})
      response?.success && toast.success(response.message)
      console.log("Updating category: ")
    } catch (error) {
      console.log("Error Updating Category: ", error)
      toast.error("Failed to update category!")
    }
  }

  const handleDeleteCategory = async (categoryId) => {
    setAllCategories(prev => prev.filter(category => category._id !== categoryId));
    setDeleteTarget(null);

    try {
      const response = await deleteCategory(categoryId);
      if(response?.success){
        toast.success(response.message)
      }
    } catch (error) {
      console.log("Error Deleting Category", error)
      toast.error("Failed to delete category");
    }
  }

  return (
    <div>
      <CreateForm
        name={categoryName}
        setName={setCategoryName}
        handleNewName={handleAddNewCategory}
        isLoading={isLoading}
        labelName="Create New Category"
        placeHolder="Enter Category Name"
      />
      <DataTable
      title="ALL CATEGORIES"
        data={allCategories}
        dataName="Category"
        singularName="Category"
        pluralName="Categories"
        editingId={editingCategoryId}
        editValue={editCategoryName}
        setEditingId={setEditingCategoryId}
        setEditValue={setEditCategoryName}
        onUpdate={handleUpdateCategory}
        onDelete={setDeleteTarget}
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
              onClick={() => handleDeleteCategory(deleteTarget._id)}
              className='bg-red-600 hover:bg-red-700 px-4 py-2 rounded-md'>
              Confirm Delete
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default Category