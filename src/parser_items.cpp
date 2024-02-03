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
    Zone zone;
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
    auto value = 0;
    if (find_attribute(attributes, "ShouldBeGuarded") == "true") {
      value = parseInteger(find_attribute(attributes, "Value"));
    }
    const auto name = find_attribute(attributes, "Name");
    const auto type = *++tagXmlPath.rbegin();
    zones.back().objectSets.back().objects.emplace_back(name, type, parseInteger(maxNumber), parseDouble(chance), value);
  }
}
