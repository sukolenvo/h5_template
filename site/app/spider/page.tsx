'use client'

import {useEffect, useState} from "react";
import ZonesComponent, {TemplateConfig, ZoneGroup} from "@/app/Zones";
import {NavigationBar} from "@/app/NavigationBar";
import {useWindowSize} from "@/app/util";

const templateConfig: TemplateConfig = {
  zoneGroups: [
    {
      name: "Стартовые",
      color: "#FF0000",
      zoneNumbers: [1, 2],
      objectGroup: 0
    },
    {
      name: "Промежуточные 3, 5, 7, 8",
      color: "#ffd500",
      zoneNumbers: [3, 5, 7, 8],
      objectGroup: 0
    },
    {
      name: "Промежуточные 4, 6",
      color: "#55FF00",
      zoneNumbers: [4, 6],
      objectGroup: 0
    },
    {
      name: "Минитрежери",
      color: "#FF00fF",
      zoneNumbers: [9, 10],
      objectGroup: 0
    },
    {
      name: "ГО",
      color: "#00AA80",
      zoneNumbers: [11],
      objectGroup: 0
    },
    {
      name: "Супер ресурсная",
      color: "#00AAFF",
      zoneNumbers: [14, 15],
      objectGroup: 0
    },
    {
      name: "Трежери",
      color: "#4455FF",
      zoneNumbers: [12, 13],
      objectGroup: 0
    },
  ],
  templateImage: "/spider.drawio.svg",
  description: [
    "1,2 - стартовые зоны",
    "3,4,5,6,7,8 - промежуточные зоны: простые арты, повышалки, халява, гномницы, горгульни, склепы",
    "9,10 - минитрежери: золотая шахта, арты мажоры, сильные сокровищницы, магазины",
    "11 - Зона ГО",
    "12,13 - трежери: арты мажоры и реликвии, сильные сокровищницы, утопы, затонувшие храмы, магазины, ментор",
    "14,15 - супер ресурсные зоны: все шахты, 2 золотые, арты миноры и простые мажоры, горгульни, элементальницы, гномятни, склепы, энтярни, шанс на форт на холме",
  ]
}

export default function Page() {
  const [isError, setError] = useState(false)
  const [getZones, setZones] = useState([])
  useEffect(() => {
    fetch("../spider.json")
      .then(response => response.json())
      .then(data => setZones(data))
      .catch(error => {
        setError(true);
        console.log(error)
      })
  }, [])
  const [_, height] = useWindowSize();
  return (
    <main className="flex flex-col items-center justify-between mt-20 overflow-y-scroll" style={{height: (height - 80)}}>
      <NavigationBar/>
      <div className="pt-2">
        {
          isError ? (<h1>Failed to loadTemplate</h1>)
            : <ZonesComponent zones={getZones} templateConfig={templateConfig}/>
        }
      </div>
    </main>
  )
}
