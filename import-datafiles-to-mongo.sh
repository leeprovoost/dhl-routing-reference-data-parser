#!/bin/bash

echo Step 1 of 3: Uploading ESD files to MongoDB...
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

echo Step 2 of 3: Uploading country file to MongoDB...
mongoimport --db test --collection intl_postcode_api_country --fields a,b,c,d --file output/country-output.txt --jsonArray

echo Step 3 of 3: Uploading countrypc file to MongoDB...
mongoimport --db test --collection intl_postcode_api_countrypc --fields a,b,c --file output/countrypc-output.txt --jsonArray

echo Done...

