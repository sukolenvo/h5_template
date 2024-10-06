'use client'

import ZonesComponent, {TemplateConfig} from "@/app/Zones";
import {NavigationBar} from "@/app/NavigationBar";
import {useWindowSize} from "@/app/util";
import zones from './lethos.json'

const zoneColorStart = "#FF0000"
const zoneColorPromGrass = "#FFFF00"
const zoneColorPromFive = "#00FF00"
const zoneColorCenter = "#00FFFF"
const zoneColorTown = "#0000FF"
const zoneColorTreasure = "#FF00FF"

const templateConfig: TemplateConfig = {
  zoneGroups: [
    {
      name: "Стартовые",
      color: zoneColorStart,
      zoneNumbers: [1, 2],
      objectGroup: 0
    },
    {
      name: "Промзоны 3, 6",
      color: zoneColorPromGrass,
      zoneNumbers: [3, 6],
      objectGroup: 0
    },
    {
      name: "Промзоны 4, 5",
      color: zoneColorPromFive,
      zoneNumbers: [4, 5],
      objectGroup: 0
    },
    {
      name: "Миницентры",
      color: zoneColorCenter,
      zoneNumbers: [7, 8, 9, 10],
      objectGroup: 0
    },
    {
      name: "Вторик+МТ",
      color: zoneColorTown,
      zoneNumbers: [13],
      objectGroup: 0
    },
    {
      name: "Трежери",
      color: zoneColorTreasure,
      zoneNumbers: [11, 12],
      objectGroup: 0
    }
  ],
  templateImage: "/lethos.drawio.svg",
  description: [
    "1, 2 - Стартовые зоны: руда дерево, лвл 1-2 банки",
    "3, 4, 5, 6 - Промзоны: покинутая шахта, мелкие сокровищницы (3 и 6 всегда трава, 4, 5 - случайно)",
    "7, 8, 9, 10 - Миницентры: приличная охрана, арты, сокровищницы, дерево/руда - 2 случайных, случайные двеллинги",
    "11, 12 - Трежери",
    "13 - Вторик + минитрежа"
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

// 1: 3,4,5,6 -> 7,8,9,10,13
// 2: ->
// 3: -> 1,2,11,12
function EyeNarrative() {
  return (
    <div className="flex flex-row space-x-1 relative eyeNarrative">
      <img src={"/img/Eye_Of_Magi.png"} alt="Eye Of Magi"
           style={{maxWidth: "24px", objectFit: "contain", objectPosition: "top"}}/>
      <div>
        <p>Око мага во всех промзонах (<span className={"zoneName"}
                                             style={{borderColor: zoneColorPromGrass}}>3, 6</span>, <span
          className={"zoneName"} style={{borderColor: zoneColorPromFive}}>4, 5</span>)
          показывает&nbsp;<span className={"zoneName"} style={{borderColor: zoneColorCenter}}>Mиницентры</span>&nbsp;(7,
          8, 9, 10) и&nbsp;<span className={"zoneName"}
                                 style={{borderColor: zoneColorTown}}>Вторик+МТ</span>&nbsp;(13)
        </p>
      </div>
    </div>
  )
}
