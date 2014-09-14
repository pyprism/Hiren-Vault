#!/bin/sh

sudo npm install -g bower
virtualenv -p /usr/bin/python3.4 .
source bin/activate.fish
pip install -r requirements.txt
bower install
python3.4 hiren/keygen.py