#!/usr/bin/env python

import urllib.request
import pdftotext

url = "https://danibucket0731.s3.ap-northeast-2.amazonaws.com/Booster/1594403752526.pdf"
file = urllib.request.urlopen(url)
fileReader = pdftotext.PDF(file)
print(format(len(fileReader)))


