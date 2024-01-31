'use client'

import {useEffect, useState} from "react";
import ZonesComponent from "@/app/Zones";

export default function Page() {
  const [isError, setError] = useState(false)
  const [getZones, setZones] = useState([])
  useEffect(() => {
    fetch("../lethos.json")
      .then(response => response.json())
      .then(data => setZones(data))
      .catch(error => {
        setError(true);
        console.log(error)
      })
  }, [])
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      {
        isError ? (<h1>Failed to loadTemplate</h1>)
          : <ZonesComponent zones={getZones}/>
      }
    </main>
  )
}
