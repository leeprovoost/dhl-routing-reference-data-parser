# Import DHL Routing Reference Data into MongoDB

Convert DHL's Routing Reference Data (pipe-delimited text files) to JSON documents and import into MongoDB. You can download the source files from the [DHL Developer Centre (Routing Reference Data)](http://www.dhl.co.uk/content/gb/en/express/resource_centre/integrated_shipping_solutions/developer_download_centre1.html). This is for DHL customers that want to use the Routing Reference Data set for international postcode lookups to ensure that parcels get delivered correctly.

Download the zip file, extract the three files (country.txt, countrypc.txt and ESDv6.txt). Run the Node.js scripts as described below.

Status: ALPHA.

## prerequisites

Ensure you have Node.js and npm installed (I use Homebrew, see [Setting up Node.js and npm on Mac OSX](http://shapeshed.com/setting-up-nodejs-and-npm-on-mac-osx/)).

Install the npm packages (there is a package.json file in the app root): `npm install`.

Make sure your MongoDB server is up and running: `mongod`.

Ensure you have a database named `test` (or whatever you have called it).

Ensure you have the following collections set up:
- intl_routing_api_ESD
- intl_routing_api_country
- intl_routing_api_countrypc

## country.txt

TODO

## countrypc.txt

TODO

## ESDv6.txt

The `parse-ESDv6.js` script reads the DHL text file line by line and applies the following transformations:
- Remove the fields that we are not interested in
- Deduplicate records
- Expand postcode ranges: looks at postcode from and postcode to and creates individual records for each postcode in the range
- Ensures that all postcodes are treated as Strings instead of mix String and Int32

Step 1: Run converter script `cat ESDv6.txt | node parse-ESDv6.js > ESD-output.txt` (This took 20 hours on my Macbook Pro Retina, I need to work on making the script faster. The result was a 131MB file with roughly 3.25 million records.)

Step 2: Split file in smaller chunks so that MongoDB can import them: `split -l 350000 ESD-output.txt` (this splits the large file into small 13/14MB files with each 350,000 records).

Step 3: Clean up last file: open up the last text file and remove the last few lines, this is because the parser prints some statistics. I will remove this in the next release.

Step 4: Import into MongoDB: for each file, run the following command `mongoimport --db test --collection intl_routing_api_ESD --fields a,b,c --file xaa --jsonArray`

## TODO

See [issues page](https://github.com/leeprovoost/dhl-routing-reference-data-to-json/issues)


