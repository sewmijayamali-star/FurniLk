import axios from 'axios'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import Loader from '../../components/Loader'
import { Sidebar } from "../admin";

import OrderDetailsModal from '../../components/OrderDetailsModal';





export default function AdminOrders() {
  const navigate = useNavigate()
  const [orders, setOrders] = useState([])
   const [active, setActive] = useState("Orders")
   const [selectedOrder, setSelectedOrder] = useState(null);
  
  const [isloading, setIsLoading] = useState(true)

  // GET ORDERS
  useEffect(() => {
    if(isloading){

        const token = localStorage.getItem("token");
        if (token == null ){
            navigate ("/login");
            return;
        }
    
    axios.get(import.meta.env.VITE_API_URL + '/orders',{
        headers: {
        Authorization: `Bearer ${token}`
        },}
    )
      .then(res => {
        console.log(res.data)
        setOrders(Array.isArray(res.data) ? res.data : [])
        setIsLoading(false)
      })
      .catch(err => {
        console.log(err)
       
      })}
  }, [isloading])

 
      
  
return (
  <div className="flex min-h-screen bg-[#F8F5F0]">
    <Sidebar active={active} setActive={setActive} />

    <main className="flex-1 min-w-0 overflow-auto px-4 py-8 sm:px-6 lg:px-8">

                <OrderDetailsModal
            order={selectedOrder}
            onClose={() => setSelectedOrder(null)}
          />
      {/* HEADER */}
      <div className="mb-8">
        <h1 className="text-3xl font-black text-slate-900">
          Orders
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          Manage your orders professionally
        </p>
      </div>

      {/* TABLE */}
      <div className="w-full overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-lg">
        {isloading ? (
          <div className="p-6">
            <Loader />
          </div>
        ) : orders.length === 0 ? (
          <div className="p-10 text-center text-slate-500">
            No orders found.
          </div>
        ) : (
          <div className="w-full overflow-x-auto">
            <table className="w-full min-w-[1100px] table-fixed text-left">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50 text-sm font-semibold text-slate-600">
                  <th className="w-[12%] px-5 py-5">Order ID</th>
                  <th className="w-[12%] px-5 py-5">Items</th>
                  
                  <th className="w-[14%] px-5 py-5">Customer Name</th>
                  <th className="w-[18%] px-5 py-5">Customer Email</th>
                  <th className="w-[12%] px-5 py-5">Phone Number</th>
                  <th className="w-[16%] px-5 py-5">Address</th>
                  <th className="w-[10%] px-5 py-5">Total Amount</th>
                  <th className="w-[12%] px-5 py-5">Status</th>
                   <th className="w-[12%] px-5 py-5">Date</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">
                {orders.map((o) => (
                  <tr
                    key={o._id || o.orderid}
                    onClick={() => setSelectedOrder(o)}
                    className="transition hover:bg-amber-50"
                  >
                    {/* ORDER ID */}
                    <td className="break-words px-5 py-5 text-sm font-bold text-slate-800">
                      {o.orderid || "N/A"}
                    </td>

                   <td className="px-5 py-5 text-sm font-semibold text-slate-700">
                      {Array.isArray(o.items) && o.items.length > 0
                        ? o.items.reduce(
                            (total, item) => total + Number(item.quantity || 1),
                            0
                          ) + " Items"
                        : "N/A"}
                    </td>
                    

                    {/* CUSTOMER NAME */}
                    <td className="break-words px-5 py-5 text-sm text-slate-700">
                      {o.customerName || "N/A"}
                    </td>

                    {/* CUSTOMER EMAIL */}
                    <td className="break-words px-5 py-5 text-sm text-slate-600">
                      {o.customerEmail || "N/A"}
                    </td>

                    {/* PHONE NUMBER */}
                    <td className="break-words px-5 py-5 text-sm text-slate-600">
                      {o.phoneNumber || "N/A"}
                    </td>

                    {/* ADDRESS */}
                    <td className="break-words px-5 py-5 text-sm text-slate-600">
                      {o.address || "N/A"}
                    </td>

                    {/* TOTAL AMOUNT */}
                    <td className="px-5 py-5 text-sm font-bold text-slate-900">
                      LKR {Number(o.totalAmount || 0).toLocaleString()}
                    </td>

                    {/* status*/}
                    <td className="px-5 py-5 text-sm font-bold text-slate-900">
                      {o.state || "N/A"}
                    </td>

                    <td className="break-words px-5 py-5 text-sm text-slate-600">
                      {new Date(o.orderDate).toLocaleDateString("en-GB")}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </main>
  </div>
);

}