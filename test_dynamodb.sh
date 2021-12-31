#!/usr/bin/bash

aws dynamodb query \
  --table-name StarbucksLocations \
  --index-name StoreLocationIndex \
  --key-condition-expression 'Country = :c AND begins_with(StateCityPostcode, :s)' \
  --expression-attribute-values '{
    ":c": {"S": "US"},
    ":s": {"S": "NE#OMAHA#68144"}
  }' \
  --select COUNT \
  --region localhost --endpoint-url http://localhost:8000
