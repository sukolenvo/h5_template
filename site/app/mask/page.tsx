'use client'

import ZonesComponent, {TemplateConfig} from "@/app/Zones";
import {NavigationBar} from "@/app/NavigationBar";
import {useWindowSize} from "@/app/util";
import zones from "./mask.json";

const colorZoneStart = "#FF0000"
const colorZonePromGrass = "#ff8f00"
const colorZonePromNotGrass = "#bfbf00"
const colorZoneSmej = "#80FF00"
const colorZoneTown = "#00ffFF"
const colorZoneGold = "#0040ff"
const colorZoneMT = "#8000ff"
const colorZoneTreasure = "#FF00bF"

const templateConfig: TemplateConfig = {
  zoneGroups: [
    {
      name: "Стартовые",
      color: colorZoneStart,
      zoneNumbers: [1, 2],
      objectGroup: 0
    },
    {
      name: "Промзона (3,5)",
      color: colorZonePromGrass,
      zoneNumbers: [3, 5],
      objectGroup: 0
    },
    {
      name: "Промзона (4,6)",
      color: colorZonePromNotGrass,
      zoneNumbers: [4, 6],
      objectGroup: 0
    },
    {
      name: "Смежка (7,9)",
      color: colorZoneSmej,
      zoneNumbers: [7, 9],
      objectGroup: 0
    },
    {
      name: "Вторик", // center top
      color: colorZoneTown,
      zoneNumbers: [8, 10],
      objectGroup: 0
    },
    {
      name: "Золотая",
      color: colorZoneGold,
      zoneNumbers: [11],
      objectGroup: 0
    },
    {
      name: "Минитрежери",
      color: colorZoneMT,
      zoneNumbers: [12],
      objectGroup: 0
    },
    {
      name: "Трежери",
      color: colorZoneTreasure,
      zoneNumbers: [13, 14],
      objectGroup: 0
    }
  ],
  templateImage: "/mask.drawio.svg",
  description: [
    "Все неподписанные - охрана 70",
    "1, 2 - стартовые зоны, руда +дерево, двеллы, повышалки",
    "3, 5 - промзона всегда трава трава",
    "4, 6 - промзона зона - случайная земля (может трава, а может и нет)",
    "7, 9 - смежка",
    "8, 10 - вторик",
    "11 - золотая - золотая шахта, средние арты, столбы и рощи и тд",
    "12 - минитрежа (средние арты, есть приличные сокровищницы, нет утоп)",
    "13, 14 - трежери, хорошие арты, утопы",
  ],
  eyeNarrative: EyeNarrative(),
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

// 1: 3 4 5 6 -> 7 8 9 10
// 2: 7 8 9 10 11 12 -> 12 11
// 3: -> 1 2 13 14
function EyeNarrative() {
  return (
    <div className="flex flex-row space-x-1 relative eyeNarrative">
      <img src={"/img/Eye_Of_Magi.png"} alt="Eye Of Magi"
           style={{maxWidth: "24px", objectFit: "contain", objectPosition: "top"}}/>
      <div>
        <p>Око мага во всех промзонах (<span className={"zoneName"}
                                             style={{borderColor: colorZonePromGrass}}>3, 5</span>,&nbsp;<span
          className={"zoneName"} style={{borderColor: colorZonePromNotGrass}}>4, 6</span>)
          показывает&nbsp;<span className={"zoneName"} style={{borderColor: colorZoneSmej}}>Смежки</span>&nbsp;(7, 9)
          и&nbsp;<span className={"zoneName"}
                       style={{borderColor: colorZoneTown}}>Вторики</span>&nbsp;(8, 10)
        </p>
        <p>
          <span className={"zoneName"} style={{borderColor: colorZoneSmej}}>Смежки</span>&nbsp;(7, 9),&nbsp;<span
          className={"zoneName"} style={{borderColor: colorZoneTown}}>Вторики</span>&nbsp;(8, 10),&nbsp;<span
          className={"zoneName"} style={{borderColor: colorZoneGold}}>Золотая</span>&nbsp;(11) и&nbsp;<span
          className={"zoneName"} style={{borderColor: colorZoneMT}}>Минитрежа</span>&nbsp;(12) показывают&nbsp;<span
          className={"zoneName"} style={{borderColor: colorZoneGold}}>Золотую</span>&nbsp;(11) и&nbsp;<span
          className={"zoneName"} style={{borderColor: colorZoneMT}}>Минитрежери</span>&nbsp;(12)
        </p>
      </div>
    </div>
  )
}
