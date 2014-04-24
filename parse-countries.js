// This script takes the DHL country.txt file, only retains the used columns and spits out a JSON file
// See developer documentation here: http://www.dhl.co.uk/content/gb/en/express/resource_centre/integrated_shipping_solutions/developer_download_centre1.html

var Transform = require('stream').Transform
  , csv = require('csv-streamify')
  , JSONStream = require('JSONStream')
  , _ = require('lodash');

// see parser options defined here: https://github.com/klaemo/csv-stream
var csvToJson = csv({objectMode: true, delimiter: '|' });

var parser = new Transform({objectMode: true});
parser._transform = function(data, encoding, done) {
  this.push(this._parseRow(data));
  done();
};

// Parse a data row into an object
parser._parseRow = function(row) {
	// filter the columns we are interested in, we're using single letter column names to save
	// space in our MongoDB database
	// a: Country Code, b: Country Name, c: Currency Code, d: Use Postcode Flag
	var result = _.zipObject(
		['a','b','c','d'], 
		[row[0],row[1],row[8],row[10]]
	);
  	
  	return result;
};

process.stdin
.pipe(csvToJson)
.pipe(parser)
.pipe(JSONStream.stringify(false))
.pipe(process.stdout);