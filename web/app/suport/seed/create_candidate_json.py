#!/usr/bin/python
from json import JSONEncoder
from subprocess import call

myList = []
myList.append("[")
limit = 6

for x in range(0,limit):
    call(["sh", "create_wallet.sh"])
    walletFile = open('wallet','r')

    candidateState = "DF"
    # if x%2 == 0:
    #     candidateState = "DF"
    # else:
    #     candidateState = "GO"

    candidateNumber = ""
    candidateType = ""
    name = ""
    photoPath = ""
    partyID = 13
    if x == 0:
        candidateNumber = str(0)
        candidateType = 0
        name = "Branco"
        photoPath = ""
    elif x == 1:
        candidateNumber = str(partyID)+str(x)+str(x)+str(x)
        candidateType = 1
        name = "PAULO GUEDES"
        photoPath = "guedes.jpg"
    elif x == 2:
        candidateNumber = str(partyID)+str(x)+str(x)
        candidateType = 2
        name = "ERIKA KOKAY"
        photoPath = "erika.jpg"
    elif x == 3:
        candidateNumber = str(partyID)+str(x)
        candidateType = 3
        name = "GERALDO MAGELA"
        photoPath = "magela.jpg"
    elif x == 4:
        candidateNumber = str(partyID)
        candidateType = 4
        name = "AGNELO QUEIROZ"
        photoPath = "agnelo.jpg"
    elif x == 5:
        candidateNumber = str(partyID)
        candidateType = 5
        name = "DILMA ROUSSEFF"
        photoPath = "dilma.jpg"

    photo = ""
    if photoPath != "":
        with open(photoPath, "rb") as f:
            data = f.read()
            photo = data.encode("base64")
    else:
        photo = ""

    jsonString = JSONEncoder().encode({
      "id": str(x),
      "name": name,
      "tipo": candidateType,
      "numero": candidateNumber,
      "partido": "PT",
      "estado": candidateState,
      "wallet": str.strip(walletFile.read()),
      "photo": str(photo)
    })
    myList.append(jsonString)
    if x != limit-1:
        myList.append(",")
    print jsonString

myList.append("]")

f = open('candidates.json','w')
for x in myList:
    f.write(x)
f.close()
