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
      name: "Промзоны",
      color: "#FFd500",
      zoneNumbers: [3, 4, 5, 6],
      objectGroup: 0
    },
    {
      name: "Ресурсные",
      color: "#55FF00",
      zoneNumbers: [7, 8],
      objectGroup: 0
    },
    {
      name: "Центры",
      color: "#00FF80",
      zoneNumbers: [9, 10],
      objectGroup: 0
    },
    {
      name: "Городские",
      color: "#00aaFF",
      zoneNumbers: [11, 12],
      objectGroup: 0
    },
    {
      name: "Трежери",
      color: "#2a00FF",
      zoneNumbers: [13, 14],
      objectGroup: 0
    },
    {
      name: "ГО",
      color: "#FF00FF",
      zoneNumbers: [15],
      objectGroup: 0
    }
  ],
  templateImage: "/img/Maze.png",
  description: [
    "Все неподписанные свызи имеют силу охраны 60",
    "1,2 - стартовые зоны: шахты дерева и руды, артефакты миноры, ресурсы, повышалки, немного мелких банков",
    "3,4,5,6 - промежуточные зоны: ресурсы, повышалки, горгульни, склепы, гномятни, артефакты миноры",
    "7,8 - ресурсные зоны: шахты, кроме дерева и руды, ресурсы, сокровищницы, повышалки, артефакты миноры, небольшой шанс на несборные мажоры",
    "9,10 - центры: две шахты золота и две покинутых шахты, сильные сокровищницы, магазины, повышалки, артефакты мажоры",
    "11,12 - городские зоны: случайкая вторичка, шахты дерева и руды, повышалки, сокровищницы, магазины, артефакты хорошие миноры, мажоры",
    "13,14 - трежери: артефакты мажоры, реликвии, сокровищницы, повышалки, магазины, большой шанс на утовы, затонувшие храмы",
    "15 - Зона главной охраны(ГО): повышалки, астролог",
  ]
}

export default function Page() {
  const [isError, setError] = useState(false)
  const [getZones, setZones] = useState([])
  useEffect(() => {
    fetch("../maze.json")
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
