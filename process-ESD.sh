#!/bin/bash

echo Step 1 of 6: Removing header line...
tail -n +2 ESDv6.txt > temp.txt

echo Step 2 of 6: Deal with line 636242 that causes some issues...
head -636241 temp.txt > temp2.txt
echo LB\|\|\|BEY\|SAIDA\|SAIDA\|\|\|S\|\|BEYSAD\|SC\|TD >> temp2.txt
tail -n +636243 temp.txt >> temp2.txt

echo Step 3 of 6: Delete the columns that we are not interested in and remove duplicate records...
cut -d '|' -f 1,5,6,7,8 temp2.txt | sort | uniq > temp3.txt

echo Step 4 of 6: Run the node script to expand the postcode ranges
cat temp3.txt | node parse-ESDv6.js > temp4.txt

echo Step 5 of 6: Cut up the JSON document in smaller files so that we can import them using mongoimport...
split -l 350000 temp4.txt

echo Step 6 of 6: Delete all temporary files...
rm temp.txt
rm temp2.txt
rm temp3.txt
rm temp4.txt

echo Done...
