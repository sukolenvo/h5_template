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
      name: "Промзоны 3, 6",
      color: "#FFd500",
      zoneNumbers: [3, 6],
      objectGroup: 0
    },
    {
      name: "Промзоны 4, 5, 7, 8",
      color: "#55FF00",
      zoneNumbers: [4, 5, 7, 8],
      objectGroup: 0
    },
    {
      name: "Боковые ресурсные 9, 10",
      color: "#00aa80",
      zoneNumbers: [9, 10],
      objectGroup: 0
    },
    {
      name: "Минитрежери",
      color: "#00aaFF",
      zoneNumbers: [11, 12],
      objectGroup: 0
    },
    {
      name: "Золотая (G)",
      color: "#FF00FF",
      zoneNumbers: [15],
      objectGroup: 0
    },
    {
      name: "Трежери",
      color: "#4455ff",
      zoneNumbers: [13, 14],
      objectGroup: 0
    }
  ],
  templateImage: "/m3.drawio.svg",
  description: [
    "1,2 - стартовые зоны игроков",
    "3,4,5,6,7,8 - промзоны (мелкие арты, мелкие сокровищницы)",
    "9,10 - боковые ресурсные центры (обязательно будут шахты дерева и руды, мелкие банки, немного средних артов и банков)",
    "11,12 - минитрежери (шахты, хорошие арты, есть рынок артов, есть обзорки, не будет шахт дерева и руды - только покинуты и ресурсные)",
    "13,14 - трежери (золотые шахты, утопии и реликвии)",
    "15 - зона с двумя золотыми шахтами (хорошие арты)"
  ]
}

export default function Page() {
  const [isError, setError] = useState(false)
  const [getZones, setZones] = useState([])
  useEffect(() => {
    fetch("../m3.json")
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
