geth --password std_passw account new > geth_address_output
cat geth_address_output| cut -d' ' -f2 | cut -d'{' -f2 | cut -d'}' -f1 > wallet
rm geth_address_output
cat wallet
