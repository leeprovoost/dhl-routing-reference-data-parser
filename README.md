# Parse DHL Routing Reference Data and convert to JSON and CSV

Parse DHL's Routing Reference Data (pipe-delimited text files) and convert to both JSON documen ts (so that you can import it into MongoDB) and CSV (so that you can import it into any SQL-based database). You can download the source files from the [DHL Developer Centre (Routing Reference Data)](http://www.dhl.co.uk/content/gb/en/express/resource_centre/integrated_shipping_solutions/developer_download_centre1.html). This is for DHL customers that want to use the Routing Reference Data set for international postcode lookups to ensure that parcels get delivered correctly.

This is a hobby project of mine to play with new programming languages (in this case Go).

## Prerequisites

- Have Go 1.2 installed (not tested yet against 1.3)
- Download the zip file from the [DHL Developeer Centre]((http://www.dhl.co.uk/content/gb/en/express/resource_centre/integrated_shipping_solutions/developer_download_centre1.html)), extract the three files (country.txt, countrypc.txt and ESDv6.txt) and move them to the "source" folder in your project. 
- Create an empty folder called output.
- Ensure you have Go installed and GOPATH and GOROOT environment variables set up. Read more [here](http://golang.org/doc/install).
- Ensure that the shell scripts have execution rights.

## Running the conversion script

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

## Import into Postgres

I need to write some import scripts for Postgres. There are already Postgres table creation
scripts available [here](https://github.com/leeprovoost/dhl-routing-reference-data-parser/tree/master/sql-scripts).

## Import into MongoDB

Make sure your MongoDB server is up and running: `mongod`.

Ensure you have a database named `test`. If you are using a different database name, change it in the `import-datafiles-to-mongo.sh` script.

The script will create the following collections. Change the names in the `import-datafiles-to-mongo.sh` if you want to use other names:
- intl_postcode_api_ESD
- intl_postcode_api_country
- intl_postcode_api_countrypc

Ensure that the four shell scripts have execution rights.

Run the script `./import-datafiles-to-mongo.sh`.

## TODO

See [issues page](https://github.com/leeprovoost/dhl-routing-reference-data-parser/issues)