#!/bin/bash

echo Step 1 of 4: Split large JSON document in smaller chunks so that mongoimport can handle them
split -l 250000 output/ESDv6.json "ESDv6_small_"
mv xa* output

echo Step 2 of 4: Uploading ESD files to MongoDB...
mongoimport --db test --collection intl_postcode_api_ESD --fields a,b,c,d --file output/ESDv6_small_aa --jsonArray
mongoimport --db test --collection intl_postcode_api_ESD --fields a,b,c,d --file output/ESDv6_small_ab --jsonArray
mongoimport --db test --collection intl_postcode_api_ESD --fields a,b,c,d --file output/ESDv6_small_ac --jsonArray
mongoimport --db test --collection intl_postcode_api_ESD --fields a,b,c,d --file output/ESDv6_small_ad --jsonArray
mongoimport --db test --collection intl_postcode_api_ESD --fields a,b,c,d --file output/ESDv6_small_ae --jsonArray
mongoimport --db test --collection intl_postcode_api_ESD --fields a,b,c,d --file output/ESDv6_small_af --jsonArray
mongoimport --db test --collection intl_postcode_api_ESD --fields a,b,c,d --file output/ESDv6_small_ag --jsonArray
mongoimport --db test --collection intl_postcode_api_ESD --fields a,b,c,d --file output/ESDv6_small_ah --jsonArray
mongoimport --db test --collection intl_postcode_api_ESD --fields a,b,c,d --file output/ESDv6_small_ai --jsonArray
mongoimport --db test --collection intl_postcode_api_ESD --fields a,b,c,d --file output/ESDv6_small_aj --jsonArray
mongoimport --db test --collection intl_postcode_api_ESD --fields a,b,c,d --file output/ESDv6_small_ak --jsonArray
mongoimport --db test --collection intl_postcode_api_ESD --fields a,b,c,d --file output/ESDv6_small_al --jsonArray
mongoimport --db test --collection intl_postcode_api_ESD --fields a,b,c,d --file output/ESDv6_small_am --jsonArray
mongoimport --db test --collection intl_postcode_api_ESD --fields a,b,c,d --file output/ESDv6_small_an --jsonArray

echo Step 3 of 4: Uploading country file to MongoDB...
mongoimport --db test --collection intl_postcode_api_country --fields a,b,c,d --file output/countries.json --jsonArray

echo Step 4 of 4: Uploading countrypc file to MongoDB...
mongoimport --db test --collection intl_postcode_api_countrypc --fields a,b,c --file output/countrypostcodes.json --jsonArray

echo Done...

