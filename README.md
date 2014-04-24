# dhl-routing-reference-data-to-json

Convert DHL's Routing Reference Data to JSON files so you can import it into MongoDB. You can download the source files from the [DHL Developer Centre (Routing Reference Data)](http://www.dhl.co.uk/content/gb/en/express/resource_centre/integrated_shipping_solutions/developer_download_centre1.html).

Download the zip file, extract the three files (country.txt, countrypc.txt and ESDv6.txt).

Status: ALPHA. NOT USABLE YET.

## country.txt and countrypc.txt

Run: `cat country.txt | node parser`

## ESDv6.txt

TODO
