#!/bin/bash
# note.sh for https://github.com/Naereen/uLogMe/
# MIT Licensed, https://lbesson.mit-license.org/
#
# allows the user to simply record a note, saves it together with unix time in ../logs/notes_...

mkdir -p ../logs

read -p "Enter note: " n

if [ -z $1 ]; then
    T="$(date +%s)" # defualt to current time
else
    T=$1 # argument was provided, use it!
fi

logfile="../logs/notes_$(python rewind7am.py $T).txt"
echo "$T $n" >> $logfile
echo "logged note: $T $n into $logfile"
