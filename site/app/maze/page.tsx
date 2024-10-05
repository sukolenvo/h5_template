'use client'

import ZonesComponent, {TemplateConfig} from "@/app/Zones";
import {NavigationBar} from "@/app/NavigationBar";
import {useWindowSize} from "@/app/util";
import zones from './maze.json'

const colorZoneStart = "#FF0000"
const colorZoneProme = "#FFd500"
const colorZoneResource = "#55FF00"
const colorZoneCenter = "#00aa80"
const colorZoneTown = "#00aaFF"
const colorZoneMG = "#FF00FF"
const colorZoneTreasure = "#4455FF"

const templateConfig: TemplateConfig = {
  zoneGroups: [
    {
      name: "Стартовая",
      color: colorZoneStart,
      zoneNumbers: [1, 2],
      objectGroup: 0
    },
    {
      name: "Промзона",
      color: colorZoneProme,
      zoneNumbers: [3, 4, 5, 6],
      objectGroup: 0
    },
    {
      name: "Ресурсная",
      color: colorZoneResource,
      zoneNumbers: [7, 8],
      objectGroup: 0
    },
    {
      name: "Центр",
      color: colorZoneCenter,
      zoneNumbers: [9, 10],
      objectGroup: 0
    },
    {
      name: "Вторик",
      color: colorZoneTown,
      zoneNumbers: [11, 12],
      objectGroup: 0
    },
    {
      name: "ГО",
      color: colorZoneMG,
      zoneNumbers: [15],
      objectGroup: 0
    },
    {
      name: "Трежери",
      color: colorZoneTreasure,
      zoneNumbers: [13, 14],
      objectGroup: 0
    }
  ],
  templateImage: "/maze.drawio.svg",
  description: [
    "Все неподписанные порталы - охрана 60",
    "1,2 - стартовая: шахты дерева и руды, артефакты миноры, ресурсы, повышалки, немного мелких банков",
    "3,4,5,6 - промзона: ресурсы, повышалки, горгульни, склепы, гномятни, артефакты миноры",
    "7,8 - ресурсная: шахты, кроме дерева и руды, ресурсы, сокровищницы, повышалки, артефакты миноры, небольшой шанс на несборные мажоры",
    "9,10 - центр: две шахты золота и две покинутых шахты, сильные сокровищницы, магазины, повышалки, артефакты мажоры",
    "11,12 - вторик: случайкая вторичка, шахты дерева и руды, повышалки, сокровищницы, магазины, артефакты хорошие миноры, мажоры",
    "13,14 - трежери: артефакты мажоры, реликвии, сокровищницы, повышалки, магазины, большой шанс на утовы, затонувшие храмы",
    "15 - ГО: повышалки, астролог",
  ],
  eyeNarrative: EyeNarrative()
}

export default function Page() {
  const [_, height] = useWindowSize();
  return (
    <main className="flex flex-col items-center justify-between mt-20 overflow-scroll" style={{height: (height - 80)}}>
      <NavigationBar/>
      <div className="pt-2 pl-6 pr-6 w-full" style={{maxWidth: "1500px"}}>
        {
          <ZonesComponent zones={zones} templateConfig={templateConfig}/>
        }
      </div>
    </main>
  )
}

// 1: 3 4 5 6 -> 7 8
// 2: 7 8 9 10 -> 9 10
// 3: 11 12 15 -> 1 2 13x2 14x2
function EyeNarrative() {
  return (
    <div className="flex flex-row space-x-1 relative eyeNarrative">
      <img src={"/img/Eye_Of_Magi.png"} alt="Eye Of Magi"
           style={{maxWidth: "24px", objectFit: "contain", objectPosition: "top"}}/>
      <div>
        <p>Око мага из <span className={"zoneName"} style={{borderColor: colorZoneProme}}>промзоны</span> (3, 4, 5, 6)
          показывает <span className={"zoneName"} style={{borderColor: colorZoneResource}}>ресурсные</span> зоны (7, 8),
          если повезет - можно увидеть охрану портала 35 с другой стороны
        </p>
        <p><span className={"zoneName"} style={{borderColor: colorZoneResource}}>Ресурсные</span> (7, 8) и <span
          className={"zoneName"} style={{borderColor: colorZoneCenter}}>центры</span> (9, 10) показывают оба <span
          className={"zoneName"} style={{borderColor: colorZoneCenter}}>центрa</span> (9, 10)
        </p>
        <p><span className={"zoneName"} style={{borderColor: colorZoneTown}}>Вторики</span> (11, 12) и <span
          className={"zoneName"} style={{borderColor: colorZoneMG}}>ГО</span> (15)
          показывают <span className={"zoneName"} style={{borderColor: colorZoneTreasure}}>трежи</span> (13, 14 по 2
          глаза) и <span className={"zoneName"} style={{borderColor: colorZoneStart}}>стартовые</span> зоны (1, 2)
        </p>
      </div>
    </div>
  )
}