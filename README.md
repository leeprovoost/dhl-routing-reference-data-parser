# dhl-routing-reference-data-to-json

Convert DHL's Routing Reference Data (pipe-delimited text files) to JSON documents so you can import it into MongoDB. You can download the source files from the [DHL Developer Centre (Routing Reference Data)](http://www.dhl.co.uk/content/gb/en/express/resource_centre/integrated_shipping_solutions/developer_download_centre1.html). This is for DHL customers that want to use the Routing Reference Data set for international postcode lookups to ensure that parcels get delivered correctly.

Download the zip file, extract the three files (country.txt, countrypc.txt and ESDv6.txt).

Status: ALPHA. NOT USABLE YET.

## prerequisites

Ensure you have Node.js and npm installed (I use Homebrew, see [Setting up Node.js and npm on Mac OSX](http://shapeshed.com/setting-up-nodejs-and-npm-on-mac-osx/)

Install following npm packages:
```
npm install csv-streamify
npm install JSONStream
npm install lodash
```

## country.txt

TODO

## countrypc.txt

TODO

## ESDv6.txt

TODO

## TODO

See [issues page](https://github.com/leeprovoost/dhl-routing-reference-data-to-json/issues)

