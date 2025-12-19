import React, { useEffect, useState } from 'react'
import { getAllCategory } from '../services/category.service'
import { getAllUnit } from '../services/unit.service'
import { IoClose } from 'react-icons/io5'
import { createProduct, updateProduct } from '../services/product.service'

const ProductModal = ({ open, onClose, onSuccess, productToEdit }) => {
    const [ categories, setCategories ] = useState([]);
    const [ units, setUnits ] = useState([]);
    const [ loading, setLoading ] = useState(false);
    
    const isUpdate = !!productToEdit;

    const [ form, setForm ] = useState({
        name: "",
        modelNo: "",
        category: "",
        gender: "Unisex",
        discount: 0,
        size: [],
        variants: []
    });

    const [ images, setImages ] = useState([]);

    //Load product data
    useEffect(() => {
        if (productToEdit) {
            setForm({
                name: productToEdit.name || "",
                modelNo: productToEdit.modelNo || "",
                category: productToEdit.category || "",
                discount: productToEdit.discount  || "",
                size: productToEdit.size || [],
                variants: (productToEdit.variants || []).map((variant) => ({
                    color: variant.color || "#000000",
                    price: variant.price || ""
                }))
            });
        }
    }, [productToEdit]);

    //fetch category/ unit
    useEffect(() => {
        if (!open) return;
        
        (async () => {
            const category = await getAllCategory();
            const unit = await getAllUnit();
            setCategories(category.data || []);
            setUnits(unit.data || []);
        })();
    }, [open]);

    //handlers
    const handleInput = (e) => {
        const { name, value } = e.target;
        setForm({
            ...form,
            [name]: value
        });
    };

    const handleAddSize = () => setForm({
        ...form, size: [...form.size, { price: "", unit: ""}]
    });

    const handleRemoveSize = (idx) => {
        const updated = [...form.size];
        updated.splice(idx, 1);
        setForm({ ...form, size: updated });
    };

    const handleSizeChange = (idx, field, value ) => {
        const updated = [...form.size];
        updated[idx][field] = value;
        setForm({ ...form, size: updated });
    };

    const handleAddVariant = () => setForm({
        ...form,
        variants: [...form.variants, { color: "#000000", price: ""}]
    });

    const handleRemoveVariant = (idx) => {
        const updated = [...form.variants];
        updated.splice(idx, 1);
        setForm({ ...form, variants: updated });
    };

    const handleVariantChange = (idx, field, value) => {
        const updated = [...form.variants];
        if (field === "color") updated[idx][field] = value || "#000000"; //fallback to black
        else updated[idx][field] = value;
        setForm({ ...form, variants: updated });
    };

    const handleImageUpload = (e) => {setImages(
        Array.from(e.target.files)
    )};

    const handleSubmit = async () => {
        try {
            setLoading(true);
            const fd = new FormData();

            Object.entries(form).forEach(([Key, value]) => {
                if (Array.isArray(value)) {
                    fd.append(Key, JSON.stringify(value))
                } else {
                    fd.append(Key, value);
                }
            });

            if (Array.isArray(images) && images.length > 0) {
                images.forEach((img) => fd.append("images", img));
            }

            let response;
            if (isUpdate) {
                response = await updateProduct(fd, productToEdit._id);
            } else {
                response = await createProduct(fd);
            }

            onSuccess(response.data);
            onClose();
            setForm({
                name: "",
                modelNo: "",
                category: "",
                gender: "Unisex",
                discount: 0,
                size: [],
                variants: []
            });

            setImages([]);
        } catch (error) {
            console.log("Submit error: ", error);
            alert("Failed to save product");
        } finally {
            setLoading(false);
        }
    };

    if (!open) {
        return null;
    }

  return (
    <div className='fixed inset-0 bg-black/40 flex items-center justify-center z-50'>
        <div className='bg-white max-h-[90vh] overflow-auto w-full max-w-3xl rounded-xl shadow-lg p-6 relative'>
            {/* header */}
            <div className='flex justify-between items-center border-b pb-3 mb-4'>
                <h2 className='text-lg font-semibold tracking-tight'>
                    {isUpdate ? "Update Product" : "Create Product"}
                </h2>
                <button onClick={onClose} className='hover:bg-gray-100 p-1 rounded'>
                    <IoClose size={24} className='text-gray-600' />
                </button>
            </div>

            {/* form grid */}
            <div className='grid grid-cols-2 gap-4'>
                <div>
                    <label className='text-xs font-medium text-gray-600'>Product Name</label>
                    <input 
                    type="text" name='name' value={form.name} 
                    onChange={handleInput}
                    className='w-full mt-1 border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 rounded-md px-2.5 py-1.5 text-sm'
                    />
                </div>

                <div>
                    <label className='text-xs font-medium text-gray-600'>Model No</label>
                    <input type="text" name='name' value={form.name} 
                    onChange={handleInput} 
                    className='w-full mt-1 border border-gray-300 focus:border-blue-500 rounded-md px-2.5 py-1.5 text-sm' 
                    />
                </div>

                <div>
                    <label className='text-xs font-medium text-gray-600'>Category</label>
                    <select name="category" value={form.category}
                    onChange={handleInput}
                    className='w-full mt-1 border border-gray-300 focus:ring-2 focus:ring-blue-500 rounded-md px-2.5 py-1.5 text-sm'
                    >
                        <option value="">Select</option>
                        {categories.map((c) => 
                            <option key={c._id} value={c.name}>
                                {c.name}
                            </option>
                        )};
                    </select>
                </div>

                <div>
                    <label className='text-xs font-medium text-gray-600'>
                        Gender
                    </label>
                    <select name="gender" value={form.gender} 
                    onChange={handleInput}
                    className='w-full mt-1 border border0gray-300 focus:ring-2 focus:ring-blue-500 rounded-md px-2.5 py-1.5 text-sm'
                    >
                        <option value="Men">Men</option>
                        <option value="Women">Women</option>
                        <option value="Unisex">Unisex</option>
                    </select>
                </div>

                <div>
                    <label className='text-xs font-medium text-gray-600'>Discount (%)</label>
                    <input type="number" name='discount' value={form.discount}
                    onChange={handleInput}
                    className='w-full mt-1 border border-gray-300 focus:ring-2 focus:ring-blue-500 rounded-md px-2.5 py-1.5 text-sm'
                    />
                </div>

                <div>
                    <label className='text-xs font-medium text-gray-600'>Images</label>
                    <input type="file"
                    onChange={handleImageUpload}
                    className='w-full mt-1 border border-gray-300 rounded-md px-2.5 py-1.5 text-sm'
                    />
                </div>
            </div>

            {/* sizes */}
            <div className='mt-6'>
                <div className='flex justify-between mb-1'>
                    <h3 className='text-sm font-semibold'>
                        Sizes
                    </h3>
                    <button
                    onClick={handleAddSize}
                    className='text-blue-600 text-sm hover:underline'
                    >
                        + Add
                    </button>
                </div>
                {form.size.map((s, idx) => (
                    <div key={idx}
                    className='grid grid-cols-3 gap-3 p-3 border border-gray-200 rounded-md bg-gray-50 mt-2'
                    >
                        <input type="number" placeholder='Price' value={s.price}
                        onChange={(e) => handleSizeChange(idx, "price", e.target.value)}
                        className='border border-gray-300 rounded-md px-2 py-1.5 text-sm'
                        />
                        <select value={s.unit} 
                        onChange={(e) => handleSizeChange(idx, "unit", e.target.value)}
                        className='border border-gray-300 rounded-md px-2 py-1.5 text-sm'
                        >
                            <option value="">
                                Unit
                            </option>
                            {units.map((u) => <option key={u._id} value={u.name}>{u.name}</option>)}
                        </select>
                        <button
                        onClick={() => handleRemoveSize(idx)}
                        className='bg-red-500 hover:border-red-600 text-white rounded-md text-sm'
                        >
                            Remove
                        </button>
                    </div>
                ))}
            </div>

            {/* variants */}
            <div className='mt-6'>
                <div className='flex justify-between mb-1'>
                    <h3 className='text-sm font-semibold'>Variants</h3>
                    <button
                    onClick={handleAddVariant}
                    className='text-blue-600 text-sm hover:underline'
                    >
                        +  Add
                    </button>
                    {form.variants.map((v, idx) => (
                        <div>
                            <div>
                                <input type="number" placeholder="Price" value={v.price}
                                onChange={(e) => handleVariantChange(idx, "price", e.target.value)}
                                className='border border-gray-300 rounded-md px-2 py-1.5 text-sm'
                                />
                                <span>{v.color}</span>
                            </div>
                            <input type="number" placeholder='Price' value={v.price}
                            onChange={(e) => handleVariantChange(idx, "price", e.target.value)}
                            className='border border-gray-300 rounded-md px-2 py-1.5 text-sm'
                            />
                            <button
                            onClick={() => handleRemoveVariant(idx)}
                            className='bg-red-500 hover:bg-red-600 text-white rounded-md text-sm'
                            >
                                Remove
                            </button>
                        </div>
                    ))}
                </div>
                
                {/* submit */}
                <div>
                    <button disabled={loading} onClick={handleSubmit}
                    className='px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-sm font-medium'
                    >
                        {loading ? "Saving..." : isUpdate ? "Update Product" : "Create Product"}
                    </button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default ProductModal