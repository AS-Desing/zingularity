// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./interfaces/IERC165.sol";

contract ERC165 is IERC165{

    mapping(bytes4=>bool) _supportedInterfaces;


    constructor() {
        _registerInterfaces(bytes4(keccak256("supportedInterfaces(bytes4)")));
    }

    function supportsInterface(bytes4 interfaceID) external view override returns (bool){
        return _supportedInterfaces[interfaceID];
    }

    function _registerInterfaces(bytes4 interfeceId) internal{
        require(interfeceId!=0xffffffff,"invalid interface request");
        _supportedInterfaces[interfeceId]=true;

    }

}