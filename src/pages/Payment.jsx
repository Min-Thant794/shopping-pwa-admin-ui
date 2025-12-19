import React, { useState } from 'react'
import { FaPencil } from 'react-icons/fa6'
import { TiDelete } from 'react-icons/ti'
import {
    getAllPayments,
    createPayment,
    updatePayment,
    deletePayment
} from '../services/payment.service'
import { toast } from 'react-toastify'
import { useUser } from '../context/UserContext'
import { Trophy } from 'lucide-react'

const Payment = () => {
  const [paymentName, setPaymentName] = useState("");
  const [paymentNumber, setPaymentNumber] = useState("");
  const [allPayments, setAllPayments] = useState([]);
  const [updatingPaymentId, setUpdatingPaymentId] = useState();
  const { userData } = useUser()

  useEffect(() => {
    handleGetAllPayments();
  }, [])

  //format card number into XXXX XXXX XXXX XXXX (display only)
  const formatCard = (value) => {
    if (!value) return "";
    const digits = Stirng(value).replace(/\D/g, "");
    return digits.match(/.{1,4}/g)?.join("") || digits;
  };

  //remove spaces (clean number for API)
  const cleanNumber = (formatted) => (formatted ? formatted.replace(/\s/g, "") : "");

  //Input change handler (keeps grouped format while typing)
  const handleCardChange = (e) => {
    const raw = e.target.value;
    setPaymentNumber(formatCard(raw));
  };

  const addOrUpdatePayment = async () => {
    if (!paymentName.trim() || !paymentNumber.trim()) return;

    try {
        const payload = {
            name: paymentName,
            number: cleanNumber(paymentNumber) // send clean digits
        };

        const response = updatingPaymentId
        ? await updatePayment(updatingPaymentId, payload)
        :
        await createPayment(payload);

        if (response.success) {
            toast.success(response.message);

            //ensure displayed number is formatted
            const respData = {
                ...response.data,
                number: formatCard(response.data.number)
            };

            const updatedData = updatingPaymentId?
            allPayments.map(p => (p._id === updatingPaymentId ? respData : p))
            :
            [...allPayments, respData];

            setAllPayments(updatedData);
            setPaymentName(""),
            setPaymentNumber(""),
            setUpdatingPaymentId();
        }
    } catch (error) {
        console.log("error addOrUpdatePayment()", error);
    }
  };

  const handleGetAllPayments = async () => {
    try {
        try {
            const response = await getAllPayments(userData._id);
            if (response.success) {
                const withFormat = response.data.map(p => ({
                    ...p,
                    number: formatCard(p.number)
                }));
                setAllPayments(withFormat);
            } else {
                setAllPayments([]);
            }
        } catch (error) {
            console.log("error handleGetAllPayment", error);
        }
    } catch (error) {
        console.log("error handleGetAllPayments", error);
    }
  };

  const handleDeletePayment = async (id) => {
    try {
        const response = await deletePayment(id);
        if (response.success) {
            toast.success(response.message);
            setAllPayments(allPayments.filter(item => item._id !== id));
        }
    } catch (error) {
        console.log("handleDeletePayment", error);
    }
  };

  return (
    <div className='p-6'>
        <div className='text-lg font-semibold bg-gradient-to-r from-blue-600 to-indigo-500 text-white px-4 py-2 rounded-md w-fit shadow-md'>
            Add New Payment
        </div>

        {/* FORM */}
        <form onSubmit={(e) => {
            e.preventDefault();
            addOrUpdatePayment();
        }}
        className='flex gap-3 mt-4 flex-wrap'
        >
            <input 
            type="text"
            value={paymentName}
            placeholder='Payment name'
            onChange={(e) => {
                setPaymentName(e.target.value)
            }}
            className='border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none bg-gray-50'
            />

            <input 
            type="text"
            value={paymentNumber}
            placeholder="Card number (xxxx xxxx xxxx xxxx)"
            onChange={handleCardChange}
            maxLength={23} //allow spaces, flexible length
            className='border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none bg-gray-50'
            />

            <button
            className='bg-blue-600 text-white px-5 rounded-lg shadow hover:bg-blue-700 active:scale-95 transition'
            >
                {updatingPaymentId ? "Update" : "Add"}
            </button>
        </form>

        {/* list header */}
        <div className='mt-10 text-lg font-semibold bg-gradient-to-r from-indigo-600 to-blue-500 text-white px-4 py-2 rounded-md w-fit shadow-md'>
            Payment List
        </div>

        {/* payment list */}
        <div>
            {/* table header */}
            <div className='grid grid-cols-4 px-4 py-2 bg-gray-200 rounded-md shadow-sm text-gray-700 font-medium'>
                <div>No</div>
                <div>Name</div>
                <div>Number</div>
                <div className='text-center'>Action</div>
            </div>

            {/* items */}
            {allPayments.map((item, index) => (
                <div
                key={item._id ?? index}
                className={`grid grid-cols-4 items-center px-4 py-3 mt-2 rounded-md transition ${index % 2 === 0 ? "bg-gray-50" : "bg-gray-100"} shadow-sm`}
                >
                    {updatingPaymentId === item._id ? (
                        <div className='col-span-3 text-blue-600 font-medium'>
                            UPdating...
                        </div>
                    ) : (
                      <div>
                        <div>{index + 1}</div>
                        <div className='font-medium'>{item.name}</div>
                        <div className='font-medium'>{formatCard(item.number)}</div>
                      </div>  
                    )}

                    {/* actions */}
                    <div className='flex justify-center gap-3'>
                        {updatingPaymentId === item._id ? (
                        <button
                        onClick={() => {
                            setUpdatingPaymentId();
                            setPaymentName("");
                            setPaymentNumber("");
                        className="text-sm bg-yellow-400 px-3 py-1 rounded-md text-gray-900 shadow cursor-pointer"
                        }}
                        >
                            Cancel
                        </button>
                        )
                        :
                        (
                        <FaPencil
                            className='text-blue-500 cursor-pointer hover:text-blue-700 transition'
                            onClick={() => {
                                setUpdatingPaymentId(item._id);
                                setPaymentName(item.name);
                                setPaymentNumber(formatCard(item.number));
                            }}
                        />
                        )}

                        <TiDelete
                            className='text-red-500 text-xl cursor-pointer hover:text-red-700 transition'
                            onClick={() => handleDeletePayment(item._id)}
                        />
                    </div>
                </div>
            ))}
        </div>
    </div>
  )
}

export default Payment