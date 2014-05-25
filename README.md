# Parse DHL Routing Reference Data and convert to JSON and CSV

Parse DHL's Routing Reference Data (pipe-delimited text files) and convert to either JSON (so that you can import it into MongoDB) or to CSV (so that you can import it into any SQL-based database). You can download the source files from the [DHL Developer Centre (Routing Reference Data)](http://www.dhl.co.uk/content/gb/en/express/resource_centre/integrated_shipping_solutions/developer_download_centre1.html). This is for DHL customers that want to use the Routing Reference Data set for international postcode lookups to ensure that parcels get delivered correctly.

This is a hobby project of mine to play with new programming languages. The DHL data to JSON code is a combination of bash scripts and Node.js code. The DHL data to CSV code is a combination of bash scripts and Go code. I might get rid of the Node.js code and port everything to Go.

## Parse DHL data to CSV

Status: Under development

See details [here](https://github.com/leeprovoost/dhl-routing-reference-data-parser/tree/master/parse-to-csv).

## Parse DHL data to JSON and import into MongoDB

Status: Fully working

See details [here](https://github.com/leeprovoost/dhl-routing-reference-data-parser/tree/master/parse-to-json).

## TODO

See [issues page](https://github.com/leeprovoost/dhl-routing-reference-data-parser/issues)