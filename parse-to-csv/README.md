# Import DHL Routing Reference Data into an SQL database

Convert DHL's Routing Reference Data (pipe-delimited text files) to CSV files and 
import into an SQL database (Postgres). You can download the source files from the
[DHL Developer Centre (Routing Reference Data)](http://www.dhl.co.uk/content/gb/en/express/resource_centre/integrated_shipping_solutions/developer_download_centre1.html). 
This is for DHL customers that want to use the Routing Reference Data set for 
international postcode lookups to ensure that parcels get delivered correctly.

## prerequisites

- Download the zip file, extract the three files (country.txt, countrypc.txt and ESDv6.txt) and move them to the "source" folder in your project. 
- Create an empty folder called output.
- Ensure you have Go installed and GOPATH and GOROOT environment variables set up. Read more [here](http://golang.org/doc/install).
- Make sure your Postgres server is up and running. (TODO: create Postgres database initialisation scripts)
- Ensure that the shell scripts have execution rights.

## country.txt

The `process-countries.sh` script reads the DHL text file `source/country.txt`  and applies the following transformations:
- Remove unused columns and only retains country code, country name, currency and postcode flag
- Convert postcode field to an actual JSON Boolean value
- Remove a couple of records that aren't actual countries

Run the script `./process-countries.sh`. It assumes that your `country.txt` file is in the `source` directory and all the output files will be placed in the `output` directory.

## countrypc.txt

Run the script `./process-countrypcs.sh`. It assumes that your `countrypc.txt` file is in the `source` directory and all the output files will be placed in the `output` directory.

## ESDv6.txt

TODO

## Import into Postgres

TODO

