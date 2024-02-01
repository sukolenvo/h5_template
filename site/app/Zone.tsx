import {Object, Zone} from "@/app/Zones";
import Image from "next/image";
import {useState} from "react";

type ZoneProps = {
  zone: Zone
}

export type ObjectsProp = {
  objects: Object[]
}

export function ObjectsComponent({objects}: ObjectsProp) {
  const maxNumber = objects.reduce((p, c) => Math.max(p, c.maxNumber), 0)
  return (
    <div className="flex flex-row items-center">
      <Image className="m-1" style={{borderRadius: '25%'}} src={`/img/${objects[0].name}.png`} alt={objects[0].name} width={64} height={64}/>
      <span>{objects[0].name}: {Math.round(objects.reduce((p, c) => p + c.chance, 0) * 100) + "% "}
        {maxNumber > 1 ? " x" + maxNumber : ""}
      </span>
    </div>
  )
}

const excludeItems = ["Rally_Flag", "Mercenary_Camp", "RefugeeCamp", "SchoolofMagic", "Water_Wheel", "Stables",
  "Marletto_Tower", "Prison", "SacrificeAltar", "WarAcademy", "Oasis", "Garden_of_the_Wee_Folk", "Crystal_of_Revelation",
"Fountain_Of_Youth", "Temple", "Windmill", "Den_Of_Thieves", "Magic_Well", "Fountain_Of_Fortune", "Star_Axis", "Idol_Of_Fortune",
"House_Of_Astrologer", "LibraryOfEnlightenment", "Arena", "Redwood_Observatory", "Mummy_dwell_new", "Sanctuary", "Dark_knight_new",
"Eye_Of_Magi3", "Black_Market", "Fortuitous_Sanctuary", "Wolf_dwell_new", "Manticore_Cave_new", "Eye_Of_Magi1", "Eye_Of_Magi2",
  "Hut_Of_Magi1", "Hut_Of_Magi2", "Magic_Spring", "Hut_Of_Magi3", "Mines"]

export default function ZoneComponent({zone}: ZoneProps) {
  let items = new Map<string, Object[]>
  zone.objectSets.flatMap(set => set.objects)
    .forEach(obj => {
      if (excludeItems.indexOf(obj.name) !== -1) {
        return
      }
      if (obj.maxNumber === 0 || obj.chance == 0) {
        return
      }
      if (items.has(obj.name)) {
        items.get(obj.name)!.push(obj)
      } else {
        items.set(obj.name, [obj])
      }
    })
  return (
    <div>
      {Array.from(items, ([key, value]) => <ObjectsComponent key={key} objects={value}/>)}
    </div>
  )
}
