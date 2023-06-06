// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "erc721a/contracts/ERC721A.sol";

contract KittyCat is ERC721A {
    uint256 MAX_SUPPLY = 5;

    string public baseURI =
        "https://gateway.pinata.cloud/ipfs/QmRgAJau17hYufsJKHqJkKwbvEiSnnPMJ1GqoKoUJNR9uY/";

    constructor() ERC721A("KittyCat", "KTC") {}

    function mint(uint256 quantity) external payable {
        // _safeMint's second argument now takes in a quantity, not a tokenId.
        require(
            totalSupply() + quantity <= MAX_SUPPLY,
            "Not enough tokens left"
        );
        _safeMint(msg.sender, quantity);
    }

    function _baseURI() internal view override returns (string memory) {
        return baseURI;
    }

    function promptDescription() public pure returns (string memory) {
        return "Kitty cartoon";
    }
}
