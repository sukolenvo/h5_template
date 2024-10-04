'use client'

import {useEffect, useState} from "react";
import ZonesComponent, {TemplateConfig} from "@/app/Zones";
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
      name: "(2) - Промзона (50%)",
      color: "#FFFF00",
      zoneNumbers: [3, 4, 5, 6, 7, 8],
      objectGroup: 0
    },
    {
      name: "(2) - Миниресурсная (50%)",
      color: "#FFFF00",
      zoneNumbers: [3, 4, 5, 6, 7, 8],
      objectGroup: 1
    },
    {
      name: "(3) - Ресурсная (42%)",
      color: "#00FF00",
      zoneNumbers: [9, 11, 12, 14],
      objectGroup: 0
    },
    {
      name: "(3) - Минитрежери (43%)",
      color: "#00FF00",
      zoneNumbers: [9, 11, 12, 14],
      objectGroup: 1
    },
    {
      name: "(3) - Вторик (15%)",
      color: "#00FF00",
      zoneNumbers: [9, 11, 12, 14],
      objectGroup: 2
    },
    {
      name: "Центры (З+О)",
      color: "#00FFFF",
      zoneNumbers: [10, 13],
      objectGroup: 0
    },
    {
      name: "ГО",
      color: "#0000FF",
      zoneNumbers: [15],
      objectGroup: 0
    },
    {
      name: "Трежери",
      color: "#FF00FF",
      zoneNumbers: [16, 17],
      objectGroup: 0
    }
  ],
  templateImage: "/img/rainbow.png",
  description: [
    "Все неподписанные связи имеют силу охраны 50",
    "1 - стартовые зоны",
    "2 могут быть либо промзоны, либо миниресурсные",
    "3 - могут быть минитрежери, сторичка ресурсная",
    "ТР - трежери",
    "З+О - в центральной зоне будет 1-2 обзорки",
    "на картах не будут генериться золотые шахты и мешки +1000 золота",
  ],
  magi: [
    // 1: 0.5x3 0.5x4 0.5x5 0.5x6 0.5x7 0.5x8  -> 0.42x9 0.43x9 0.42x10 0.43x10 0.42x11 0.43x11 0.42x12 0.43x12 0.42x13 0.43x13 0.42x14 0.43x14
    // 2: 0.5x3 0.5x3 0.5x4 0.5x4 0.5x5 0.5x5 0.5x6 0.5x6 0.5x7 0.5x7 0.5x8 0.5x8-> 0.15x9 0.15x10 0.15x11 0.15x12 0.15x13 0.15x14
    // 3: 1 2 0.15x9 0.15x10 0.15x11 0.15x12 0.15x13 0.15x14 15 -> 16 17
    ""
  ],
}

export default function Page() {
  const [isError, setError] = useState(false)
  const [getZones, setZones] = useState([])
  useEffect(() => {
    fetch("../rainbow.json")
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
