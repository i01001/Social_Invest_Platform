//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.15;

import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

/// @dev All error codes generated within the contract
error invalidentry();
error ownerOnly();
error incorrectValue();
error notSeller();
error noBalance();

/// @title OTC Trading on Social Trading Platform
/// @author Ikhlas
/// @dev All function calls are currently implemented without any side effects
/// @custom:experimental - pending security audits - Use with caution
contract STPlatform {
    using Counters for Counters.Counter;

    /// @notice Counter for order numbers
    Counters.Counter public orderNumber;

    /// @notice _owner - Owner address
    address public _owner;

    /// @notice Orders records with order number, Token Contract,Number of Tokens and Matic
    struct orders {
        uint256 _orderNumber;
        address seller;
        uint256 tokenQuantity;
        address tokenContract;
        uint256 maticAmount;
    }

    mapping(uint256 => orders) public Orders;

    /// @notice Events
    event Log(string _function, address _sender, uint256 _value, bytes _data);
    event Rec(string _function, address _sender, uint256 _value);
    event OrderCreate(
        string _function,
        uint256 _order,
        address _sender,
        uint256 _tokenquantity,
        address _tokencontract,
        uint256 _maticamount,
        uint256 _time
    );
    event RedeemOrder(
        string _function,
        uint256 _order,
        address _sender,
        uint256 _tokenquantity,
        address _tokencontract,
        uint256 _maticamount,
        uint256 _time
    );
    event Cancellisting(
        string _function,
        uint256 _order,
        address _sender,
        uint256 _tokenquantity,
        address _tokencontract,
        uint256 _time
    );

    /// @notice Constructor
    constructor() {
        _owner = msg.sender;
    }

    /// @notice Creating Selling listings
    function createOrder(
        address _tokenContract,
        uint256 _tokenQuantity,
        uint256 _maticAmount
    ) public {
        (bool success, ) = (_tokenContract).call(
            abi.encodeWithSignature(
                "transferFrom(address,address,uint256)",
                msg.sender,
                address(this),
                _tokenQuantity
            )
        );
        require(success);

        Orders[orderNumber.current()] = orders(
            orderNumber.current(),
            msg.sender,
            _tokenQuantity,
            _tokenContract,
            _maticAmount
        );
        orderNumber.increment();
        emit OrderCreate(
            "Selling Listing",
            orderNumber.current(),
            msg.sender,
            _tokenQuantity,
            _tokenContract,
            _maticAmount,
            block.timestamp
        );
    }

    /// @notice Purchase orders of listing
    function redeemOrder(uint256 _orderNumber) public payable {
        if (msg.value == 0) revert incorrectValue();
        if (msg.value > Orders[_orderNumber].maticAmount)
            revert incorrectValue();
        uint256 purchaseQuantity = (msg.value *
            (Orders[_orderNumber].tokenQuantity)) /
            (Orders[_orderNumber].maticAmount);
        Orders[_orderNumber].tokenQuantity -= purchaseQuantity;
        Orders[_orderNumber].maticAmount -= msg.value;

        (bool success, ) = (Orders[_orderNumber].tokenContract).call(
            abi.encodeWithSignature(
                "transfer(address,uint256)",
                msg.sender,
                purchaseQuantity
            )
        );
        require(success);

        payable(Orders[_orderNumber].seller).transfer(msg.value);
        emit RedeemOrder(
            "Purchase",
            _orderNumber,
            msg.sender,
            purchaseQuantity,
            Orders[_orderNumber].tokenContract,
            msg.value,
            block.timestamp
        );
    }

    /// @notice For cancelling Selling Listing
    function cancelOrder(uint256 _orderNumber) public {
        if (msg.sender != Orders[_orderNumber].seller) revert notSeller();
        (bool success, ) = (Orders[_orderNumber].tokenContract).call(
            abi.encodeWithSignature(
                "transfer(address,uint256)",
                msg.sender,
                Orders[_orderNumber].tokenQuantity
            )
        );
        require(success);

        Orders[_orderNumber].tokenQuantity = 0;
        Orders[_orderNumber].maticAmount = 0;
        emit Cancellisting(
            "Cancelling Listing",
            _orderNumber,
            msg.sender,
            Orders[_orderNumber].tokenQuantity,
            Orders[_orderNumber].tokenContract,
            block.timestamp
        );
    }

    fallback() external payable {
        emit Log("fallback message failed", msg.sender, msg.value, msg.data);
    }

    receive() external payable {
        emit Rec("fallback message failed", msg.sender, msg.value);
    }
}
