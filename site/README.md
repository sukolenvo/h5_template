
Great source of map objects info: 
http://www.heroesofmightandmagic.com/heroes5/adv_map_locations.shtml

Read eye of magi and hut of magi lists:

```bash
jq '. [] | {number, sets: (.objectSets[] | select(.chance > 0) | {chance, objects: (.objects[] | select(.name | match("^..._Of_Magi.$")))})} | {key: ((.number |tostring + ":" ) + (.sets.chance | tostring)), obj: .sets.objects}' public/lethos.json
```
