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
  return guaranteed(zone, "Redwood_Observatory")
}

const guaranteed = (zone: Zone, objectName: string): boolean => {
  return zone.objectSets.filter(it => it.chance !== 0).every(set => set.objects.find(obj => obj.chance === 1 && obj.maxNumber > 0 && obj.name === objectName))
}

const guaranteedMills = (zone: Zone): string[] => {
  return ["Sawmill", "Ore_Pit", "Gold_Mine", "Sulfur_Dune", "Crystal_Cavern", "Gem_Pond", "Alchemist_Lab", "Abandoned_Mine"]
    .filter(it => guaranteed(zone, it))
}

const ZoneIcon = (icon: string, description: string) => {
  return (
    <div className="relative w-5 h-5 m-1">
      <Image key={icon} src={`/img/${icon}.png`} alt={description} fill style={{objectFit: "contain"}}/>
    </div>
  )
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
          <div style={{borderColor: zoneGroup.color, borderWidth: '3px'}}
               className="flex w-full justify-center items-center lg:static lg:w-auto  lg:rounded-xl lg:border lg:p-4 bg-gray-400 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
               onClick={() => setExpanded(expanded === zoneIdx ? -1 : zoneIdx)}> {zoneGroup.name}
            {zones[zoneGroup.zoneNumbers[0] - 1]?.terrainType === "Grass" && ZoneIcon("grass", "Terrain Grass")}
            {zones[zoneGroup.zoneNumbers[0] - 1] && guaranteedObservatory(zones[zoneGroup.zoneNumbers[0] - 1]) &&
              ZoneIcon("ic_Redwood_Observatory", "Observatory")}
            {zones[zoneGroup.zoneNumbers[0] - 1] && guaranteedMills(zones[zoneGroup.zoneNumbers[0] - 1]).map(mill =>
              ZoneIcon(mill, mill))}
          </div>
          {zoneIdx === expanded && (
            <ZoneComponent objectSet={zones[zoneGroup.zoneNumbers[0] - 1].objectSets[zoneGroup.objectGroup]}/>)}
        </div>))
      }
    </div>
  )
}
