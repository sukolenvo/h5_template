FILE(GLOB source *.cpp)

add_library(simple-cpp-h5-template-lib ${source})
target_link_libraries(simple-cpp-h5-template-lib simple-cpp-h5-template-compiler_options simple-cpp-xml::lib glaze::glaze)
target_include_directories(simple-cpp-h5-template-lib INTERFACE ${CMAKE_CURRENT_SOURCE_DIR})