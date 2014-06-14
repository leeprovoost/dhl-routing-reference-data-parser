#!/bin/bash

echo Start of conversion scripts...
echo
echo Step 1 of 5: Check if ./source files exist
if [ -f "source/country.txt" ]
then
	echo "./source/country.txt found."
else
	echo "./source/country.txt not found."
fi
if [ -f "source/countrypc.txt" ]
then
	echo "./source/countrypc.txt found."
else
	echo "./source/countrypc.txt not found."
fi
if [ -f "source/ESDv6.txt" ]
then
	echo "./source/ESDv6.txt found."
else
	echo "./source/ESDv6.txt not found."
fi
echo
echo Step 2 of 5: Check if ./output directory exists
if [ ! -d "output" ]
then
	echo "./output not found, creating directory."
  	mkdir output
else 
	echo "./output found."
fi
echo
echo Step 3 of 5: Processing country data...
go run go-scripts/parse-country.go
echo Step 4 of 5: Processing country postcode data...
go run go-scripts/parse-countrypc.go
echo Step 5 of 5: Processing ESD data...
go run go-scripts/parse-ESDv6.go
echo
echo Done. Check the CSV and JSON files in the ./output directory.