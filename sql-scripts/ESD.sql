-- Table: "intl_postcode_api_ESD"

-- DROP TABLE "intl_postcode_api_ESD";

CREATE TABLE "intl_postcode_api_ESD"
(
  id serial NOT NULL, -- Auto ID
  country_code text NOT NULL, -- 2 letter country code
  city_name text NOT NULL, -- City name
  suburb_name text, -- Suburb name
  postcode text, -- Postcode
  CONSTRAINT "pk_id_ESD" PRIMARY KEY (id)
)
WITH (
  OIDS=FALSE
);
ALTER TABLE "intl_postcode_api_ESD"
  OWNER TO postgres;
COMMENT ON COLUMN "intl_postcode_api_ESD".id IS 'Auto ID';
COMMENT ON COLUMN "intl_postcode_api_ESD".country_code IS '2 letter country code';
COMMENT ON COLUMN "intl_postcode_api_ESD".city_name IS 'City name';
COMMENT ON COLUMN "intl_postcode_api_ESD".suburb_name IS 'Suburb name';
COMMENT ON COLUMN "intl_postcode_api_ESD".postcode IS 'Postcode';


-- Index: "index_country_code_ESD"

-- DROP INDEX "index_country_code_ESD";

CREATE INDEX "index_country_code_ESD"
  ON "intl_postcode_api_ESD"
  USING btree
  (country_code COLLATE pg_catalog."default");

