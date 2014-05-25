package main

import (
	"encoding/csv"
	"io"
	"os"
)

const (
	InputFile = "source/country.txt"
	OutputFile = "output/country.csv"
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
	writer.Write([]string{"country_code", "country_name", "currency", "postcode_flag"})

	// Process CSV file line by line
	for {
		record, err := reader.Read()
		if err == io.EOF {
			break
		} else if err != nil {
			panic(err)
		}
		writer.Write([]string{record[0], record[1], record[8], record[10]})
	}
}
