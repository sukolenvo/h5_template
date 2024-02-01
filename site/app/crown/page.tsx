'use client'

import {useEffect, useLayoutEffect, useState} from "react";
import ZonesComponent, {TemplateConfig, ZoneGroup} from "@/app/Zones";
import {NavigationBar} from "@/app/NavigationBar";
import {useWindowSize} from "@/app/util";

const templateConfig: TemplateConfig = {
  zoneGroups: [
    {
      zoneNumbers: [1, 2],
      name: "Стартовые",
      color: "#FF0000",
      objectGroup: 0
    },
    {
      zoneNumbers: [3, 4, 5, 6],
      color: "#FFFF00",
      name: "Промежуточные",
      objectGroup: 0
    },
    {
      zoneNumbers: [7, 8, 9, 10],
      color: "#00FF00",
      name: "Р/МТ/В - Ресурсная (40%)",
      objectGroup: 0
    },
    {
      zoneNumbers: [7, 8, 9, 10],
      color: "#00FF00",
      name: "Р/МТ/В - Минитрежа (45%)",
      objectGroup: 0
    },
    {
      zoneNumbers: [7, 8, 9, 10],
      color: "#00FF00",
      name: "Р/МТ/В - Вторик (15%)",
      objectGroup: 2
    },
    {
      zoneNumbers: [11, 12, 13, 14],
      color: "#00FFFF",
      name: "Золотая",
      objectGroup: 0
    },
    {
      zoneNumbers: [15],
      color: "#0000FF",
      name: "Минитрежа",
      objectGroup: 0
    },
    {
      zoneNumbers: [16, 17],
      color: "#FF00FF",
      name: "Трежери",
      objectGroup: 0
    }
  ],
  templateImage: "/img/crown.png",
  description: [
    "Все неподписанные проходы - 60",
    "1,2 - стартовые зоны",
    "Р/МТ/В - ресурсная (40%)/минитрежа(45%)/вторик (15%)",
    "п - промежуточные зоны",
    "Зол - центр, золотые шахты, нормальные арты",
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
  const [_, height] = useWindowSize();
  return (
    <main className="flex flex-col items-center justify-between mt-20 overflow-scroll" style={{height: (height-80)}}>
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
