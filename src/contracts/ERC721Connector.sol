// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./ERC721Metada.sol";
import "./ERC721Enumerable.sol";

contract ERC721Connector is ERC721Metada, ERC721Enumerable {

    
    constructor (string memory name, string memory symbol) ERC721Metada(name,symbol){
        
    }  




}