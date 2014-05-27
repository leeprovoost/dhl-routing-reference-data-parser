package main

import (
	"io"
	"os"
	"encoding/csv"
)

const (
	InputFile  = "source/countrypc.txt"
	OutputFile = "output/countrypc.csv"
)

func main() {
	// File reader
	inputFile, err := os.Open(InputFile)
	if err != nil {
		panic(err)
	}
	defer inputFile.Close()
	reader := csv.NewReader(inputFile)
	reader.Comma = '|'

	// File writer
	outputFile, err := os.Create(OutputFile)
	if err != nil {
		panic(err)
	}
	defer outputFile.Close()
	writer := csv.NewWriter(outputFile)
	defer writer.Flush()

	// Write CSV headers
	writer.Write([]string{"country_code", "postcode_format", "significant_digits"})

	// Process CSV file line by line
	for {
		record, err := reader.Read()
		if err == io.EOF {
			break
		} else if err != nil {
			panic(err)
		}
		writer.Write([]string{record[0], record[1], record[2]})
	}
}
