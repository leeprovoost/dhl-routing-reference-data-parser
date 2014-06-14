package main

import (
	"encoding/csv"
	"encoding/json"
	"io"
	"os"
)

const (
	InputFileTXT   = "source/countrypc.txt"
	OutputFileCSV  = "output/countrypcostcodes.csv"
	OutputFileJSON = "output/countrypostcodes.json"
)

type CountryPostcode struct {
	CountryCode       string `json:"cc"`
	PostcodeFormat    string `json:"pf"`
	SignificantDigits string `json:"sd"`
}

func main() {
	// File reader
	inputFile, err := os.Open(InputFileTXT)
	if err != nil {
		panic(err)
	}
	defer inputFile.Close()
	reader := csv.NewReader(inputFile)
	reader.Comma = '|'

	// Set up file writer for CSV
	outputFileCSV, err := os.Create(OutputFileCSV)
	if err != nil {
		panic(err)
	}
	defer outputFileCSV.Close()
	csvWriter := csv.NewWriter(outputFileCSV)
	defer csvWriter.Flush()

	// Set up file writer for JSON
	outputFileJSON, err := os.Create(OutputFileJSON)
	if err != nil {
		panic(err)
	}
	defer outputFileJSON.Close()

	// Write CSV headers
	csvWriter.Write([]string{"country_code", "postcode_format", "significant_digits"})

	// Process CSV file line by line
	for {
		record, err := reader.Read()
		if err == io.EOF {
			break
		} else if err != nil {
			panic(err)
		}
		// Write CSV record to file
		csvWriter.Write([]string{record[0], record[1], record[2]})
		// Write JSON document to file
		countryPostcodeStruct := CountryPostcode{record[0], record[1], record[2]}
		jsonDocument, _ := json.Marshal(countryPostcodeStruct)
		outputFileJSON.WriteString(string(jsonDocument) + "\n")
	}
}
