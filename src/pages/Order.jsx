import React, { useCallback, useEffect, useState } from 'react'
import io from "socket.io-client"
import { getItemFromLocalStorage } from '../helpers/helper'
import { API_ROUTES, STORAGE_KEY } from '../config/config'
import axiosInstance from '../config/axiosInstance'

//initialize socket outside
const socket = io(API_ROUTES.LOCAL_SERVER_URL, { transports: ["websocket"]});


const Order = () => {

  const userData = getItemFromLocalStorage(STORAGE_KEY.USER_DATA);
  const shopId = userData?._id;
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  //1. fetching logic
  useEffect(() => {
    const fetchOrders = async () => {
      if(!shopId) return;
      try {
        const response = await axiosInstance.get(`${API_ROUTES.GET_ALL_ORDER}`);
        const fetchedOrders = response.data?.data || response.data || [];
        //sort by newest first (assuming _id or createdAt)
        setOrders(Array.isArray(fetchedOrders) ? fetchedOrders.reverse() : []);
      } catch (error) {
        console.log("Failed to fetch orders: ", error);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, [shopId]);

  //2. state update logic
  const updateLocalOrder = useCallback((updatedOrder) => {
    setOrders((prev) => {
      const exists = prev.find((o) => o._id === updatedOrder._id);
      if (exists) {
        return prev.map((o) => (o._id === updatedOrder._id ? updatedOrder : o));
      }
      return [updatedOrder, ...prev];
    });
  }, []);

  const changeStatus = (orderId, status) => {
    socket.emit("update_order_status", {orderId, status});
  };

  //3. socket logic
  useEffect(() => {
    if (!shopId) return;
    socket.emit("join_shop", { shopId });

    const handleConnect = () => socket.emit("join_shop", { shopId });
    const handleOrderUpdate = (order) => updateLocalOrder(order);

    socket.on("connect", handleConnect);
    socket.on("order_created", handleOrderUpdate);
    socket.on("order_updated", handleOrderUpdate);
    socket.on("order_status_update", handleOrderUpdate);

    return () => {
      socket.off("connect", handleConnect);
      socket.off("order_created", handleOrderUpdate);
      socket.off("order_updated", handleOrderUpdate);
      socket.off("order_status_update", handleOrderUpdate);
    }
  }, [shopId, updateLocalOrder]);

  // 4. UI Helpers
  // Get color styles for status badges
  const getStatusStyles = (status) => {
    switch (status) {
      case "confirmed" : return "bg-green-100 text-green-700 border-green-200";
      case "completed" : return "bg-green-100 text-blue-700 border-blue-200";
      case "rejected" : return "bg-green-100 text-red-700 border-red-200";
      case "cancelled" : return "bg-gray-100 text-gray-600 border-gray-200";
      default: return "bg-yellow-100 text-yellow-700 border-yellow-200"; //Pending
    }
  };

  if (loading) return <OrderSkeleton />;

  if(!orders.length) return <EmptyState />;

  return (
    <div className='min-h-screen bg-gray-50  p-6 font-sans text-gray-800'>
      <header className='mb-8 flex items-center justify-between'>
        <div>
          <h1 className='text-3xl font-bold text-gray-900 tracking-tight'>Orders</h1>
          <p className='text-gray-500 mt-1'>Manage incpming orders in tral-time</p>
        </div>
        <div className='bg-white px-4 py-2 rounded-full shadow-sm border border-gray-200 text-sm font-medium'>
          Total Orders: {orders.length}
        </div>
      </header>

      <div className='grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6'>
        {orders.map((order) => (
          <orderCard
          key={order._id}
          order={order}
          getStatusStyles={getStatusStyles}
          changeStatus={changeStatus}
          />
        ))}
      </div>
    </div>
  );
};

//Sub components for cleaner code

const OrderCard = ({ order,  getStatusStyles, changeStatus}) => {
  return (
    <div className='bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300 overflow-hidden flex flex-col'>
      {/* Card header */}
      <div className='p05 border-b border-gray-50 flex justify-between items-start'>
        <div className='flex items-center gap-2'>
          <h3 className='font-bold text-lg text-gray-900'>
            {order.user?.name || "Guest User"}
          </h3>
        </div>
        <p className='text-xs text-gray-400 font-mono mt-1'>
          #{order._id.slice(-6).toUpperCase()}
        </p>
        <span className={`px-3 py-1 rounded-full text-xs font-bold border ${getStatusStyles(order.status)} uppercase tracking-wide`}>
          {order.status}
        </span>
      </div>
      
      {/* Card Bodt: Items */}
      <div className='p-5 flex-1'>
        <div className='space-y-3'>
          {order.items?.map((item, index) => (
            <div key={index} className='flex justify-between text-sm group'>
              <div className='flex items-center gap-2 text-gray-600'>
                <span className='bg-gray-100 text-gray-600 font-bold px-2 py-0.5 rounded text-xs'>
                  {item.qty}
                </span>
                <span className='group-hover:text-gray-900 transition-colors'>
                  {item.name}
                </span>
              </div>
              <span className='text-gray-500 font-medium'>
                ${item.subtotal}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* total section */}
      <div className='px-5 py-3 bg-gray-50 flex justify-between items-center border-t border-gray-100'>
        <span className='text-sm text-gray-500 font-medium'>Total Amount</span>
        <span className='text-xl font-bold text-gray-900'>${order.total?.toLocaleString()}</span>
      </div>

      {/* Action footer */}
      <div className='p-4 flex gap-2 justify-end bg-white border-t border-gray-100'>
          {/* logic: Only show logical next steps based on current status */}
          {order.status === 'pending' && (
            <div>
              <ActionButton
                onClick = {() => changeStatus(order._id, "rejected")}
                color = "red"
                label = "Reject"
              />
              <ActionButton
                onClick = {() => changeStatus(order._id, "confirmed")}
                color = "green"
                label = "Confirm"
              />
            </div>
          )}

          {order.status === 'confirmed' && (
            <ActionButton
              onClick = {() => changeStatus(order._id, "completed")}
              color = "blue"
              label = "Complete Order"
            />
          )}

          {(order.status === 'completed' || order.status === 'rejected' || order.status === 'cancelled') && (
            <span className='text-xs text-gray-400 font-medium py-2'>No Actions Available</span>
          )}
      </div>
    </div>
  );
};

const ActionButton = ({ onClick, color, label }) => {
  const styles = {
    red: "bg-white text-red-600 border-red-200 hover:bg-red-50 hover:border-red-300",
    green: "bg-green-600 text-white border-transparent hover:bg-green-700 shadow-sm hover:shadow",
    blue: "bg-blue-600 text-white border-transparent hover:bg-blue-700 shadow-sm hover:shadow",
  };

  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-lg text-sm font-medium border transition-all duration-200 ${styles[color]}`}
    >
      {label}
    </button>
  );
};

const OrderSkeleton = () => (
  <div className='p-6 grid grid-cols-1 lg:grid-cols-3 gap-6 animate-pulse'>
    {[ 1, 2, 3].map(i => (
      <div key={i} className='h-64 bg-gray-200 rounded-2xl'>

      </div>
    ))}
  </div>
);

const EmptyState = () => {
  <div className='flex flex-col items-center justify-center h-screen bg-gray-50 text-center p-4'>
    <div className='bg-white p-6 rounded-full shadow-sm mb-4'>
      <svg className='w-12 h-12 text-gray-300 fill="none" stroke="currentColor" viewBox="0 0 24 24"'>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
      </svg>
    </div>
    <h2 className='text-xl font-bold text-gray-700'>
      No Orders Yet
    </h2>
    <p className='text-gray-500 max-w-sm mt-2'>
      New orders will appear here in real-time as customers place them.
    </p>
  </div>
}

export default Order