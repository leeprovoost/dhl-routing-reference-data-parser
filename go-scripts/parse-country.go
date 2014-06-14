package main

import (
	"encoding/csv"
	"encoding/json"
	"io"
	"os"
)

const (
	InputFileTXT   = "source/country.txt"
	OutputFileCSV  = "output/countries.csv"
	OutputFileJSON = "output/countries.json"
)

type Country struct {
	CountryCode  string `json:"cc"`
	CountryName  string `json:"cn"`
	Currency     string `json:"cu"`
	PostcodeFlag string `json:"pf"`
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
	csvWriter.Write([]string{"country_code", "country_name", "currency", "postcode_flag"})

	// Process file line by line
	for {
		record, err := reader.Read()
		if err == io.EOF {
			break
		} else if err != nil {
			panic(err)
		}
		postcode_flag := "false"
		if record[10] == "Y" {
			postcode_flag = "true"
		}
		// Write CSV record to file
		csvWriter.Write([]string{record[0], record[1], record[8], postcode_flag})
		// Write JSON document to file
		countryStruct := Country{record[0], record[1], record[8], postcode_flag}
		jsonDocument, _ := json.Marshal(countryStruct)
		outputFileJSON.WriteString(string(jsonDocument) + "\n")
	}
}

