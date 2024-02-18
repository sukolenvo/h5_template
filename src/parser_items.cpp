#include <algorithm>
#include <stdexcept>

#include "parser_items.hpp"

int parseInteger(const auto &value)
{
  try {
    return std::stoi(value);
  } catch (const std::invalid_argument &) {
    throw std::invalid_argument(std::string("Cannot convert to integer value: ") + value);
  }
}

double parseDouble(const auto &value)
{
  try {
    return std::stod(value);
  } catch (const std::invalid_argument &) {
    throw std::invalid_argument(std::string("Cannot convert to double value: ") + value);
  }
}

std::string find_attribute(const std::vector<simple_cpp::xml::Attribute> &attributes, const auto &name)
{
  const auto it = std::find_if(attributes.begin(), attributes.end(), [&](const auto &attr) {
    return attr.name == name;
  });
  if (it == std::end(attributes)) {
    return "";
  }
  return it->value;
}

void ParserItems::on_tag_start(const std::vector<std::string> &tagXmlPath,
  const std::vector<simple_cpp::xml::Attribute> &attributes)
{
  if (tagXmlPath.empty()) {
    return;
  }
  if (tagXmlPath.size() == 3 && tagXmlPath[1] == "Zones" && tagXmlPath[2].starts_with("Zone")) {
    Zone zone{};
    zone.minesInfo.saw.name = "Sawmill";
    zone.minesInfo.saw.type = "mill";
    zone.minesInfo.ore.name = "Ore_Pit";
    zone.minesInfo.ore.type = "mill";
    zone.minesInfo.gold.name = "Gold_Mine";
    zone.minesInfo.gold.type = "mill";
    zone.minesInfo.sulfur.name = "Sulfur_Dune";
    zone.minesInfo.sulfur.type = "mill";
    zone.minesInfo.crystal.name = "Crystal_Cavern";
    zone.minesInfo.crystal.type = "mill";
    zone.minesInfo.gem.name = "Gem_Pond";
    zone.minesInfo.gem.type = "mill";
    zone.minesInfo.alchemist.name = "Alchemist_Lab";
    zone.minesInfo.alchemist.type = "mill";
    zone.minesInfo.abandoned.name = "Abandoned_Mine";
    zone.minesInfo.abandoned.type = "mill";
    zone.number = parseInteger(tagXmlPath[2].substr(4));
    zones.push_back(zone);
  } else if (tagXmlPath.back().starts_with("ObjectsSet")) {
    ObjectSet objectSet;
    objectSet.chance = parseDouble(find_attribute(attributes, "Appear_Chance"));
    zones.back().objectSets.push_back(objectSet);
  } else if (tagXmlPath.back() == "Object") {
    const auto chance = find_attribute(attributes, "Chance");
    if (chance == "0.0") {
      return;
    }
    auto maxNumber = find_attribute(attributes, "MaxNumber");
    if (maxNumber.empty()) {
      maxNumber = "0";
    }
    const auto type = *++tagXmlPath.rbegin();
    auto value = parseInteger(find_attribute(attributes, "Value"));
    const auto shouldBeGuarded = find_attribute(attributes, "ShouldBeGuarded");
    if (shouldBeGuarded == "false") {
      value = 0;
    }
    const auto name = find_attribute(attributes, "Name");
    zones.back().objectSets.back().objects.emplace_back(name, type, parseInteger(maxNumber), parseDouble(chance), value);
  } else if (tagXmlPath.back() == "Mines") {
    MinesInfo &minesInfo = zones.back().minesInfo;
    auto value = find_attribute(attributes, "Sawmill");
    if (!value.empty()) {
      minesInfo.saw.maxNumber = parseInteger(value);
    }
    value = find_attribute(attributes, "Ore_Pit");
    if (!value.empty()) {
      minesInfo.ore.maxNumber = parseInteger(value);
    }
    value = find_attribute(attributes, "Gold_Mine");
    if (!value.empty()) {
      minesInfo.gold.maxNumber = parseInteger(value);
    }
    value = find_attribute(attributes, "Sulfur_Dune");
    if (!value.empty()) {
      minesInfo.sulfur.maxNumber = parseInteger(value);
    }
    value = find_attribute(attributes, "Crystal_Cavern");
    if (!value.empty()) {
      minesInfo.crystal.maxNumber = parseInteger(value);
    }
    value = find_attribute(attributes, "Gem_Pond");
    if (!value.empty()) {
      minesInfo.gem.maxNumber = parseInteger(value);
    }
    value = find_attribute(attributes, "Alchemist_Lab");
    if (!value.empty()) {
      minesInfo.alchemist.maxNumber = parseInteger(value);
    }
    value = find_attribute(attributes, "Abandoned_Mine");
    if (!value.empty()) {
      minesInfo.abandoned.maxNumber = parseInteger(value);
    }
  } else if (tagXmlPath.back() == "MinesData") {
    MinesInfo &minesInfo = zones.back().minesInfo;
    auto value = find_attribute(attributes, "SawmillValue");
    if (!value.empty()) {
      minesInfo.saw.value = parseInteger(value);
    }
    value = find_attribute(attributes, "Ore_Pit");
    if (!value.empty()) {
      minesInfo.ore.value = parseInteger(value);
    }
    value = find_attribute(attributes, "Gold_MineValue");
    if (!value.empty()) {
      minesInfo.gold.value = parseInteger(value);
    }
    value = find_attribute(attributes, "Sulfur_DuneValue");
    if (!value.empty()) {
      minesInfo.sulfur.value = parseInteger(value);
    }
    value = find_attribute(attributes, "Crystal_CavernValue");
    if (!value.empty()) {
      minesInfo.crystal.value = parseInteger(value);
    }
    value = find_attribute(attributes, "Gem_PondValue");
    if (!value.empty()) {
      minesInfo.gem.value = parseInteger(value);
    }
    value = find_attribute(attributes, "Alchemist_LabValue");
    if (!value.empty()) {
      minesInfo.alchemist.value = parseInteger(value);
    }
    value = find_attribute(attributes, "Abandoned_MineValue");
    if (!value.empty()) {
      minesInfo.abandoned.value = parseInteger(value);
    }
    value = find_attribute(attributes, "SawmillChance");
    if (!value.empty()) {
      minesInfo.saw.chance = parseDouble(value);
    }
    value = find_attribute(attributes, "Ore_PitChance");
    if (!value.empty()) {
      minesInfo.ore.chance = parseDouble(value);
    }
    value = find_attribute(attributes, "Gold_MineChance");
    if (!value.empty()) {
      minesInfo.gold.chance = parseDouble(value);
    }
    value = find_attribute(attributes, "Sulfur_DuneChance");
    if (!value.empty()) {
      minesInfo.sulfur.chance = parseDouble(value);
    }
    value = find_attribute(attributes, "Crystal_CavernChance");
    if (!value.empty()) {
      minesInfo.crystal.chance = parseDouble(value);
    }
    value = find_attribute(attributes, "Gem_PondChance");
    if (!value.empty()) {
      minesInfo.gem.chance = parseDouble(value);
    }
    value = find_attribute(attributes, "Alchemist_LabChance");
    if (!value.empty()) {
      minesInfo.alchemist.chance = parseDouble(value);
    }
    value = find_attribute(attributes, "Abandoned_MineChance");
    if (!value.empty()) {
      minesInfo.abandoned.chance = parseDouble(value);
    }
  }
}
void ParserItems::on_character_data(const std::vector<std::string> &xmlPath, const std::string &data)
{
  if (!xmlPath.empty() && xmlPath.back() == "TerrainType") {
    zones.back().terrainType = data;
  }
}
void ParserItems::on_tag_end(const std::string &tagName)
{
  if (tagName.starts_with("Zone") && tagName != "Zones") {
    auto &zone = zones.back();
    for (auto &set : zone.objectSets) {
      set.objects.push_back(zone.minesInfo.saw);
      set.objects.push_back(zone.minesInfo.ore);
      set.objects.push_back(zone.minesInfo.gold);
      set.objects.push_back(zone.minesInfo.sulfur);
      set.objects.push_back(zone.minesInfo.crystal);
      set.objects.push_back(zone.minesInfo.gem);
      set.objects.push_back(zone.minesInfo.alchemist);
      set.objects.push_back(zone.minesInfo.abandoned);
    }
  }
}
