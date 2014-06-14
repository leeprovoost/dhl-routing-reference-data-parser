-- Table: intl_postcode_api_country

-- DROP TABLE intl_postcode_api_country;

CREATE TABLE intl_postcode_api_country
(
  country_code text NOT NULL, -- 2 letter country code
  country_name text NOT NULL, -- Full country name
  currency text NOT NULL, -- Currency code
  postcode_flag boolean NOT NULL, -- Does this country use postcodes or not?
  CONSTRAINT pk_country_code PRIMARY KEY (country_code)
)
WITH (
  OIDS=FALSE
);
ALTER TABLE intl_postcode_api_country
  OWNER TO postgres;
COMMENT ON COLUMN intl_postcode_api_country.country_code IS '2 letter country code';
COMMENT ON COLUMN intl_postcode_api_country.country_name IS 'Full country name';
COMMENT ON COLUMN intl_postcode_api_country.currency IS 'Currency code';
COMMENT ON COLUMN intl_postcode_api_country.postcode_flag IS 'Does this country use postcodes or not?';

