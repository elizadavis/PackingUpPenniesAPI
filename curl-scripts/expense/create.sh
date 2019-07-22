#!/bin/bash

API="http://localhost:4741"
URL_PATH="/expenses"

TOKEN="47f65242b894066c1bf96c3e3963bf7e"
HITEM="uber"
HCOST="15"
LITEM="subway"
LCOST="3"
DIFF="12"

curl "${API}${URL_PATH}" \
  --include \
  --request POST \
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
