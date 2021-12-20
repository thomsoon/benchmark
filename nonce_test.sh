#!/bin/sh
curl -X POST -H "Content-Type: application/json" -d '{"nonce":1}' localhost:8080/nonce
