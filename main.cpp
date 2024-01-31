#include <iostream>
#include <string>

#include <CLI/CLI.hpp>
#include <glaze/glaze.hpp>

#include <parser_items.hpp>

std::string readFile(const char *path)
{
  std::ifstream stream(path);
  if (stream.is_open()) {
    std::stringstream buffer;
    buffer << stream.rdbuf();
    stream.close();
    return buffer.str();
  } else {
    throw std::runtime_error("Failed to open task input file");
  }
}

int main(int argc, char **argv)
{
  CLI::App app{ "H5 template parser." };
  std::string filename;
  app.add_option("-f,--file", filename, "Template file.")->required(true)->check(CLI::ExistingFile);

  std::string output;
  app.add_option("-o,--ouput", output, "Output file.");

  CLI11_PARSE(app, argc, argv);

  ParserItems parserItems;
  parserItems.parse(readFile(filename.c_str()));

  if (output.empty()) {
    std::cout << glz::write_json(parserItems.getZones());
  } else {
    const auto error = glz::write_file_json(parserItems.getZones(), output, std::string{});
    if (error) {
      std::cerr << error;
    }
  }
}