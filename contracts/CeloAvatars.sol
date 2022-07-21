// SPDX-License-Identifier: MIT
pragma solidity ^0.8.2;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract CeloAvatars is ERC721, ERC721Enumerable, ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;

    Counters.Counter private _tokenIdCounter;

    // fee required to mint NFT
    uint256 mintFee;

    // token used to pay for mint
    IERC20 mintFeeToken;

    // Mapping to keep track of tokenID and their owners
    mapping(address => uint256[]) private OwnerNFTs;

    constructor(uint256 _mintFee, address _mintFeeToken)
        ERC721("CeloAvatars", "cAVT")
    {
        mintFee = _mintFee * 1 ether;
        mintFeeToken = IERC20(_mintFeeToken);
    }

    //    mint an NFT
    function safeMint(address to, string memory uri) public onlyOwner {
        require(
            mintFeeToken.transferFrom(msg.sender, owner(), mintFee),
            "Transfer failed."
        );
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, uri);

        //track tokenId;
        OwnerNFTs[to].push(tokenId);
    }

    // Returns all tokenIDs belonging to a user
    function getTokenIdsByOwner(address _wallet)
        public
        view
        returns (uint256[] memory)
    {
        return OwnerNFTs[_wallet];
    }

    // returns minting fee
    function getMintingFee() public view returns (uint256) {
        return mintFee;
    }

    // The following functions are overrides required by Solidity.

    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 tokenId
    ) internal override(ERC721, ERC721Enumerable) {
        super._beforeTokenTransfer(from, to, tokenId);
    }

    //    destroy an NFT
    function _burn(uint256 tokenId)
        internal
        override(ERC721, ERC721URIStorage)
    {
        super._burn(tokenId);
    }

    //    return IPFS url of NFT metadata
    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, ERC721Enumerable)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}
