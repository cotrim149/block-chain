#!/usr/bin/python
from json import JSONEncoder
from subprocess import call

myList = []
myList.append("[")
limit = 4

for x in range(1,limit):
    call(["sh", "create_wallet.sh"])
    walletFile = open('wallet','r')

    jsonString = JSONEncoder().encode({
      "id":str(x),
      "name": "Joao da Silva " + str(x),
      "estado": "DF",
      "titulo": "12345678123"+str(x),
      "zone": "12"+str(x),
      "section":"4"+str(x)+"6",
      "wallet": str.strip(walletFile.read())
    })
    myList.append(jsonString)
    if x != limit-1:
        myList.append(",")
    print jsonString

myList.append("]")

f = open('voters.json','w')
for x in myList:
    f.write(x)
f.close()
