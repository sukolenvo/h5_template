'use client'

import ZonesComponent, {TemplateConfig} from "@/app/Zones";
import {NavigationBar} from "@/app/NavigationBar";
import {useWindowSize} from "@/app/util";
import zones from './sun.json'

const templateConfig: TemplateConfig = {
  zoneGroups: [
    {
      name: "Стартовые",
      color: "#FF0000",
      zoneNumbers: [1, 2],
      objectGroup: 0
    },
    {
      name: "Промежуточная",
      color: "#FFD500",
      zoneNumbers: [3, 5],
      objectGroup: 0
    },
    {
      name: "Ресурсная",
      color: "#55FF00",
      zoneNumbers: [4, 6],
      objectGroup: 0
    },
    {
      name: "Золотая",
      color: "#FF00FF",
      zoneNumbers: [7, 8],
      objectGroup: 0
    },
    {
      name: "Трежери",
      color: "#00ffFF",
      zoneNumbers: [9, 10],
      objectGroup: 0
    },
    {
      name: "Вторик",
      color: "#4455FF",
      zoneNumbers: [11, 12],
      objectGroup: 0
    },
    {
      name: "Минитрежери",
      color: "#8000ff",
      zoneNumbers: [13, 14],
      objectGroup: 0
    },
  ],
  templateImage: "/sun.drawio.svg",
  description: [
    "1,2 - стартовые зоны",
    "4,6 - ресурсная: все шахты",
    "3,5 - промежуточная: банки",
    "7,8 - золотая: шахты золота, средние артефакты",
    "9,10 - трежери: утопы и реликты",
    "11,12 - вторик: зоны с нейтральными городами",
    "13,14 - минитрежери: хорошие банки, мажоры",
  ],
  // 1: -> 7 8
  // 2: 11 12 13 14 -> 11 12 13 14
  // 3: 11 12 -> 1 2 9 10
}

export default function Page() {
  const [_, height] = useWindowSize();
  return (
    <main className="flex flex-col items-center justify-between mt-20 overflow-y-scroll"
          style={{height: (height - 80)}}>
      <NavigationBar/>
      <div className="pt-2 pl-6 pr-6 w-full" style={{maxWidth: "1500px"}}>
        {
          <ZonesComponent zones={zones} templateConfig={templateConfig}/>
        }
      </div>
    </main>
  )
}
