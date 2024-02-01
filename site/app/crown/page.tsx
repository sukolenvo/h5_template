'use client'

import {useEffect, useState} from "react";
import ZonesComponent, {TemplateConfig, ZoneGroup} from "@/app/Zones";

const templateConfig: TemplateConfig = {
  zoneGroups:  [
    {
      zoneNumbers: [1, 2],
      name: "Стартовые",
      color: "#FF0000"
    },
    {
      zoneNumbers: [3, 4, 5, 6],
      color: "#FFFF00",
      name: "Промежуточные"
    },
    {
      zoneNumbers: [7, 8, 9, 10],
      color: "#00FF00",
      name: "Ресурсная/Минитрежа/Вторик"
    },
    {
      zoneNumbers: [11, 12, 13, 14],
      color: "#00FFFF",
      name: "Золотая"
    },
    {
      zoneNumbers: [15],
      color: "#0000FF",
      name: "Минитрежа"
    },
    {
      zoneNumbers: [16, 17],
      color: "#FF00FF",
      name: "Трежери"
    }
  ],
  templateImage: "/img/crown.png",
  description: [
    "Все неподписанные проходы - 60",
    "1,2 - стартовые зоны",
    "р/мт/в - ресурсная или минитрежа или вторичка (10%)",
    "п - промежуточные зоны",
    "Зал - центр, золотые шахты, нормальные арты",
    "Т - большая трежа",
    "МТ - минитрежери"
  ]
}

export default function Page() {
  const [isError, setError] = useState(false)
  const [getZones, setZones] = useState([])
  useEffect(() => {
    fetch("../crown.json")
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
          : <ZonesComponent zones={getZones} templateConfig={templateConfig}/>
      }
    </main>
  )
}
