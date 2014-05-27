package main

import (
	"encoding/csv"
	"os"
	"crypto/md5"
	"encoding/hex"
	"io"
	"strconv"
	"fmt"
)

const (
	InputFile = "source/ESDv6.txt"
	OutputFile = "output/ESDv6.csv"
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
	reader.LazyQuotes = true

	// Read the first line (headers) so that we get rid of it
	_, err = reader.Read()
	if err != nil {
		panic(err)
	}

	// File writer
	outputFile, err := os.Create(OutputFile)
	if err != nil {
		panic(err)
	}
	defer outputFile.Close()
	writer := csv.NewWriter(outputFile)
	defer writer.Flush()

	// Write CSV headers
	writer.Write([]string{"country_code", "city_name", "suburb_name", "postcode"})

	// Create a lookup array
	lookupArray := make(map[string]string)

	// Hack: we need the record counter to fix record nr 636243 that has a character
	// that we need to fix manually
	recordCounter := 1

	// Process CSV file line by line
	for {
		recordCounter++
		record, err := reader.Read()
		if err == io.EOF {
			break
		} else if err != nil {
			panic(err)
		}
		var (
			countryCode = record[0]
			cityName = record[4]
			suburbName = record[5]
			postcodeFrom = record[6]
			postcodeTo = record[7]
		)
		// Create hash from record
		hashed := GetMD5Hash(countryCode + cityName + suburbName + postcodeFrom + postcodeTo)
		// If hash exists then discard, otherwise insert in map and write to file
		if _, ok := lookupArray[hashed]; !ok {
			lookupArray[hashed] = hashed
			if postcodeFrom == postcodeTo {
				// Either there is no postcode, or there is a postcode but no postcode range
				if recordCounter == 636243 {
					writer.Write([]string{countryCode, cityName, "SAIDA", postcodeFrom})
					fmt.Println("here we are: " + countryCode + cityName + suburbName + postcodeFrom)
				} else {
					writer.Write([]string{countryCode, cityName, suburbName, postcodeFrom})
				}
			} else {
				// Hack: There are two cases where there are postcode ranges but the postcode is not
				// an integer. Just solve this manually for now.
				if !IsStringAnInteger(postcodeFrom) || !IsStringAnInteger(postcodeTo) {
					if countryCode == "BN" && postcodeFrom == "KA1131" {
						writer.Write([]string{countryCode, cityName, suburbName, "KA1131"})
						writer.Write([]string{countryCode, cityName, suburbName, "KA1132"})
					} else if countryCode == "BN" && postcodeFrom == "KB3533" {
						writer.Write([]string{countryCode, cityName, suburbName, "KB3533"})
						writer.Write([]string{countryCode, cityName, suburbName, "KB3534"})
					} else {
						// Just in case we get some more cases in the future
						panic("Detected an uncaught alphanumeric postcode range again!")
					}
				} else {
					// Unpack postcode ranges
					from, err := strconv.Atoi(postcodeFrom)
					if err != nil {
						panic(err)
					}
					to, err := strconv.Atoi(postcodeTo)
					if err != nil {
						panic(err)
					}
					for i := from; i <= to ; i++ {
						writer.Write([]string{countryCode, cityName, suburbName, strconv.Itoa(i)})
					}
				}
			}
		}
	}
}

// Create an MD5 hash based on a string
func GetMD5Hash(text string) string {
	hashText := md5.New()
	hashText.Write([]byte(text))
	return hex.EncodeToString(hashText.Sum(nil))
}

// Test if a given string is an integer or not
func IsStringAnInteger(text string) bool {
	if _, err := strconv.Atoi(text); err == nil {
		return true
	} else {
		return false
	}
}

