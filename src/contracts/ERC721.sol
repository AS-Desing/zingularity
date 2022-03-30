// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./ERC165.sol";

import './interfaces/IERC721.sol';

import './SafeMath.sol';

contract ERC721 is ERC165, IERC721{
    
    using SafeMath for uint256;
    
    mapping (uint256=>address) private _tokenOwner; //these mapping asign a number an any account
    mapping (address=>uint) private _OwnedTokensCount; //these mapping register the number of token assigned of an address
    mapping (uint256=>address) private _tokenApprovals; //approve a token.

    constructor() {
        _registerInterfaces(bytes4(keccak256('balanceOf(bytes4)')
        ^keccak256('ownerOf(bytes4)')^keccak256('transferFrom(bytes4)')));
    }



    //these function is used for know the number of NFT than a person have.
    function balanceOf(address _owner) public view override returns(uint256){
        require(_owner!=address(0),'the address not could be blank');
        return _OwnedTokensCount[_owner];
    }

    //obtain the owner address of nft published
    function ownerOf(uint _tokenId)public view override returns(address){
        address owner= _tokenOwner[_tokenId];
        require(owner!=address(0),'the address not could be blank');
        return owner;
    }

    //these funcion is for evit repit the same NFT could be published
    function _exists (uint256 tokenId)internal view returns(bool){
        //setting the addres of nft owner to check the mapping
        //of the addres from tokenOwner at the tokenId
        address owner=_tokenOwner[tokenId];
        //return truthiness than addres is not zero.
        return owner != address(0);

    }
    function _mint(address to, uint256 tokenId)internal virtual{
        //requiere que la direccion no este vacia 
        require(to !=address(0), 'ERC721: minting to the zero addres');
        //se asegura de que el token no haya sido minado
        require(!_exists(tokenId));
        _tokenOwner[tokenId]= to;
        _OwnedTokensCount[to]+=1; 

        emit Transfer(address(0), to, tokenId);

    }

    // @notice Transfer ownership of an NFT -- THE CALLER IS RESPONSIBLE
    //  TO CONFIRM THAT `_to` IS CAPABLE OF RECEIVING NFTS OR ELSE
    ///  THEY MAY BE PERMANENTLY LOST
    // @dev Throws unless `msg.sender` is the current owner, an authorized
    //  operator, or the approved address for this NFT. Throws if `_from` is
    ///  not the current owner. Throws if `_to` is the zero address. Throws if
    ///  `_tokenId` is not a valid NFT.
    // @param _from The current owner of the NFT
    // @param _to The new owner
    // @param _tokenId The NFT to transfer
    function _transferFrom(address _from, address _to, uint256 _tokenId) internal {
        require(_to!=address(0),"error to transfer to cero address");
        require(ownerOf(_tokenId)==_from, "Trying to transfer a token a the address does not own!");
        _OwnedTokensCount[_from]-=1;
        _OwnedTokensCount[_to]+=1;
        _tokenOwner[_tokenId]=_to;
        emit Transfer(_from, _to, _tokenId);
                
    }
    function transferFrom(address _from, address _to, uint256 _tokenId) override public {
        _transferFrom(_from, _to, _tokenId);
    }

    function approval(address _to, uint256 _tokenId) public {

        address owner= ownerOf(_tokenId);
        require(_to!=owner,'approval to current owner');
        require(owner==msg.sender, 'current caller is not the owner');
        _tokenApprovals[_tokenId]=_to;

        emit Approvals(owner, _to, _tokenId);

    }
    function isApprovedOrOwner(address spender, uint256 tokenId) internal view returns(bool){
        require(_exists(tokenId),"these token don't exist");
        address owner= ownerOf(tokenId);
        return (spender==owner ||getApproved(tokenId)==spender);
    }



    function getApproved(uint256 tokenId) internal view returns(address){
        require(_tokenOwner[tokenId]==ownerOf(tokenId));
        return ownerOf(tokenId);
    }

    //Funciones adiccionales que no estaban en el curso fueron obtenidas desde los archivos de openzeppelin

    function _burn(uint256 tokenId) internal virtual {
        address owner = ownerOf(tokenId);

        // Clear approvals
        getApproved(tokenId);

        _OwnedTokensCount[owner] -= 1;
        delete _tokenOwner[tokenId];

        emit Transfer(owner, address(0), tokenId);

     }

        function burn(uint256 tokenId) public virtual {
        //solhint-disable-next-line max-line-length
        require(isApprovedOrOwner(msg.sender, tokenId), "ERC721Burnable: caller is not owner nor approved");
        _burn(tokenId);
    }


    
}