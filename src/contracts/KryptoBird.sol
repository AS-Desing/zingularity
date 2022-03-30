// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import './ERC721Connector.sol';
contract KryptoBird is ERC721Connector{

    string [] public kryptoBirdz;

    mapping (string=>bool) _kryptoBirdzExist;



    function mint(string memory _kryptobirdz) public{

        require(!_kryptoBirdzExist[_kryptobirdz], 'Este nft ya existe');        
        //crear un espacio dentro de la cadena para el nft unico
        kryptoBirdz.push(_kryptobirdz);
        uint _id=kryptoBirdz.length-1;

        //emplea la funcion almacenada en ERC721 _mint para crear el id unico del nft
        _mint(msg.sender, _id);

        //verificar si el id del nft no es nulo y existe dentro de la lista 
        _kryptoBirdzExist[_kryptobirdz]=true;
    }
    constructor() ERC721Connector("KryptoBird","KBIRDZ"){

    }
}