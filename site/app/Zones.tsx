import ZoneComponent from "@/app/Zone";
import Image from "next/image";
import {useEffect, useState} from "react";
import {InfoOutlined} from "@mui/icons-material";

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
  eyeNarrative?: React.ReactElement
}

type ZonesComponentProps = {
  zones: Zone[]
  templateConfig: TemplateConfig
}

const guaranteed = (objectSet: ObjectSet, objectName: string): boolean => {
  return objectSet.objects.find(obj => obj.chance === 1 && obj.maxNumber > 0 && obj.name === objectName) !== undefined
}

const guaranteedObjects = (objectSet: ObjectSet): string[] => {
  return [ "Redwood_Observatory", "Magic_Spring", "Sawmill", "Ore_Pit", "Gold_Mine", "Sulfur_Dune", "Crystal_Cavern", "Gem_Pond", "Alchemist_Lab", "Abandoned_Mine"]
    .filter(it => guaranteed(objectSet, it))
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
      <div className="flex flex-col space-y-1 w-full">
        <div className="flex flex-row space-x-1">
          <InfoOutlined color={"info"}/>
          <div className={"w-full"}>
            {templateConfig.description.map(it => (<p key={it}>{it}</p>))}
          </div>
        </div>
        {templateConfig.eyeNarrative}
      </div>
      {templateConfig.zoneGroups.map((zoneGroup, zoneIdx) => {
        const zone = zones[zoneGroup.zoneNumbers[0] - 1];
        const objectSet = zone.objectSets[zoneGroup.objectGroup]
        return (
          <div className="w-full m-3" key={zoneIdx}>
            <div style={{borderColor: zoneGroup.color, borderWidth: '3px'}}
                 className="flex w-full justify-center items-center lg:static lg:w-auto  lg:rounded-xl lg:border lg:p-4 bg-gray-400 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
                 onClick={() => setExpanded(expanded === zoneIdx ? -1 : zoneIdx)}> {zoneGroup.name}
              {zone?.terrainType === "Grass" && ZoneIcon("grass", "Terrain Grass")}
              {guaranteedObjects(objectSet).map(mill => ZoneIcon(mill, mill))}
            </div>
            {zoneIdx === expanded && (<ZoneComponent objectSet={objectSet}/>)}
          </div>);
      })
      }
    </div>
  )
}
