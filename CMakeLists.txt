cmake_minimum_required(VERSION 3.27)

project(simple-cpp-h5-template VERSION 0.1 LANGUAGES CXX C)
add_library(simple-cpp-h5-template-compiler_options INTERFACE)
target_compile_features(simple-cpp-h5-template-compiler_options INTERFACE cxx_std_20)

include(FetchContent)

FetchContent_Declare(
    glaze
    GIT_REPOSITORY https://github.com/stephenberry/glaze.git
    GIT_TAG v1.5.2
    GIT_SHALLOW TRUE
)

FetchContent_Declare(
    xml
    GIT_REPOSITORY https://github.com/sukolenvo/simple-cpp-xml.git
    GIT_TAG v0.3
    GIT_SHALLOW TRUE
)
FetchContent_MakeAvailable(glaze xml)

add_subdirectory(src)

if (CMAKE_PROJECT_NAME STREQUAL PROJECT_NAME)
  enable_testing()
  FetchContent_Declare(
      CLI11
      GIT_REPOSITORY https://github.com/CLIUtils/CLI11.git
      GIT_TAG v2.3.2
      GIT_SHALLOW TRUE
  )
  FetchContent_Declare(
      Catch2
      GIT_REPOSITORY https://github.com/catchorg/Catch2.git
      GIT_TAG v3.4.0
      GIT_SHALLOW TRUE
  )
  FetchContent_MakeAvailable(CLI11 Catch2)
  add_subdirectory(test)
  include(CTest)

  add_executable(simple-cpp-h5-template-tool main.cpp)
  target_link_libraries(simple-cpp-h5-template-tool CLI11::CLI11 simple-cpp-h5-template-lib simple-cpp-h5-template-compiler_options)
  set_target_properties(simple-cpp-h5-template-tool PROPERTIES OUTPUT_NAME h5-template-${CMAKE_PROJECT_VERSION}-${CMAKE_SYSTEM_NAME}-${CMAKE_CXX_COMPILER_ID}-${CMAKE_CXX_COMPILER_VERSION})
endif ()
