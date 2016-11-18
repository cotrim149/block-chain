pragma solidity ^0.4.4;
// import "github.com/Arachnid/solidity-stringutils/strings.sol";


contract validateVote {
    function validateVote() {
    }
    
    /* Cria array com os politc_types */
    // mapping (string => bool) internal votes_per_types;
    mapping (address => uint256) internal politic_to_types;

    struct Vote {
        address politic;
        address voter;
        uint256 value;
    }
    struct Political {
        address wallet;
        uint256 politic_type;
    }

    Political[] internal politicals;
    Vote[] internal votes;
    uint public politicals_count;
    uint public votes_count;

    function voteTo(address _from, address _to) returns (uint) {
        if( isPoliticalWallet(_to) == false ) throw;
        if( votingValid(_from, _to) == false ) throw;

        uint voteID = votes.length++;
        Vote v = votes[voteID];
        v.voter = _from;
        v.politic = _to;
        v.value = 1;
        votes_count++;

        return voteID;
    }

    function addPolitical(address _wallet, uint256 _politic_type) returns (uint) {
        uint politicalID = politicals.length++;
        Political v = politicals[politicalID];
        v.wallet = _wallet;
        v.politic_type = _politic_type;

        politic_to_types[_wallet] = _politic_type;
        politicals_count++;

        return politicals.length;
    }



    function isPoliticalWallet(address _to) internal returns (bool) {
        bool response = false;

        for (uint i=0; i < politicals.length; i++){
            if (politicals[i].wallet == _to){
                response = true;
            }
        }

        return response;
    }

    function votingValid(address _from, address _to) internal returns (bool) {
        bool response = true;
        for (uint i=0; i < votes.length; i++){
            if (politic_to_types[votes[i].politic] == politic_to_types[_to]){
                response = false;
            }
        }

        return response;
    }

}