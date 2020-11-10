#!/bin/sh

cd /bankapp/WAS/mobile/accountmanager/static/Tyvue

sleep 1

cur_path=`pwd`
echo "pwd": ${cur_path}

rm -rf index.html static

rz

unzip dist.zip
echo "===============unzip dist.zip==============="
rm -rf dist.zip
echo "===============rm -rf dist.zip==============="

ll ${cur_path}

sleep 1
echo "===============develop finish==============="