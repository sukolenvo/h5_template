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
};

struct ObjectSet
{
  double chance;
  std::vector<Object> objects;
};

struct Zone
{
  int number;
  std::vector<ObjectSet> objectSets;
};

template<> struct glz::meta<Object>
{
  using T = Object;
  static constexpr auto value =
    object("name", &Object::name, "type", &Object::type, "maxNumber", &Object::maxNumber, "chance", &Object::chance);
};

template<> struct glz::meta<ObjectSet>
{
  using T = ObjectSet;
  static constexpr auto value = object("chance", &ObjectSet::chance, "objects", &ObjectSet::objects);
};

template<> struct glz::meta<Zone>
{
  using T = Zone;
  static constexpr auto value = object("number", &Zone::number, "objectSets", &Zone::objectSets);
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
};

#endif // SIMPLE_CPP_H5_TEMPLATE_PARSER_ITEMS_HPP
