export default function Loader() {

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/40 backdrop-blur-sm">

      {/* LOADER CARD */}
      <div className="flex flex-col items-center gap-6 rounded-3xl bg-white px-10 py-8 shadow-2xl border border-slate-200">

        {/* SPINNER */}
        <div className="relative h-20 w-20">

          {/* OUTER RING */}
          <div className="absolute inset-0 rounded-full border-4 border-[#824203]/20"></div>

          {/* ANIMATED RING */}
          <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-[#824203] border-r-[#a16207] animate-spin"></div>

          {/* CENTER LOGO */}
          <div className="absolute inset-3 rounded-full bg-gradient-to-r from-[#824203] to-[#a16207] flex items-center justify-center shadow-lg">

            <span className="text-white text-2xl font-black">
              F
            </span>

          </div>
        </div>

        {/* TEXT */}
        <div className="text-center">

          <h2 className="text-xl font-black text-slate-900">
            FurniLK
          </h2>

          <p className="mt-1 text-sm text-slate-500 tracking-wide">
            Loading products...
          </p>

        </div>

        {/* LOADING BARS */}
        <div className="flex gap-2">

          <div className="h-2 w-2 rounded-full bg-[#824203] animate-bounce"></div>

          <div className="h-2 w-2 rounded-full bg-[#a16207] animate-bounce [animation-delay:0.2s]"></div>

          <div className="h-2 w-2 rounded-full bg-[#824203] animate-bounce [animation-delay:0.4s]"></div>

        </div>

      </div>
    </div>
  )
}