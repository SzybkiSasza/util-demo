# Utility demo

Simple demo based on my scaffolding project to show my coding practices.

Few things that are worth noting:
1. I use both jscs and jshint for code styles/hinting - my own preference
2. I write 100% covered code. Coverage is calculated using `istanbul`
3. Grunt is used only for running tests, coverage and code style checks.

To run tests:

    grunt mochaTest
or coverage:

    grunt mocha_istanbul

To run all the checks, just type:

    grunt
