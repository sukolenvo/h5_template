'use client'

import {useEffect, useState} from "react";
import ZonesComponent, {Zone, ZoneGroup} from "@/app/Zones";

const zoneConfig: ZoneGroup[] = []

export default function Page() {
  const [isError, setError] = useState(false)
  const [getZones, setZones] = useState([] as Zone[])
  useEffect(() => {
    fetch("../crown.json")
      .then(response => response.json())
      .then(data => setZones(data))
      .catch(error => {
        setError(true);
        console.log(error)
      })
  }, [])

  let line = []
  for (let i = 0; i < getZones.length; i++) {
    for (let j = i + 1; j < getZones.length; j++) {
      if (JSON.stringify(getZones[i].objectSets) === JSON.stringify(getZones[j].objectSets)) {
        line.push(getZones[i].number + " " + getZones[j].number)
      }
    }
  }
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      { line.map(it => (<div key={it}>{it}</div>))
      }
    </main>
  )
}
