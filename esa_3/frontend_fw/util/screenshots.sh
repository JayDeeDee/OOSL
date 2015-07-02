#!/bin/sh

array=( 1600 768 320 )

for i in "${array[@]}"
    do
echo "screen: $i"
echo "name : $1"
echo "url : $2"
webkit2png -Fs 1 -W $i --filename='screenshot-'$1'-'$i --delay=1 "$2"
done