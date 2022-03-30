// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;


import './interfaces/IERC721Metadata.sol';
import './ERC165.sol';
contract ERC721Metada is IERC721Metadata, ERC165{ 

    string private _name;
    string private _symbol;


    constructor(string memory named, string memory symbolified){
 
        _registerInterfaces(bytes4(keccak256('totalSupply(bytes4)')
        ^keccak256('tokenByIndex(bytes4)')^keccak256('tokenOfOwnerByIndex(bytes4)')));
    
        _name=named;
        _symbol=symbolified;
    }

    function name() external override view returns (string memory){
        return _name;
    }

        function symbol() external override view returns (string memory){
        return _symbol;
    }

}