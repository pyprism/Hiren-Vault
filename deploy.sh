#!/bin/sh

sudo npm install -g bower
virtualenv -p /usr/bin/python3.4 .
source bin/activate.fish
pip install -r requirements.txt
bower install
cd hiren/
python3.4 keygen.py