import { createClient } from "@supabase/supabase-js";

const API_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imlvcnp5dWV2cmdvcG5ybWdsc3NxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzY2NzQ0MzksImV4cCI6MjA5MjI1MDQzOX0.cmnyud1suafAhmZTXMkliE66vYTgSkKl8va9hgFBCj8"
const project_url="https://iorzyuevrgopnrmglssq.supabase.co"
const supabase = createClient(project_url, API_KEY)


export default function mediaUpload(file) {
  return new Promise((resolve, reject) => {

    if (file == null) {
      reject("No file selected")
      return
    }

    const timestamp = new Date().getTime()
    const fileName = timestamp + "-" + file.name   // ✅ unique name

    supabase.storage
      .from("myImages")
      .upload(fileName, file, {   // ✅ USE fileName
        upsert: false,
        cacheControl: "3600",
      })
      .then(() => {

        const url = supabase.storage
          .from("myImages")
          .getPublicUrl(fileName).data.publicUrl   // ✅ USE SAME fileName

        console.log(url)
        resolve(url)
      })
      .catch((error) => {
        reject(error.message)
      })
  })
}