import axios from 'axios'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import Loader from '../../components/Loader'

function ProductDeleteConfirm(props) {

  const _id=props._id
  const close = props.close
  const refresh = props.refresh
  function deleteProduct() {
    const token=localStorage.getItem("token")
    axios
      .delete(import.meta.env.VITE_API_URL + "/products/" + _id, {
        headers: {
          Authorization:`Bearer ${token}`
        }
      })
      .then((res) => {
        console.log(res.data);
       close();
       toast.success("Product deleted successfully");
      })
      .catch((err) => {
        console.error(err);
      })
  }

  return (
  <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[100]">

    {/* MODAL */}
    <div className="w-[500px] rounded-3xl bg-white shadow-2xl relative overflow-hidden border border-slate-200">

      {/* TOP ACCENT */}
      <div className="h-2 w-full bg-gradient-to-r from-[#824203] to-[#a16207]"></div>

      {/* CLOSE BUTTON */}
      <button
        onClick={close}
        className="absolute top-5 right-5 w-9 h-9 rounded-full bg-red-50 text-red-500 hover:bg-red-100 hover:scale-105 transition flex items-center justify-center text-lg font-bold"
      >
        ✕
      </button>

      {/* CONTENT */}
      <div className="px-10 py-10">

        {/* ICON */}
        <div className="w-20 h-20 rounded-full bg-red-100 flex items-center justify-center mx-auto shadow-inner">
          <span className="text-4xl">🗑️</span>
        </div>

        {/* TITLE */}
        <h2 className="text-2xl font-black text-slate-900 text-center mt-6">
          Delete Product
        </h2>

        {/* DESCRIPTION */}
       <p className="text-slate-500 text-center mt-3 leading-relaxed">
  Are you sure you want to permanently delete product
  <span className="font-bold text-slate-800">
    {" "}{_id}
  </span>
  ?
  <br />
  This action cannot be undone.
</p>

        {/* BUTTONS */}
        <div className="flex items-center justify-center gap-5 mt-10">

          {/* CANCEL */}
          <button
            onClick={close}
            className="px-6 py-3 rounded-xl bg-slate-100 text-slate-700 font-semibold hover:bg-slate-200 transition-all duration-200"
          >
            Cancel
          </button>

          {/* DELETE */}
          <button
             onClick={deleteProduct}
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#824203] to-[#a16207] text-white font-semibold shadow-md hover:scale-105 hover:shadow-lg transition-all duration-200"
          >
            Delete Product
          </button>

        </div>

      </div>
    </div>
  </div>
)
}

export default function AdminProducts() {
  const navigate = useNavigate()
  const [products, setProducts] = useState([])
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false)
  const [productToDelete, setProductToDelete] = useState(null) 
  const [isloading, setIsLoading] = useState(true)

  // GET PRODUCTS
  useEffect(() => {
    if(isloading){
    
    axios.get(import.meta.env.VITE_API_URL + '/products')
      .then(res => {
        console.log(res.data)
        setProducts(Array.isArray(res.data) ? res.data : [])
        setIsLoading(false)
      })
      .catch(err => {
        console.log(err)
       
      })}
  }, [isloading])

 
      
  return (
    <div className="w-full">
      {
        isDeleteConfirmOpen && <ProductDeleteConfirm refresh={() => setIsLoading(true)} _id={productToDelete} close={() => { setIsDeleteConfirmOpen(false) }} />
      }
      {/* HEADER */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black text-slate-900">Products</h1>
          <p className="text-sm text-slate-500 mt-1">
            Manage your inventory professionally
          </p>
        </div>

        <button
  onClick={() => navigate("/admin/add-product")}
  className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#824203] to-[#a16207] text-white font-semibold shadow-md hover:scale-105 hover:shadow-lg transition-all duration-200"
>
  + Add Product
</button>
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
              {products.map((p) => (
                <div
                  key={p._id}
                  className="grid grid-cols-5 items-center px-6 py-5 hover:bg-amber-50 transition"
                >

                  {/* PRODUCT */}
                  <div className="flex items-center gap-4">
                  <img
                    src={p.imageUrl[0]}
                    alt={p.name}
                    className="h-12 w-12 rounded-xl object-cover border border-slate-200"
                  />
                                      <div>
                      <p className="font-semibold text-slate-900">{p.name}</p>
                      <p className="text-xs text-slate-500">{p._id}</p>
                    </div>
                  </div>

                  {/* CATEGORY */}
                  <div className="text-slate-600 text-sm">
                    {p.category}
                  </div>

                  {/* PRICE */}
                  <div className="font-bold text-slate-900">
                    LKR {p.price.toLocaleString()}
                  </div>

                  {/* STOCK */}
                  <div>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-bold ${
                        p.stock > 10
                          ? "bg-emerald-100 text-emerald-700"
                          : p.stock > 0
                          ? "bg-amber-100 text-amber-700"
                          : "bg-rose-100 text-rose-700"
                      }`}
                    >
                      {p.stock} in stock
                    </span>
                  </div>

                  {/* ACTION */}
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => navigate(`/admin/update-product/${p._id}`, { state: p })}
                      className="px-3 py-1 rounded-lg text-xs font-semibold bg-blue-50 text-blue-600 hover:bg-blue-100 transition"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => {
                        setProductToDelete(p._id);
                        setIsDeleteConfirmOpen(true);
                      }}
                      className="px-3 py-1 rounded-lg text-xs font-semibold bg-red-50 text-red-600 hover:bg-red-100 transition"
                    >
                      Delete
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