
UNAME_S = $(shell uname -s)
ifeq ($(UNAME_S),Linux)
	IPC_PATH = ~/.ethereum/geth.ipc
endif
ifeq ($(UNAME_S),Darwin)
	IPC_PATH = ~/Library/Ethereum/geth.ipc
endif

all:

set_data_dir:
	geth --datadir ./private_net init private_genesis.json

init_blockchain:
	echo 'init blockchain with miner'
	geth --fast --cache 512 -ipcpath $(IPC_PATH) --networkid 1234 --datadir ./private_net --unlock 0 --rpc --rpccorsdomain="*" --rpcaddr "0.0.0.0" --mine --minerthreads=1 --password std_passw

seed_candidates_wallet:
	echo 'seed candidates'
	python create_candidate_json.py

seed_voters_wallet:
	echo 'seed voters'
	python create_voter_json.py
