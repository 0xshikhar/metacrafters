// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

contract CreateToken {
    // public variable declaration
    string public tokenName = "MyToken";
    string public abbr = "MTC";
    uint256 public supply = 1000000;

    // mapping
    mapping(address => uint) public balances;

    // mint function
    function mint(address _to, uint256 _value) public {
        require(_to != address(0), "Invalid address.");
        supply += _value;
        balances[_to] += _value;
    }

    function burn(address _from, uint256 _value) public {
        require(_from != address(0), "Invalid address.");
        require(balances[_from] >= _value, "Insufficient balance.");
        supply -= _value;
        balances[_from] -= _value;
    }

    function balanceOf(address _owner) public view returns (uint256) {
        return balances[_owner];
    }
}
