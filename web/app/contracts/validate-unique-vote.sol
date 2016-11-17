pragma solidity ^0.4.4;
// import "github.com/Arachnid/solidity-stringutils/strings.sol";


contract validateVote {
    function validateVote() {
    }

    // function toString(address x) returns (string) {
    //     bytes memory b = new bytes(20);
    //     for (uint i = 0; i < 20; i++)
    //         b[i] = byte(uint8(uint(x) / (2**(8*(19 - i)))));
    //     return string(b);
    // }

    // function uintToBytes(uint v) constant returns (bytes32 ret) {
    //     if (v == 0) {
    //         ret = '0';
    //     }
    //     else {
    //         while (v > 0) {
    //             ret = bytes32(uint(ret) / (2 ** 8));
    //             ret |= bytes32(((v % 10) + 48) * 2 ** (8 * 31));
    //             v /= 10;
    //         }
    //     }
    //     return ret;
    // }

    /* Cria array com os politc_types */
    // mapping (string => bool) internal votes_per_types;
    mapping (address => uint) internal politic_to_types;

    struct Vote {
        address politic;
        address voter;
        uint256 value;
    }
    struct Political {
        address wallet;
        uint politic_type;
    }

    Political[] internal politicals;
    Vote[] internal votes;

    function voteTo(address _from, address _to) returns (uint) {
    // function voteTo(address _from, address _to, uint politic_type) returns (uint) {
        // if( votes_per_types[toString(_from).toSlice().concat(uintToBytes(politic_type.toSlice()))] != address(0x0) ) throw;
        if( isPoliticalWallet(_to) == false ) throw;
        if( votingValid(_from, _to) == false ) throw;

        uint voteID = votes.length++;
        Vote v = votes[voteID];
        v.voter = _from;
        v.politic = _to;
        v.value = 1;

        // votes_per_types[toString(_from).toSlice().concat(uintToBytes(politic_type.toSlice()))] = true;

        return voteID;
    }


    function votingSize() returns (uint) {
        return votes.length;
    }

    function isPoliticalWallet(address _to) returns (bool) {
        bool response = true;
        if (politic_to_types[_to] > 0){
            response = false;
        }

        return response;
    }

    function votingValid(address _from, address _to) returns (bool) {
        bool response = true;
        for (uint i=0; i < votes.length; i++){
            if (politic_to_types[votes[i].politic] == politic_to_types[_to]){
                response = false;
            }
        }

        return response;
    }

    function addPolitical(address _wallet, uint _politic_type) returns (uint) {
        uint politicalID = politicals.length++;
        Political v = politicals[politicalID];
        v.wallet = _wallet;
        v.politic_type = _politic_type;

        politic_to_types[_wallet] = _politic_type;

        return politicals.length;
    }

    function politicalSize() returns (uint) {
        return politicals.length;
    }

}