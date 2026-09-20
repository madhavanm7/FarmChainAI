// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/**
 * @title FarmChain
 * @dev Smart contract for logging critical agricultural batch events and ownership transfers on EVM.
 */
contract FarmChain {
    
    struct BatchEvent {
        string batchId;
        string eventType; // CREATION, TRANSACTION, TRANSFER
        address actor;
        uint256 price; // Price per unit in currency sub-units or integer rupees
        uint256 quantity;
        uint256 timestamp;
        string metadata;
    }

    // Mapping from batchId to list of historical events
    mapping(string => BatchEvent[]) private batchHistory;
    
    // Mapping from batchId to current owner address
    mapping(string => address) public currentOwner;

    // Events emitted for Web3j / indexer listeners
    event BatchRegistered(string indexed batchId, address indexed farmer, uint256 quantity, uint256 timestamp);
    event TransactionRecorded(string indexed batchId, address indexed seller, address indexed buyer, uint256 price, uint256 timestamp);
    event OwnershipTransferred(string indexed batchId, address indexed previousOwner, address indexed newOwner, uint256 timestamp);

    /**
     * @dev Register a new produce batch on-chain
     */
    function registerBatch(string memory _batchId, uint256 _quantity, uint256 _expectedPrice, string memory _metadata) public {
        batchHistory[_batchId].push(BatchEvent({
            batchId: _batchId,
            eventType: "CREATION",
            actor: msg.sender,
            price: _expectedPrice,
            quantity: _quantity,
            timestamp: block.timestamp,
            metadata: _metadata
        }));

        currentOwner[_batchId] = msg.sender;
        emit BatchRegistered(_batchId, msg.sender, _quantity, block.timestamp);
    }

    /**
     * @dev Record confirmed transaction & transfer ownership
     */
    function recordTransaction(
        string memory _batchId,
        address _buyer,
        uint256 _agreedPrice,
        uint256 _quantity,
        string memory _metadata
    ) public {
        address seller = msg.sender;
        
        batchHistory[_batchId].push(BatchEvent({
            batchId: _batchId,
            eventType: "TRANSACTION",
            actor: seller,
            price: _agreedPrice,
            quantity: _quantity,
            timestamp: block.timestamp,
            metadata: _metadata
        }));

        address previousOwner = currentOwner[_batchId];
        currentOwner[_batchId] = _buyer;

        emit TransactionRecorded(_batchId, seller, _buyer, _agreedPrice, block.timestamp);
        emit OwnershipTransferred(_batchId, previousOwner, _buyer, block.timestamp);
    }

    /**
     * @dev Retrieve full audit history of a batch
     */
    function getBatchHistory(string memory _batchId) public view returns (BatchEvent[] memory) {
        return batchHistory[_batchId];
    }
}
