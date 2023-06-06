// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

// Import ERC721 interface and SafeMath library
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";

import "@openzeppelin/contracts-upgradeable/token/ERC721/IERC721Upgradeable.sol";


import "@openzeppelin/contracts/token/ERC1155/IERC1155Receiver.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721Receiver.sol";

contract NFTMarketplace {
    using SafeMath for uint256;

    struct Bid {
        address bidder;
        uint256 amount;
    }

    mapping(address => mapping(uint256 => Bid)) public bids;

    function onERC721Received(
        address,
        address,
        uint256,
        bytes calldata
    ) external pure returns (bytes4) {
        return this.onERC721Received.selector;
    }

    function checkNFTOwner(
        address nftAddress,
        uint256 tokenId
    ) external view returns (address) {
        address nftOwner = IERC721(nftAddress).ownerOf(tokenId);
        return nftOwner;
    }

    function placeBid(address nftAddress, uint256 tokenId) external payable {
        require(msg.value > 0, "Bid amount must be greater than 0");

        // Get the current highest bid for the NFT
        Bid storage highestBid = bids[nftAddress][tokenId];

        // Require new bid to be higher than the current highest bid
        require(
            msg.value > highestBid.amount,
            "Bid amount must be higher than the current highest bid"
        );

        // Return the previous bid amount to the previous bidder
        if (highestBid.amount > 0) {
            address payable previousBidder = payable(highestBid.bidder);
            previousBidder.transfer(highestBid.amount);
        }

        // Update the highest bid
        highestBid.bidder = msg.sender;
        highestBid.amount = msg.value;
    }

    function acceptBid(address nftAddress, uint256 tokenId) external {
        // Get the highest bid for the NFT
        Bid storage highestBid = bids[nftAddress][tokenId];

        // Require the caller to be the owner of the NFT
        require(
            IERC721(nftAddress).ownerOf(tokenId) == msg.sender,
            "Only the owner can accept a bid"
        );

        // require ( checkNFTOwner(nftAddress, tokenId) == msg.sender, "Only the owner can accept a bid");

        // Transfer the NFT to the bidder
        IERC721(nftAddress).safeTransferFrom(
            msg.sender,
            highestBid.bidder,
            tokenId
        );

        // Transfer the bid amount to the seller
        address payable seller = payable(msg.sender);
        seller.transfer(highestBid.amount);

        // Clear the bid data
        delete bids[nftAddress][tokenId];
    }
}
