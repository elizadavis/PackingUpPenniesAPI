#!/bin/bash

API="http://localhost:4741"
URL_PATH="/expenses"

curl "${API}${URL_PATH}/${ID}" \
  --include \
  --request PATCH \
  --header "Content-Type: application/json" \
--header "Authorization: Bearer ${TOKEN}" \
--data '{
  "expense": {
    "higherItem": "'"${HITEM}"'",
    "higherCost": "'"${HCOST}"'",
    "lowerItem": "'"${LITEM}"'",
    "lowerCost": "'"${LCOST}"'",
    "difference": "'"${DIFF}"'"
    }
  }'

echo
