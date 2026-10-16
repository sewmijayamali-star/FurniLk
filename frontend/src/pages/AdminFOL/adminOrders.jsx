import axios from 'axios'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import Loader from '../../components/Loader'



export default function AdminOrders() {
  const navigate = useNavigate()
  const [orders, setOrders] = useState([])
  
  const [isloading, setIsLoading] = useState(true)

  // GET ORDERS
  useEffect(() => {
    if(isloading){
    
    axios.get(import.meta.env.VITE_API_URL + '/orders')
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
    <div className="w-full">
      
      {/* HEADER */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black text-slate-900">Orders</h1>
          <p className="text-sm text-slate-500 mt-1">
            Manage your orders   professionally
          </p>
        </div>

        
      </div>

      {/* TABLE */}
      <div className="rounded-3xl border border-slate-200 bg-white shadow-lg overflow-hidden">
        {isloading ? (
          <div className="p-6">
            <Loader />
          </div>
        ) : (
          <>
            <div className="grid grid-cols-5 gap-4 px-6 py-5 border-b border-slate-200 text-sm font-semibold text-slate-600">
              <span>Product</span>
              <span>Category</span>
              <span>Price</span>
              <span>Stock</span>
              <span>Action</span>
            </div>

            <div className="divide-y">
              {orders.map((o) => (
                <div
                  key={o._id}
                  className="grid grid-cols-5 items-center px-6 py-5 hover:bg-amber-50 transition"
                >

                  {/* PRODUCT */}
                  <div className="flex items-center gap-4">
                  <img
                    src={o.imageUrl[0]}
                    alt={o.name}
                    className="h-12 w-12 rounded-xl object-cover border border-slate-200"
                  />
                                      <div>
                      <p className="font-semibold text-slate-900">{o.name}</p>
                      <p className="text-xs text-slate-500">{o._id}</p>
                    </div>
                  </div>

                  {/* CATEGORY */}
                  <div className="text-slate-600 text-sm">
                    {o.category}
                  </div>

                  {/* PRICE */}
                  <div className="font-bold text-slate-900">
                    LKR {o.price.toLocaleString()}
                  </div>

                  {/* STOCK */}
                  <div>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-bold ${
                        o.stock > 10
                          ? "bg-emerald-100 text-emerald-700"
                          : o.stock > 0
                          ? "bg-amber-100 text-amber-700"
                          : "bg-rose-100 text-rose-700"
                      }`}
                    >
                      {o.stock} in stock
                    </span>
                  </div>

                  {/* ACTION */}
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => navigate(`/admin/update-order/${o._id}`, { state: o })}
                      className="px-3 py-1 rounded-lg text-xs font-semibold bg-blue-50 text-blue-600 hover:bg-blue-100 transition"
                    >
                      Edit
                    </button>

                    
                  </div>

                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  )
}