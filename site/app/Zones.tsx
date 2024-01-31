import ZoneComponent from "@/app/Zone";
import Image from "next/image";
import {useState} from "react";

export type Object = {
  name: string
  type: string
  maxNumber: number
  chance: number
}
export type ObjectSet = {
  chance: number
  objects: Object[]
}
export type Zone = {
  number: number
  objectSets: ObjectSet[]
}

type ZonesComponentProps = {
  zones: Zone[]
}

const zoneGroups = [
  [1, 2], // starting
  [3, 6], // P
  [4, 5], // P
  [7, 8, 9, 10], // minicenter
  [11, 12], // T
  [13] // T + MT
]
const zoneColors = [
  "#FF0000",
  "#FFFF00",
  "#00FF00",
  "#00FFFF",
  "#0000FF",
  "#FF00FF"
]
const zoneNames = [
  "Стартовые",
  "Промежуточные 3, 6",
  "Промежуточные 4, 5",
  "Миницентры",
  "Трежери",
  "Вторичка+Минитрежа",
]
export default function ZonesComponent({zones}: ZonesComponentProps): JSX.Element {
  let line = []
  for (let i = 0; i < zones.length; i++) {
    for (let j = i + 1; j < zones.length; j++) {
      if (JSON.stringify(zones[i].objectSets) === JSON.stringify(zones[j].objectSets)) {
        line.push(zones[i].number + " " + zones[j].number)
      }
    }
  }
  const [expanded, setExpanded] = useState(-1)

  return (
    <div className="flex flex-col items-center">
      <Image src={"/img/lethos_c.png"} alt={"Template"} width={600} height={200}/>
      <div>
        <p>1,2 - Стартовые зоны: руда дерево, лвл 1-2 банки</p>
        <p>3,4,5,6 - Промежуточные зоны: покинутая шахта, мелкие сокровищницы</p>
        <p>7,8,9,10 - Миницентры: приличная охрана, арты, сокровищницы, дерево/руда - 2 случайных, случайные двеллинги</p>
        <p>11,12 - Трежери</p>
        <p>Т+МТ(13) - Вторичка + минитрежа</p>
      </div>
      {zoneGroups.map((zoneGroup, zoneIdx) => (
        <div className="w-full m-3">
          <div style={{borderColor: zoneColors[zoneIdx], borderWidth: '2px'}}
               className="flex w-full justify-center  lg:static lg:w-auto  lg:rounded-xl lg:border lg:p-4 bg-gray-400 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
               onClick={() => setExpanded(expanded === zoneIdx ? -1 : zoneIdx)}> {zoneNames[zoneIdx]}
          </div>
          {zoneIdx === expanded && (<ZoneComponent key={zoneGroup[0]} zone={zones[zoneGroup[0] - 1]}/>)}
        </div>))
      }
    </div>
  )
}
