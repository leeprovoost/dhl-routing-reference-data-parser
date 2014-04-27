# Import DHL Routing Reference Data into MongoDB

Convert DHL's Routing Reference Data (pipe-delimited text files) to JSON documents and import into MongoDB. You can download the source files from the [DHL Developer Centre (Routing Reference Data)](http://www.dhl.co.uk/content/gb/en/express/resource_centre/integrated_shipping_solutions/developer_download_centre1.html). This is for DHL customers that want to use the Routing Reference Data set for international postcode lookups to ensure that parcels get delivered correctly.

Download the zip file, extract the three files (country.txt, countrypc.txt and ESDv6.txt). Run the Node.js scripts as described below.

Status: ALPHA.

## prerequisites

Ensure you have Node.js and npm installed (I use Homebrew, see [Setting up Node.js and npm on Mac OSX](http://shapeshed.com/setting-up-nodejs-and-npm-on-mac-osx/)).

Install following npm packages:
```
npm install csv-streamify
npm install JSONStream
npm install lodash
npm install mongojs
```

## country.txt
- Change the MongoDB variables (database, collection) in parse-country.js
- Run in Terminal: `cat country.txt | node parse-country.js`

## countrypc.txt

- Change the MongoDB variables (database, collection) in parse-countrypc.js
- Run in Terminal: `cat countrypc.txt | node parse-countrypc.js`

## ESDv6.txt

TODO

## TODO

See [issues page](https://github.com/leeprovoost/dhl-routing-reference-data-to-json/issues)


