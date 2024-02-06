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
      color: "#ffbf00",
      zoneNumbers: [3, 5, 7, 8],
      objectGroup: 0
    },
    {
      name: "Промежуточные 4, 6",
      color: "#80ff00",
      zoneNumbers: [4, 6],
      objectGroup: 0
    },
    {
      name: "Минитрежери",
      color: "#FF00bF",
      zoneNumbers: [9, 10],
      objectGroup: 0
    },
    {
      name: "ГО",
      color: "#00ffFF",
      zoneNumbers: [11],
      objectGroup: 0
    },
    {
      name: "Супер ресурсная",
      color: "#8000ff",
      zoneNumbers: [14, 15],
      objectGroup: 0
    },
    {
      name: "Трежери",
      color: "#0040ff",
      zoneNumbers: [12, 13],
      objectGroup: 0
    },
  ],
  templateImage: "/img/Spider.png",
  description: [
    "1,2 - стартовые зоны",
    "3,4,5,6,7,8 - промежуточные зоны: простые арты, повышалки, халява, гномницы, горгульни, склепы",
    "9,10 - минитрежери: золотая шахта, арты мажоры, сильные сокровищницы, магазины",
    "12,13 - трежери: арты мажоры и реликвии, сильные сокровищницы, утопы, затонувшие храмы, магазины, ментор",
    "14,15 - супер ресурсные зоны: все шахты, 2 золотые, арты миноры и простые мажоры, горгульни, элементальницы, гномятни, склепы, энтярни, шанс на форт на холме",
    "11 - Зона ГО",
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
