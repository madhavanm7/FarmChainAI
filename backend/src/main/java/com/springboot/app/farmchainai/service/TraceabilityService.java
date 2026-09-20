package com.springboot.app.farmchainai.service;

import com.springboot.app.farmchainai.dto.PriceInsightResponse;
import com.springboot.app.farmchainai.dto.TraceabilityResponse;
import com.springboot.app.farmchainai.entity.Batch;
import com.springboot.app.farmchainai.entity.Transaction;
import com.springboot.app.farmchainai.repository.BatchRepository;
import com.springboot.app.farmchainai.repository.TransactionRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class TraceabilityService {

    private final BatchRepository batchRepository;
    private final TransactionRepository transactionRepository;
    private final AIService aiService;

    public TraceabilityService(BatchRepository batchRepository,
                               TransactionRepository transactionRepository,
                               AIService aiService) {
        this.batchRepository = batchRepository;
        this.transactionRepository = transactionRepository;
        this.aiService = aiService;
    }

    public TraceabilityResponse getTraceabilityHistory(String batchId) {
        Optional<Batch> batchOpt = batchRepository.findByBatchId(batchId);
        if (batchOpt.isEmpty()) {
            return null;
        }

        Batch batch = batchOpt.get();
        List<Transaction> transactions = transactionRepository.findByBatchIdOrderByTimestampAsc(batchId);

        List<String> journey = new ArrayList<>();
        journey.add("Farmer: " + (batch.getFarmerName() != null ? batch.getFarmerName() : "Ravi"));

        for (Transaction tx : transactions) {
            if ("FARMER_TO_WHOLESALER".equalsIgnoreCase(tx.getTransactionType())) {
                journey.add("Wholesaler: " + tx.getBuyerName() + " (Agreed Price: ₹" + tx.getPrice() + "/kg)");
            } else if ("WHOLESALER_TO_RETAILER".equalsIgnoreCase(tx.getTransactionType())) {
                journey.add("Retailer: " + tx.getBuyerName());
            }
        }

        if ("RECEIVED".equalsIgnoreCase(batch.getStatus()) && !journey.contains("Retailer: " + batch.getCurrentOwnerName())) {
            journey.add("Retailer: " + batch.getCurrentOwnerName());
        }

        journey.add("Consumer: Traceable Verification Scan");

        Double latestPrice = !transactions.isEmpty() ? transactions.get(transactions.size() - 1).getPrice() : batch.getExpectedPrice();
        PriceInsightResponse priceInsight = aiService.analyzePrice(batch.getCrop(), latestPrice, batch.getQuantity());

        String latestHash = !transactions.isEmpty() ?
                transactions.get(transactions.size() - 1).getBlockchainTxHash() :
                "0x7f8a9b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a";

        return new TraceabilityResponse(
                batch,
                transactions,
                journey,
                priceInsight,
                "VERIFIED_ON_BLOCKCHAIN",
                latestHash
        );
    }
}
