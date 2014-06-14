#!/bin/bash

echo Step 1 of 4: Split large JSON document in smaller chunks so that mongoimport can handle them
split -l 300000 output/ESDv6.json
mv xa* output

echo Step 2 of 4: Uploading ESD files to MongoDB...
mongoimport --db test --collection intl_postcode_api_ESD --fields a,b,c,d --file output/xaa --jsonArray
mongoimport --db test --collection intl_postcode_api_ESD --fields a,b,c,d --file output/xab --jsonArray
mongoimport --db test --collection intl_postcode_api_ESD --fields a,b,c,d --file output/xac --jsonArray
mongoimport --db test --collection intl_postcode_api_ESD --fields a,b,c,d --file output/xad --jsonArray
mongoimport --db test --collection intl_postcode_api_ESD --fields a,b,c,d --file output/xae --jsonArray
mongoimport --db test --collection intl_postcode_api_ESD --fields a,b,c,d --file output/xaf --jsonArray
mongoimport --db test --collection intl_postcode_api_ESD --fields a,b,c,d --file output/xag --jsonArray
mongoimport --db test --collection intl_postcode_api_ESD --fields a,b,c,d --file output/xah --jsonArray
mongoimport --db test --collection intl_postcode_api_ESD --fields a,b,c,d --file output/xai --jsonArray
mongoimport --db test --collection intl_postcode_api_ESD --fields a,b,c,d --file output/xaj --jsonArray
mongoimport --db test --collection intl_postcode_api_ESD --fields a,b,c,d --file output/xak --jsonArray

echo Step 3 of 4: Uploading country file to MongoDB...
mongoimport --db test --collection intl_postcode_api_country --fields a,b,c,d --file output/countries.json --jsonArray

echo Step 4 of 4: Uploading countrypc file to MongoDB...
mongoimport --db test --collection intl_postcode_api_countrypc --fields a,b,c --file output/countrypostcodes.json --jsonArray

echo Done...

