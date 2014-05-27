#!/bin/bash

echo Start of CSV conversion scripts.
echo Ensure that:
echo - your DHL data files are in a directory called ./source
echo - you have created an empty ./output directory
echo
echo Step 1 of 3: Processing country data...
go run go-scripts/parse-country.go
echo Step 2 of 3: Processing country postcode data...
go run go-scripts/parse-countrypc.go
echo Step 3 of 3: Processing ESD data...
go run go-scripts/parse-ESDv6.go
echo
echo Done. Check the CSV files in the ./output directory.