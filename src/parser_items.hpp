#ifndef SIMPLE_CPP_H5_TEMPLATE_PARSER_ITEMS_HPP
#define SIMPLE_CPP_H5_TEMPLATE_PARSER_ITEMS_HPP

#include <string>
#include <vector>

#include <glaze/glaze.hpp>

#include "simple_cpp_xml/parser.hpp"

struct Object
{
  std::string name;
  std::string type;
  int maxNumber;
  double chance;
  int value;
};

struct ObjectSet
{
  double chance;
  std::vector<Object> objects;
};

struct MinesInfo {
  Object saw;
  Object ore;
  Object gold;
  Object sulfur;
  Object crystal;
  Object gem;
  Object alchemist;
  Object abandoned;
};

struct Zone
{
  int number;
  std::string terrainType;
  std::vector<ObjectSet> objectSets;
  MinesInfo minesInfo;
};

template<> struct glz::meta<Object>
{
  using T = Object;
  static constexpr auto value = object("name",
    &Object::name,
    "type",
    &Object::type,
    "maxNumber",
    &Object::maxNumber,
    "chance",
    &Object::chance,
    "value",
    &Object::value);
};

template<> struct glz::meta<ObjectSet>
{
  using T = ObjectSet;
  static constexpr auto value = object("chance", &ObjectSet::chance, "objects", &ObjectSet::objects);
};

template<> struct glz::meta<Zone>
{
  using T = Zone;
  static constexpr auto value =
    object("number", &Zone::number, "terrainType", &Zone::terrainType, "objectSets", &Zone::objectSets);
};

class ParserItems : public simple_cpp::xml::Parser
{
private:
  std::vector<Zone> zones;

public:
  ParserItems() = default;
  ~ParserItems() override = default;

  std::vector<Zone> getZones()
  {
    return zones;
  }

protected:
  void on_tag_start(const std::vector<std::string> &tagXmlPath,
    const std::vector<simple_cpp::xml::Attribute> &attributes) override;
  void on_character_data(const std::vector<std::string> &xmlPath, const std::string &data) override;
  void on_tag_end(const std::string &tagName) override;
};

#endif // SIMPLE_CPP_H5_TEMPLATE_PARSER_ITEMS_HPP
