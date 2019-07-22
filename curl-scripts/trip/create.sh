#!/bin/bash

API="http://localhost:4741"
URL_PATH="/trips"

TOKEN="9f225f81505329db861eb3eef31ad8bf"

DEST="miami"
TRANS="500"
LODGE="400"
COST="300"
TOTAL="1200"

curl "${API}${URL_PATH}" \
  --include \
  --request POST \
  --header "Content-Type: application/json" \
  --header "Authorization: Bearer ${TOKEN}" \
  --data '{
    "trip": {
      "destination": "'"${DEST}"'",
      "transportation": "'"${TRANS}"'",
      "lodging": "'"${LODGE}"'",
      "costs": "'"${COST}"'",
      "total": "'"${TOTAL}"'"
    }
  }'

echo
