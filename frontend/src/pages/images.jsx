import { useState } from "react"
import { createClient } from "@supabase/supabase-js"
import mediaUpload from "../utils/imagesupload"

const API_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imlvcnp5dWV2cmdvcG5ybWdsc3NxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzY2NzQ0MzksImV4cCI6MjA5MjI1MDQzOX0.cmnyud1suafAhmZTXMkliE66vYTgSkKl8va9hgFBCj8"
const project_url="https://iorzyuevrgopnrmglssq.supabase.co"
const supabase = createClient(project_url, API_KEY)

export default function Images() {
    const [file, setFile] = useState(null)

 async function uploadImage() {
  try {
    const link = await mediaUpload(file)
    console.log("IMAGE LINK:", link)
  } catch (err) {
    console.log(err)
  }
}

    return(
      <div className="flex min-h-screen w-full flex-col items-center justify-center gap-4 px-4 py-8">
      
      <h1 className="text-2xl font-bold">HELLO IMAGES PAGE</h1>

      <input
        type="file"
        className="w-full max-w-sm text-sm"
        onChange={(e) => setFile(e.target.files[0])}
      />

      <button
        onClick={uploadImage}
        className="bg-[#B45309] text-white px-6 py-2 rounded"
      >
        Upload Image
      </button>

    </div>
  
)
    
}