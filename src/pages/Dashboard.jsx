import React, { useCallback, useEffect, useState } from 'react'
import io from "socket.io-client"
import { getItemFromLocalStorage } from '../helpers/helper'
import { API_ROUTES, STORAGE_KEY } from '../config/config'
import axiosInstance from '../config/axiosInstance'

//Charts
import { BarChart, Bar, XAxis, Tooltip, ResponsiveContainer, CartesianGrid, YAxis } from 'recharts'

//Initialize socket outside
const socket = io(API_ROUTES.LOCAL_SERVER_URL, { transports: ["websocket"] });

const Dashboard = () => {
  const userData = getItemFromLocalStorage(STORAGE_KEY.USER_DATA);
  const shopId = userData?._id;

  const [ orders, setOrders ] = useState([]);
  const [ loading, setLoading ] = useState(true);

  //Fetch orders on load
  useEffect(() => {
    const fetchOrders = async () => {
      if (!shopId) return;

      try {
        const response = await axiosInstance.get(
          `${API_ROUTES.GET_ALL_ORDER}?shopId=${shopId}`
        );
        const data = response.data?.data || response.data || [];
        setOrders(Array.isArray(data) ? data.reverse() : []);
      } catch (error) {
        console.log("Dashboard fetch error: ", error);
      } finally {
        setLoading(false);
      }
    }

    fetchOrders();
  }, [shopId]);

  //update orders (real-time)
  const updateLocalOrder = useCallback((updatedOrder) => {
    setOrders((prev) => {
      const exists = prev.find((o) => o._id === updatedOrder._id);

      if (exists) {
        return prev.map((o) => (o._id === updatedOrder._id ? updatedOrder : o));
      }

      //New orders should appear live
      return [updatedOrder, ...prev];
    });
  });

  //Socket.io logic

  useEffect(() => {
    if (!shopId) return;

    socket.emit("join_shop", {shopId});

    const onConnect = () => socket.emit("join_shop", { shopId });
    const onOrderUpdate = (order) => updateLocalOrder(order);

    socket.on("connect", onConnect);
    socket.on("order_created", onOrderUpdate);
    socket.on("order_updated", onOrderUpdate);
    socket.on("order_status_update", onOrderUpdate);

    return () => {
      socket.off("connect", onConnect);
      socket.off("order_created", onOrderUpdate);
      socket.off("order_updated", onOrderUpdate);
      socket.off("order_status_update", onOrderUpdate);
    };
  }, [shopId, updateLocalOrder]);

  //Build chard data dynamically
  const chartData = React.useMemo(() => {
    const stats = {
      pending: 0,
      confirmed: 0,
      completed: 0,
      rejected: 0,
      cancelled: 0,
    };

    orders.forEach((o) => {
      if (stats[o.status] !== undefined) {
        stats[o.status] += 1;
      }
    });

    return [
      { name: "Pending", value: stats.pending },
      { name: "Confirmed",  value: stats.confirmed},
      { name: "Completed", value: stats.completed},
      { name: "Rejected", value: stats.rejected},
      { name: "Cancelled", value: stats.cancelled},
    ];
  }, [orders]);

  if (loading) {
    return (
      <div className='h-screen flex items-center justify-center text-gray-600 text-lg'>
        Loading Dashboard...
      </div>
    );
  }

  return (
    <div className='min-h-screenp-8 text-gray-800'>
      <p className='text-gray-500 mb-8'>
        Real-time order statistics for your shop
      </p>

      <div className='bg-[#383838] shadow-sm border border-gray-100 rounded-2xl p-6'>
        <h2 className='text-xl font-semibold mb-4'>
          Order Status Overview
        </h2>

        <div className='w-full h-80'>
          <ResponsiveContainer>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3"/>
              <XAxis dataKey="name"/>
              <YAxis allowDecimals={false}/>
              <Tooltip/>
              <Bar dataKey="value" fill='#4F46ES' radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}

export default Dashboard