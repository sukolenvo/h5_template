#include <array>
#include <fstream>
#include <sstream>
#include <stdexcept>

#include "io_utils.hpp"

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
