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
      name: "Промежуточные (3,5)",
      color: "#ff8f00",
      zoneNumbers: [3, 5],
      objectGroup: 0
    },
    {
      name: "Промежуточные (4,6)",
      color: "#bfbf00",
      zoneNumbers: [4, 6],
      objectGroup: 0
    },
    {
      name: "Смежные Вторички (7,9)",
      color: "#80ff00",
      zoneNumbers: [7, 9],
      objectGroup: 0
    },
    {
      name: "Вторичка (8)", // center top
      color: "#00FF40",
      zoneNumbers: [8],
      objectGroup: 0
    },
    {
      name: "Вторичка (10)", // center bottom
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
  templateImage: "/mask.drawio.svg",
  description: [
    "1,2 - стартовые зоны, руда +дерево, двеллы, повышалки",
    "3,5 - промежуточная трава",
    "4,6 - промежуточная зона, случайная земля",
    "7,8,9 - зоны с вторичками, чуть артов",
    "11 - зона с двумя золотыми шахтами, средние арты, столбы и рощи и тд",
    "12 - минитрежа (средние арты, есть приличные сокровищницы, нет утоп)",
    "13,14 - трежери, хорошие арты, утопы",
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
