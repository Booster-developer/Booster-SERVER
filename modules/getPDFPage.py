#!/usr/bin/env python

import urllib.request
import pdftotext
import sys

url = sys.argv[1]
file = urllib.request.urlopen(url)
fileReader = pdftotext.PDF(file)
print(format(len(fileReader)))


