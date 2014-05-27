# Import DHL Routing Reference Data into an SQL database

Convert DHL's Routing Reference Data (pipe-delimited text files) to CSV files and 
import into an SQL database (Postgres). You can download the source files from the
[DHL Developer Centre (Routing Reference Data)](http://www.dhl.co.uk/content/gb/en/express/resource_centre/integrated_shipping_solutions/developer_download_centre1.html). 
This is for DHL customers that want to use the Routing Reference Data set for 
international postcode lookups to ensure that parcels get delivered correctly.

## Prerequisites

- Download the zip file, extract the three files (country.txt, countrypc.txt and ESDv6.txt) 
and move them to the "source" folder in your project. 
- Create an empty folder called output.
- Ensure you have Go installed and GOPATH and GOROOT environment variables set up. 
Read more [here](http://golang.org/doc/install).
- Ensure that the shell scripts have execution rights.
- Make sure your Postgres server is up and running. (TODO: create Postgres database initialisation scripts)

## Running the conversion scripts

The `go-scripts/parse-country.go` script reads the DHL text file `source/country.txt` 
and applies the following transformations:
- Remove unused columns and only retains country code, country name, currency and postcode flag
- Convert postcode field to an actual JSON Boolean value
- Remove a couple of records that aren't actual countries

The `go-scripts/parse-countrypc.go` script just reads the DHL text file `source/countrypc.txt`
and changes the delimiter from pipe to comma.

The `go-scripts/parse-ESDv6.go` script reads the DHL text file `source/ESDv6.txt`
and applies the following transformations:
- Remove unused columns and only retains the country code, city name, suburb name and post code
- Manually fixes three records that causes some parsing issues (see code for details)
- Gets rid of the postcode ranges and generates individual records for each postcode in the range

The only thing you need to do is to run the script `./run-conversion-scripts.sh`. 
It assumes that your source data files are in the `source` directory and all the output files 
will be placed in the `output` directory.

## countrypc.txt

Run the script `./process-countrypcs.sh`. It assumes that your `countrypc.txt` file is in the `source` directory and all the output files will be placed in the `output` directory.

## ESDv6.txt

TODO

## Import into Postgres

TODO

