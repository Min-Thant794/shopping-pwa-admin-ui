import React, { useEffect, useState } from 'react'
import { deleteProduct, getProduct } from '../services/product.service';
import { resolveImageUrl } from '../helpers/helper';
import { API_ROUTES } from '../config/config';
import ProductModal from '../components/ProductModal';
import { MdDeleteSweep, MdEditNote } from 'react-icons/md';
import { IoAddCircleOutline } from 'react-icons/io5';

const Product = () => {

  const [products, setProducts] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [productToEdit, setProductToEdit] = useState(null);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await getProduct();
      setProducts(response.data || []);
    } catch (error) {
      console.log("Fetching products error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const openUpdateModel = (product) => {
    setProductToEdit(product);
    setIsOpen(true);
  }

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this product?");
    if (!confirmDelete) return;
    try {
      await deleteProduct(id);
      fetchProducts();
    } catch (error) {
      console.log("Delete product error: ", error);      
    }
  };

  return (
    <div className='p-6'>
      {/* header */}
      <div>

        {/* create */}

          <button
            onClick={() => {
              setProductToEdit(null);
              setIsOpen(true);
            }}
            className='flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded0md text-sm hover:bg-blue-700 transition'
          >
            <IoAddCircleOutline size={18}/>
            Add Product
          </button>

      </div>

      {/* table  */}
      <div className='bg-[#383838] shadow-sm border border-gray-100 rounded-lg overflow-hidden'>
        <table className='w-full text-left text-sm'>
          <thead className='bg-[#383838] border-b border-gray-200'>
            <tr className='text-amber-50 font-semibold tracking-wide'>
              <th className='px-4 py-3 font-medium'>Image</th>
              <th className='px-4 py-3 font-medium'>Name</th>
              <th className='px-4 py-3 font-medium'>Model No.</th>
              <th className='px-4 py-3 font-medium'>Category</th>
              <th className='px-4 py-3 font-medium'>Gender</th>
              <th className='px-4 py-3 font-medium'>Discount</th>
              <th className='px-4 py-3 font-medium'>Actions</th>
            </tr>
          </thead>
          <tbody className='bg-[#383838] text-amber-50'>
                {loading ? (
                    <tr>
                        <td colSpan="7" className="text-center p-6 text-gray-500">
                            Loading products...
                        </td>
                    </tr>
                ) : products.length === 0 ? (
                    <tr>
                        <td colSpan="7" className="text-center p-6 text-gray-500">
                            No products found.
                        </td>
                    </tr>
                ) : (
                    products.map((p) => (
                        <tr key={p._id} className="border-b-2 border-black/5 hover:bg-gray-50 transition">
                            <td className="px-4 py-3">
                                {p?.imageUrls?.length > 0 ? (
                                    <img
                                        src={resolveImageUrl(p.imageUrls[0], API_ROUTES.LOCAL_SERVER_URL)}
                                        alt={p.name}
                                        className="h-10 w-10 object-cover rounded-md border-2 border-black/20"
                                    />
                                ) : (
                                    <div className="h-10 w-10 bg-gray-200 rounded-md" />
                                )}
                            </td>

                            <td className="px-4 py-3 font-medium text-gray-800">
                                {p.name}
                            </td>

                            <td className="px-4 py-3 text-gray-600">{p.modelNo}</td>
                            <td className="px-4 py-3 text-gray-600">{p.category}</td>

                            <td className="px-4 py-3">
                                <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">
                                    {p.gender}
                                </span>
                            </td>

                            <td className="px-4 py-3">
                                {p.discount > 0 ? (
                                    <span className="text-red-600 font-semibold">
                                        {p.discount}%
                                    </span>
                                ) : (
                                    <span className="text-gray-600">0%</span>
                                )}
                            </td>

                            <td className="px-4 py-3 flex justify-end gap-2">
                                <button
                                    onClick={() => openUpdateModel(p)}
                                    className="px-3 py-1.5 bg-yellow-500 text-white text-xs rounded hover:bg-yellow-600 transition"
                                >
                                    <MdEditNote />
                                </button>

                                <button
                                    onClick={() => handleDelete(p._id)}
                                    className="px-3 py-1.5 bg-red-600 text-white text-xs rounded hover:bg-red-700 transition"
                                >
                                    <MdDeleteSweep />
                                </button>
                            </td>
                        </tr>
                    ))
                )}
            </tbody>
        </table>
      </div>

      {/* modal */}
      <ProductModal
        open={isOpen}
        onClose={() => {
          setIsOpen(false);
          setProductToEdit(null);
        }}
        onSuccess={() => fetchProducts()}
        productToEdit={productToEdit}
      />
    </div>
  )
}

export default Product
