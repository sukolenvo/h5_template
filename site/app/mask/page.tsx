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
      name: "Промежуточные",
      color: "#ffbf00",
      zoneNumbers: [3, 5],
      objectGroup: 0
    },
    {
      name: "Промежуточные",
      color: "#ffbf00",
      zoneNumbers: [4, 6],
      objectGroup: 0
    },
    {
      name: "Смежные Вторички (1)",
      color: "#80ff00",
      zoneNumbers: [7, 9],
      objectGroup: 0
    },
    {
      name: "Вторичка (2)", // center top
      color: "#00FF40",
      zoneNumbers: [8],
      objectGroup: 0
    },
    {
      name: "Вторичка (3)", // center bottom
      color: "#00ffFF",
      zoneNumbers: [10],
      objectGroup: 0
    },
    {
      name: "Золотая",
      color: "#0040ff",
      zoneNumbers: [11],
      objectGroup: 0
    },
    {
      name: "Минитрежари",
      color: "#8000ff",
      zoneNumbers: [12],
      objectGroup: 0
    },
    {
      name: "Трежери",
      color: "#FF00bF",
      zoneNumbers: [13, 14],
      objectGroup: 0
    }
  ],
  templateImage: "/img/mask.png",
  description: [
    "Все неподписанные проходы - сила 70",
    "1,2 - стартовые зоны, руда +дерево, двеллы, повышалки",
    "В1/B2/B3 - зоны с вторичками, чуть артов",
    "П - артефакты одинаковые, одна из зон гарантированно трава, другая - случайно",
    "З - зоны с двумя золотыми шахтами, средние арты, столбы и рощи и тд",
    "Т - трежери, хорошие арты, утопы",
    "МТ - минитрежа (средние арты, есть приличные сокровищницы, нет утоп)",
  ]
}

export default function Page() {
  const [isError, setError] = useState(false)
  const [getZones, setZones] = useState([])
  useEffect(() => {
    fetch("../mask.json")
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
