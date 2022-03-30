// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./ERC721.sol";
import './interfaces/IEC721Enumerable.sol';
contract ERC721Enumerable is ERC721, IERC721Enumerable{

    uint256[] private _allTokens;

    //mapping from TokenId to possition _alltokens
    mapping(uint256=>uint256) private _allTokensIndex;

    //mapping of owner to list of all owner token ids
    mapping(address=>uint256[]) private _ownedTokens;

    //mapping from token ID index of owner token list
    mapping(uint256=>uint256) private _ownedTokensIndex;




    constructor() {
        _registerInterfaces(bytes4(keccak256('totalSupply(bytes4)')
        ^keccak256('tokenByIndex(bytes4)')^keccak256('tokenOfOwnerByIndex(bytes4)')));
    }


    //these function is used for create a list assosiate the owner with yours personal tokens and the complete list of tokens en 
    //the page
    function _mint(address to, uint256 tokenId) internal override(ERC721){
        super._mint(to, tokenId);

        _addTokenToTokenEnumeration(tokenId);
        _addtokensToOwnerEnumeration(to, tokenId);


    }

    //these function is used for add the new token to the index.
    function _addTokenToTokenEnumeration(uint256 tokenId) private {
        
        _allTokensIndex[tokenId]=_allTokens.length;
        _allTokens.push(tokenId);

    }


    function tokenByIndex(uint256 index) public override view returns(uint256){
        require(index<totalSupply(), 'global index is out of bounds!');
        return _allTokens[index];
    }

    //relationship the owner with your token's
    function tokenOfOwnerByIndex(address owner, uint256 index) public override view returns(uint256){
        require(index<balanceOf(owner), 'global index is out of bounds!');
        return _ownedTokens[owner][index];
    }

    //thes function is used for know the number of token associated to address
    function _addtokensToOwnerEnumeration (address to, uint256 tokenId) private{
        
        _ownedTokensIndex[tokenId]=_ownedTokens[to].length;
        _ownedTokens[to].push(tokenId);

    }

    function totalSupply() public override view returns(uint256){
        return _allTokens.length;
    }

}