-- Table: intl_postcode_api_countrypc

-- DROP TABLE intl_postcode_api_countrypc;

CREATE TABLE intl_postcode_api_countrypc
(
  id serial NOT NULL, -- Auto ID
  country_code text NOT NULL, -- 2 letter country code
  postcode_format text NOT NULL, -- Postcode format (numeric and alpha numberic)
  significant_digits integer NOT NULL, -- Significant digits in postcode
  CONSTRAINT pk_id PRIMARY KEY (id)
)
WITH (
  OIDS=FALSE
);
ALTER TABLE intl_postcode_api_countrypc
  OWNER TO postgres;
COMMENT ON COLUMN intl_postcode_api_countrypc.id IS 'Auto ID';
COMMENT ON COLUMN intl_postcode_api_countrypc.country_code IS '2 letter country code';
COMMENT ON COLUMN intl_postcode_api_countrypc.postcode_format IS 'Postcode format (numeric and alpha numberic)';
COMMENT ON COLUMN intl_postcode_api_countrypc.significant_digits IS 'Significant digits in postcode';


-- Index: index_country_code

-- DROP INDEX index_country_code;

CREATE INDEX index_country_code
  ON intl_postcode_api_countrypc
  USING btree
  (country_code COLLATE pg_catalog."default");

