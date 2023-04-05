// SPDX-License-Identifier: MIT
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
pragma solidity ^0.8.0;


contract ShikharToken is ERC20{
string public constant name1 = "Shikhar's Coin";
string public constant symbol1="SRC";
uint8 public constant decimals1=18;

constructor(uint256 initialSupply) ERC20(name1,symbol1) {
        _mint(msg.sender, initialSupply);
    }

// constructor(uint256 initialSupply) public {
//     initialSupply=totalSupply_;
//     // _mint(msg.sender, initialSupply); 
//     // balances[msg.sender] = totalSupply_;

// }
    
}