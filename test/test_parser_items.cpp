#include <catch2/catch_test_macros.hpp>

#include <parser_items.hpp>

#include "io_utils.hpp"


TEST_CASE("ParserItems:zone_count", "[parser_items]")
{
  const auto xml = readFile("resources/Lethos.irt");
  ParserItems parser;
  parser.parse(xml);

  REQUIRE(parser.getZones().size() == 13);
  REQUIRE(parser.getZones()[0].objectSets.size() == 3);
  REQUIRE(parser.getZones()[0].objectSets[0].chance == 1);
  REQUIRE(parser.getZones()[0].objectSets[1].chance == 0);
  REQUIRE(parser.getZones()[0].objectSets[2].chance == 0);
  REQUIRE(parser.getZones()[0].objectSets[0].objects.size() == 69);
  REQUIRE(parser.getZones()[0].objectSets[0].objects[0].name == "Mercenary_Camp");
  REQUIRE(parser.getZones()[0].objectSets[0].objects[0].type == "BattleObjects");
  REQUIRE(parser.getZones()[0].objectSets[0].objects[0].maxNumber == 1);
  REQUIRE(parser.getZones()[0].objectSets[0].objects[0].chance == 1);
}