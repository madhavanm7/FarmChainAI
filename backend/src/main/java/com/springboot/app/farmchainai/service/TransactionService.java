package com.springboot.app.farmchainai.service;

import com.springboot.app.farmchainai.entity.Transaction;
import com.springboot.app.farmchainai.repository.TransactionRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TransactionService {

    private final TransactionRepository transactionRepository;
    private final BlockchainService blockchainService;

    public TransactionService(TransactionRepository transactionRepository,
                               BlockchainService blockchainService) {
        this.transactionRepository = transactionRepository;
        this.blockchainService = blockchainService;
    }

    public Transaction createTransaction(String batchId, String orderId, Long sellerId, String sellerName,
                                          Long buyerId, String buyerName, Double price, Double quantity,
                                          String transactionType) {
        Long count = transactionRepository.count() + 1;
        String txId = String.format("TXN-%03d", count);

        String payload = String.format("TxID: %s, BatchID: %s, OrderID: %s, Seller: %s, Buyer: %s, Agreed Price: ₹%.1f/kg, Quantity: %.1f KG, Type: %s",
                txId, batchId, orderId, sellerName, buyerName, price, quantity, transactionType);

        String txHash = blockchainService.recordEvent(batchId, "TRANSACTION_CONFIRMED", payload);

        Transaction tx = new Transaction();
        tx.setTransactionId(txId);
        tx.setBatchId(batchId);
        tx.setOrderId(orderId);
        tx.setSellerId(sellerId);
        tx.setSellerName(sellerName);
        tx.setBuyerId(buyerId);
        tx.setBuyerName(buyerName);
        tx.setPrice(price);
        tx.setQuantity(quantity);
        tx.setTransactionType(transactionType);
        tx.setBlockchainTxHash(txHash);

        return transactionRepository.save(tx);
    }

    public List<Transaction> getTransactionsByBatchId(String batchId) {
        return transactionRepository.findByBatchIdOrderByTimestampAsc(batchId);
    }

    public List<Transaction> getAllTransactions() {
        return transactionRepository.findAll();
    }
}
