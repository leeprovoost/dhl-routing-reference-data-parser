#!/bin/bash

echo Step 1 of 1: Processing country postcode data...
cat source/country.txt | node node-scripts/parse-country.js > output/country-output.txt

echo Done...