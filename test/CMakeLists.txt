file(GLOB test_source *.cpp)
add_executable(simple-cpp-h5-template-tests ${test_source})
target_link_libraries(simple-cpp-h5-template-tests PRIVATE Catch2::Catch2WithMain simple-cpp-h5-template-compiler_options simple-cpp-h5-template-lib)

include(Catch)
catch_discover_tests(simple-cpp-h5-template-tests)
add_custom_command(TARGET simple-cpp-h5-template-tests POST_BUILD COMMAND ${CMAKE_COMMAND} -E copy_directory ${CMAKE_CURRENT_SOURCE_DIR}/resources ${CMAKE_CURRENT_BINARY_DIR}/resources)