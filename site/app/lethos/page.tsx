'use client'

import ZonesComponent, {TemplateConfig} from "@/app/Zones";
import {NavigationBar} from "@/app/NavigationBar";
import {useWindowSize} from "@/app/util";
import zones from './lethos.json'

const templateConfig: TemplateConfig = {
  zoneGroups: [
    {
      name: "Стартовые",
      color: "#FF0000",
      zoneNumbers: [1, 2],
      objectGroup: 0
    },
    {
      name: "Промежуточные 3, 6",
      color: "#FFFF00",
      zoneNumbers: [3, 6],
      objectGroup: 0
    },
    {
      name: "Промежуточные 4, 5",
      color: "#00FF00",
      zoneNumbers: [4, 5],
      objectGroup: 0
    },
    {
      name: "Миницентры",
      color: "#00FFFF",
      zoneNumbers: [7, 8, 9, 10],
      objectGroup: 0
    },
    {
      name: "Вторичка+Минитрежа",
      color: "#0000FF",
      zoneNumbers: [13],
      objectGroup: 0
    },
    {
      name: "Трежери",
      color: "#FF00FF",
      zoneNumbers: [11, 12],
      objectGroup: 0
    }
  ],
  templateImage: "/lethos.drawio.svg",
  description: [
    "1,2 - Стартовые зоны: руда дерево, лвл 1-2 банки",
    "3,4,5,6 - Промежуточные зоны: покинутая шахта, мелкие сокровищницы",
    "7,8,9,10 - Миницентры: приличная охрана, арты, сокровищницы, дерево/руда - 2 случайных, случайные двеллинги",
    "11,12 - Трежери",
    "Т+МТ(13) - Вторичка + минитрежа"
  ],
  // 1: 3,4,5,6 -> 7,8,9,10,12
  // 2: ->
  // 3: -> 1,2,11,12
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
