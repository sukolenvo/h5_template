'use client'

import ZonesComponent, {TemplateConfig} from "@/app/Zones";
import {NavigationBar} from "@/app/NavigationBar";
import {useWindowSize} from "@/app/util";
import zones from './rainbow.json';

const colorZoneStart = "#FF0000"
const colorZoneProm = "#FFD500"
const colorZoneMiniTreasure = "#00FF00"
const colorZoneCenter = "#00FFFF"
const colorZoneMG = "#0000FF"
const colorZoneTreasure = "#FF00FF"

const templateConfig: TemplateConfig = {
  zoneGroups: [
    {
      name: "Стартовые",
      color: colorZoneStart,
      zoneNumbers: [1, 2],
      objectGroup: 0
    },
    {
      name: "Промзона (50%) - 3,4,5,6,7,8",
      color: colorZoneProm,
      zoneNumbers: [3, 4, 5, 6, 7, 8],
      objectGroup: 0
    },
    {
      name: "Миниресурсная (50%) - 3,4,5,6,7,8",
      color: colorZoneProm,
      zoneNumbers: [3, 4, 5, 6, 7, 8],
      objectGroup: 1
    },
    {
      name: "Ресурсная (42%) - 9,11,12,14",
      color: colorZoneMiniTreasure,
      zoneNumbers: [9, 11, 12, 14],
      objectGroup: 0
    },
    {
      name: "Минитрежери (43%) - 9,11,12,14",
      color: colorZoneMiniTreasure,
      zoneNumbers: [9, 11, 12, 14],
      objectGroup: 1
    },
    {
      name: "Вторик (15%) - 9,11,12,14",
      color: colorZoneMiniTreasure,
      zoneNumbers: [9, 11, 12, 14],
      objectGroup: 2
    },
    {
      name: "Центр - Ресурсная (10,13)",
      color: colorZoneCenter,
      zoneNumbers: [10, 13],
      objectGroup: 0
    },
    {
      name: "Центр - Минитрежери (10,13)",
      color: colorZoneCenter,
      zoneNumbers: [10, 13],
      objectGroup: 1
    },
    {
      name: "Центр - Вторик (10,13)",
      color: colorZoneCenter,
      zoneNumbers: [10, 13],
      objectGroup: 2
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
      zoneNumbers: [16, 17],
      objectGroup: 0
    }
  ],
  templateImage: "/rainbow.drawio.svg",
  description: [
    "Все неподписанные свызи имеют силу охраны 60",
    "1,2 - стартовые зоны",
    "3,4,5,6,7,8 могут быть либо промзоны, либо миниресурсные",
    "9,11,12,14 - могут быть минитрежери, вторичка, ресурсная",
    "10,13 - золотая, в центральной зоне будет 1-2 обзорки",
    "15 - ГО",
    "16,17 - трежери",
    "на картах не будут генериться золотые шахты и мешки +1000 золота",
  ],
  eyeNarrative: EyeNarrative(),
}

export default function Page() {
  const [_, height] = useWindowSize();
  return (
    <main className="flex flex-col items-center justify-between mt-20 overflow-scroll" style={{height: (height - 80)}}>
      <NavigationBar/>
      <div className="pt-2 pl-6 pr-6 w-full" style={{maxWidth: "1500px"}}>
        {<ZonesComponent zones={zones} templateConfig={templateConfig}/>}
      </div>
    </main>
  )
}

// 1: 0.5x3 0.5x4 0.5x5 0.5x6 0.5x7 0.5x8  -> 0.42x9 0.43x9 0.42x10 0.43x10 0.42x11 0.43x11 0.42x12 0.43x12 0.42x13 0.43x13 0.42x14 0.43x14
// 2: 0.5x3 0.5x3 0.5x4 0.5x4 0.5x5 0.5x5 0.5x6 0.5x6 0.5x7 0.5x7 0.5x8 0.5x8-> 0.15x9 0.15x10 0.15x11 0.15x12 0.15x13 0.15x14
// 3: 1 2 0.15x9 0.15x10 0.15x11 0.15x12 0.15x13 0.15x14 15 -> 16x2 17x2
function EyeNarrative() {
  return (
    <div className="flex flex-row space-x-1 relative eyeNarrative">
      <img src={"/img/Eye_Of_Magi.png"} alt="Eye Of Magi"
           style={{maxWidth: "24px", objectFit: "contain", objectPosition: "top"}}/>
      <div>
        <p>
          Око мага в&nbsp;<span className={"zoneName"} style={{borderColor: colorZoneStart}}>Стартовой</span>&nbsp;зоне
          (1, 2),&nbsp;<span className={"zoneName"} style={{borderColor: colorZoneMG}}>ГО</span>&nbsp;(15),&nbsp;<span
          className={"zoneName"} style={{borderColor: colorZoneMiniTreasure}}>Вторике</span>&nbsp;и&nbsp;<span
          className={"zoneName"} style={{borderColor: colorZoneCenter}}>Центр-Вторике</span>&nbsp;(зоны 9, 10, 11, 12,
          13,
          14 с замком - шанс 15%) показывают&nbsp;<span className={"zoneName"}
                                                        style={{borderColor: colorZoneTreasure}}>Трежи</span>&nbsp;(16,
          17 по два глаза)
        </p>
        <p>
          <span className={"zoneName"} style={{borderColor: colorZoneProm}}>Миниресурсные</span>&nbsp;(зоны 3, 4, 5, 6,
          7, 8 с шахтами) показывают все&nbsp;<span
          className={"zoneName"} style={{borderColor: colorZoneMiniTreasure}}>Вторики</span>&nbsp;и&nbsp;<span
          className={"zoneName"} style={{borderColor: colorZoneCenter}}>Центр-Вторики</span>&nbsp;(зоны 9, 10, 11, 12,
          13, 14 с замком). Если око мага ничего не показало - в этой карте нет дополнительных замков.
          Если око мага показало 6 зон - интересная игра будет у некроманта.
        </p>
        <p>
          В&nbsp;<span className={"zoneName"} style={{borderColor: colorZoneProm}}>Промзонах</span>&nbsp;(зоны 3, 4, 5,
          6, 7, 8 без шахт) два Ока магов. Одно показывает&nbsp;<span
          className={"zoneName"} style={{borderColor: colorZoneMiniTreasure}}>Вторики</span>&nbsp;и&nbsp;<span
          className={"zoneName"} style={{borderColor: colorZoneCenter}}>Центр-Вторики</span>&nbsp;(если они
          есть), второе -&nbsp;<span
          className={"zoneName"} style={{borderColor: colorZoneMiniTreasure}}>Ресурсные</span>&nbsp;+&nbsp;<span
          className={"zoneName"} style={{borderColor: colorZoneCenter}}>Центр-Ресурсные</span>&nbsp;(9, 10, 11, 12, 3,
          14) и&nbsp;<span
          className={"zoneName"} style={{borderColor: colorZoneMiniTreasure}}>Минитрежери</span>&nbsp;+&nbsp;<span
          className={"zoneName"} style={{borderColor: colorZoneCenter}}>Центр-Минитрежери</span>&nbsp;(9, 10,
          11, 12, 13, 14).
        </p>
      </div>
    </div>
  )
}