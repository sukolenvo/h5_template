import {Object, ObjectSet, Zone} from "@/app/Zones";
import Image from "next/image";
import {useState} from "react";

type ZoneProps = {
  objectSet: ObjectSet
}

export type ObjectProp = {
  object: Object
}

export function ObjectComponent({object}: ObjectProp) {
  return (
    <div className="flex flex-row items-center" style={{maxWidth: "350px"}}>
      <Image className="m-1" style={{borderRadius: '25%', maxHeight: '64px', objectFit: "contain"}} src={`/img/${object.name}.png`} alt={object.name} width={64} height={64}/>
      <div >
        <p>{object.name}: {Math.round(object.chance * 100) + "% "}
          {object.maxNumber > 1 ? " x" + object.maxNumber : ""}
        </p>
        {
        object.value > 0 && (<p className={`m-0 text-sm opacity-50 text-balance`}>
          Охрана: {object.value}
        </p>)
        }
      </div>
    </div>
  )
}

const excludeItems = ["Rally_Flag", "RefugeeCamp", "Water_Wheel",
  "Prison", "SacrificeAltar", "Oasis", "Garden_of_the_Wee_Folk",
  "Fountain_Of_Youth", "Temple", "Windmill", "Den_Of_Thieves", "Magic_Well", "Fountain_Of_Fortune", "Idol_Of_Fortune",
"House_Of_Astrologer", "Mummy_dwell_new", "Sanctuary", "Dark_knight_new",
"Eye_Of_Magi3", "Fortuitous_Sanctuary", "Wolf_dwell_new", "Manticore_Cave_new", "Eye_Of_Magi1", "Eye_Of_Magi2",
  "Hut_Of_Magi1", "Hut_Of_Magi2", "Magic_Spring", "Hut_Of_Magi3", "Faerie_Ring", "Tavern",
  "Sawmill", "Ore_Pit", "Gold_Mine", "Sulfur_Dune", "Crystal_Cavern", "Gem_Pond", "Alchemist_Lab", "Abandoned_Mine"]

export default function ZoneComponent({objectSet}: ZoneProps) {
  const [artifacts, setArtifacts] = useState(true)
  const [other, setOther] = useState(true)
  const objects = objectSet.objects
    .filter(obj => artifacts && obj.type === "Artifacts" || other && obj.type !== "Artifacts")
    .filter(obj => excludeItems.indexOf(obj.name) === -1)
    .filter(obj => obj.maxNumber !== 0 && obj.chance !== 0)
    .map(obj => <ObjectComponent key={obj.name} object={obj}/>);

  return (
    <div>
      <div className={"flex justify-center p-1 space-x-3"}>
        <label>
          <input type={"checkbox"} onChange={e => setArtifacts(e.target.checked)} checked={artifacts}/>
          Артефакты
        </label>
        <label>
          <input type={"checkbox"}  onChange={e => setOther(e.target.checked)} checked={other}/>
          Другие объекты
        </label>
      </div>
      <div className="grid " style={{gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))"}}>
        {objects}
      </div>
    </div>
  )
}
