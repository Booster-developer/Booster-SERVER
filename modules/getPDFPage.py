#!/usr/bin/env python

import pdftotext

file = open("/Users/daeun/Desktop/Booster/Booster-SERVER/modules/test.pdf", 'rb')
fileReader = pdftotext.PDF(file)

print(format(len(fileReader)))


