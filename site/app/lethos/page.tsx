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
      name: "Промежуточные 3, 6",
      color: "#FFFF00",
      zoneNumbers: [3, 6],
      objectGroup: 0
    },
    {
      name: "Промежуточные 4, 5",
      color: "#00FF00",
      zoneNumbers: [4, 5],
      objectGroup: 0
    },
    {
      name: "Миницентры",
      color: "#00FFFF",
      zoneNumbers: [7, 8, 9, 10],
      objectGroup: 0
    },
    {
      name: "Вторичка+Минитрежа",
      color: "#0000FF",
      zoneNumbers: [13],
      objectGroup: 0
    },
    {
      name: "Трежери",
      color: "#FF00FF",
      zoneNumbers: [11, 12],
      objectGroup: 0
    }
  ],
  templateImage: "/lethos.drawio.svg",
  description: [
    "1,2 - Стартовые зоны: руда дерево, лвл 1-2 банки",
    "3,4,5,6 - Промежуточные зоны: покинутая шахта, мелкие сокровищницы",
    "7,8,9,10 - Миницентры: приличная охрана, арты, сокровищницы, дерево/руда - 2 случайных, случайные двеллинги",
    "11,12 - Трежери",
    "Т+МТ(13) - Вторичка + минитрежа"
  ]
}

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
  const [_, height] = useWindowSize();
  return (
    <main className="flex flex-col items-center justify-between mt-20 overflow-scroll" style={{height: (height - 80)}}>
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
