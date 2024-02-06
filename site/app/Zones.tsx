import ZoneComponent from "@/app/Zone";
import Image from "next/image";
import {useEffect, useState} from "react";

export type Object = {
  name: string
  type: string
  maxNumber: number
  chance: number
  value: number
}
export type ObjectSet = {
  chance: number
  objects: Object[]
}

export type Zone = {
  number: number
  terrainType: string
  objectSets: ObjectSet[]
}

export type ZoneGroup = {
  color: string,
  name: string,
  zoneNumbers: number[]
  objectGroup: number
}

export type TemplateConfig = {
  zoneGroups: ZoneGroup[]
  templateImage: string
  description: string[]
}

type ZonesComponentProps = {
  zones: Zone[]
  templateConfig: TemplateConfig
}

const guaranteedObservatory = (zone: Zone): boolean => {
  return zone.objectSets.filter(it => it.chance !== 0).every(set => set.objects.find(obj => obj.chance === 1 && obj.name === "Redwood_Observatory"))
}

export default function ZonesComponent({zones, templateConfig}: ZonesComponentProps): JSX.Element {
  const [expanded, setExpanded] = useState(-1)
  return (
    <div className="flex flex-col items-center w-full">
      <div className="relative w-full" style={{height: 350, minWidth: 600}}>
        <Image src={templateConfig.templateImage} alt={"Template"} fill style={{objectFit: "contain"}}/>
      </div>
      <div className={"w-full"}>
        {templateConfig.description.map(it => (<p key={it}>{it}</p>))}
      </div>
      {templateConfig.zoneGroups.map((zoneGroup, zoneIdx) => (
        <div className="w-full m-3" key={zoneIdx}>
          <div style={{borderColor: zoneGroup.color, borderWidth: '2px'}}
               className="flex w-full justify-center items-center lg:static lg:w-auto  lg:rounded-xl lg:border lg:p-4 bg-gray-400 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
               onClick={() => setExpanded(expanded === zoneIdx ? -1 : zoneIdx)}> {zoneGroup.name}
            <div className="relative w-5 h-5 m-1">
              {zones[zoneGroup.zoneNumbers[0] - 1]?.terrainType === "Grass" &&
                  <Image src="/img/grass.png" alt="Terrain Grass" fill style={{objectFit: "contain"}}/>}
              {zones[zoneGroup.zoneNumbers[0] - 1] && guaranteedObservatory(zones[zoneGroup.zoneNumbers[0] - 1]) &&
                  <Image src="/img/ic_Redwood_Observatory.png" alt="Observatory" fill style={{objectFit: "contain"}}/>}
            </div>
          </div>
          {zoneIdx === expanded && (
            <ZoneComponent objectSet={zones[zoneGroup.zoneNumbers[0] - 1].objectSets[zoneGroup.objectGroup]}/>)}
        </div>))
      }
    </div>
  )
}
