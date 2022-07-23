// SPDX-License-Identifier: MIT
pragma solidity ^0.8.2;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract CeloAvatars is ERC721, ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;

    Counters.Counter private _tokenIdCounter;

    // fee required to mint NFT
    uint256 mintFee;

    // token used to pay for mint
    IERC20 mintFeeToken;

    // Mapping to keep track of tokenID and their owners
    mapping(address => uint256[]) private ownerNFTs;

    constructor(uint256 _mintFee, address _mintFeeToken)
        ERC721("CeloAvatars", "cAVT")
    {
        mintFee = _mintFee * 1 ether;
        mintFeeToken = IERC20(_mintFeeToken);
    }

    /// @dev mints an NFT
    /// @notice mintFee is paid first using the ERC20 token
    function safeMint(address to, string memory uri) public payable {
        require(to != address(0), "Invalid recipient");
        require(
            mintFeeToken.transferFrom(msg.sender, owner(), mintFee),
            "Transfer failed."
        );
        _tokenIdCounter.increment();
        uint256 tokenId = _tokenIdCounter.current();
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, uri);

        //track tokenId;
        ownerNFTs[to].push(tokenId);
    }

    /// @dev Returns all tokenIDs belonging to a user
    function getTokenIdsByOwner(address _wallet)
        public
        view
        returns (uint256[] memory)
    {
        uint length = ownerNFTs[_wallet].length;
        uint[] memory ownedTokens = new uint[](length);
        uint currentIndex = 0;
        for (uint i = 0; i < length; i++) {
            uint tokenId = ownerNFTs[_wallet][i];
            if (ownerOf(tokenId) == _wallet) {
                ownedTokens[currentIndex] = tokenId;
                currentIndex++;
            }
        }

        return ownedTokens;
    }

    /// @dev returns minting fee
    function getMintingFee() public view returns (uint256) {
        return mintFee;
    }

    // The following functions are overrides required by Solidity.


        /**
     * @dev See {IERC721-transferFrom}.
     * Changes is made to transferFrom to keep track of tokens ownership
     */
    function transferFrom(
        address from,
        address to,
        uint256 tokenId
    ) public override {
        ownerNFTs[to].push(tokenId);
        super.transferFrom(from, to, tokenId);
    }

    /**
     * @dev See {IERC721-safeTransferFrom}.
     * Changes is made to safeTransferFrom to keep track of tokens ownership
     */
    function safeTransferFrom(
        address from,
        address to,
        uint256 tokenId,
        bytes memory data
    ) public override {
        ownerNFTs[to].push(tokenId);
        _safeTransfer(from, to, tokenId, data);
    }

    /// @dev    destroy an NFT
    function _burn(uint256 tokenId)
        internal
        override(ERC721, ERC721URIStorage)
    {
        super._burn(tokenId);
    }

    /// @dev    return IPFS url of NFT metadata
    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }
}
