#!/usr/bin/python
from json import JSONEncoder
from subprocess import call

myList = []
myList.append("[")
limit = 6

# Partido 1
for x in range(0,limit):
    call(["sh", "seed/create_wallet.sh"])
    walletFile = open('wallet','r')

    candidateState = "DF"

    candidateNumber = ""
    candidateType = ""
    name = ""
    photoPath = ""
    partyID = 94
    if x == 0:
        candidateNumber = str(0)
        candidateType = 0
        name = "Branco"
        photoPath = ""
    elif x == 1 :
        candidateNumber = str(partyID)+str(0)+str(0)+str(1)
        candidateType = 1
        name = "Pascoa"
        photoPath = "seed/images/pascoa.png"
    elif x == 2 :
        candidateNumber = str(partyID)+str(0)+str(2)
        candidateType = 2
        name = "Oktoberfest"
        photoPath = "seed/images/oktoberfest.png"
    elif x == 3 :
        candidateNumber = str(partyID)+str(3)
        candidateType = 3
        name = "Folia de Reis"
        photoPath = "seed/images/folia_reis.png"
    elif x == 4 :
        candidateNumber = str(partyID)
        candidateType = 4
        name = "Boi-Bumba"
        photoPath = "seed/images/bumba.png"
    elif x == 5 :
        candidateNumber = str(partyID)
        candidateType = 5
        name = "Festa Junina"
        photoPath = "seed/images/festa_junina.png"

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
      "partido": "PFest",
      "estado": candidateState,
      "wallet": str.strip(walletFile.read()),
      "photo": "data:image/png;base64,"+str(photo)
    })
    myList.append(jsonString)
    if x != limit-1:
        myList.append(",")
    print jsonString

myList.append(",")

# Partido 2
for x in range(1,limit):
    call(["sh", "seed/create_wallet.sh"])
    walletFile = open('wallet','r')

    candidateState = "DF"

    candidateNumber = ""
    candidateType = ""
    name = ""
    photoPath = ""
    partyID = 95
    if x == 1 :
        candidateNumber = str(partyID)+str(0)+str(0)+str(1)
        candidateType = 1
        name = "Curupira"
        photoPath = "seed/images/curupira.png"
    elif x == 2 :
        candidateNumber = str(partyID)+str(0)+str(2)
        candidateType = 2
        name = "Saci"
        photoPath = "seed/images/saci.png"
    elif x == 3 :
        candidateNumber = str(partyID)+str(3)
        candidateType = 3
        name = "Iara"
        photoPath = "seed/images/iara.png"
    elif x == 4 :
        candidateNumber = str(partyID)
        candidateType = 4
        name = "Boto cor-de-rosa"
        photoPath = "seed/images/boto.png"
    elif x == 5 :
        candidateNumber = str(partyID)
        candidateType = 5
        name = "Boitata"
        photoPath = "seed/images/boitata.png"

    photo = ""
    if photoPath != "":
        with open(photoPath, "rb") as f:
            data = f.read()
            photo = data.encode("base64")
    else:
        photo = ""

    jsonString = JSONEncoder().encode({
      "id": str(x+(limit-1)),
      "name": name,
      "tipo": candidateType,
      "numero": candidateNumber,
      "partido": "PFolc",
      "estado": candidateState,
      "wallet": str.strip(walletFile.read()),
      "photo": "data:image/png;base64,"+str(photo)
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
