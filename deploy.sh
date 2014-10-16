#!/bin/bash

virtualenv -p /usr/bin/python3.4 .
source bin/activate
pip install -r requirements.txt
bower install
cd hiren/
python3.4 keygen.py
