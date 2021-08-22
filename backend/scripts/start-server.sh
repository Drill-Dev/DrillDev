#!/bin/bash

export FLASK_APP=src/app.py
FLASK_DEBUG=1 poetry run flask run --host=0.0.0.0 --port=5000