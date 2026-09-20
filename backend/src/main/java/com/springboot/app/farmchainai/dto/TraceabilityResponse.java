package com.springboot.app.farmchainai.dto;

import com.springboot.app.farmchainai.entity.Batch;
import com.springboot.app.farmchainai.entity.Transaction;

import java.util.List;

public class TraceabilityResponse {
    private Batch batch;
    private List<Transaction> transactions;
    private List<String> supplyChainJourney;
    private PriceInsightResponse priceInsight;
    private String blockchainStatus;
    private String latestBlockHash;

    public TraceabilityResponse() {}

    public TraceabilityResponse(Batch batch, List<Transaction> transactions, List<String> supplyChainJourney, PriceInsightResponse priceInsight, String blockchainStatus, String latestBlockHash) {
        this.batch = batch;
        this.transactions = transactions;
        this.supplyChainJourney = supplyChainJourney;
        this.priceInsight = priceInsight;
        this.blockchainStatus = blockchainStatus;
        this.latestBlockHash = latestBlockHash;
    }

    public Batch getBatch() { return batch; }
    public void setBatch(Batch batch) { this.batch = batch; }

    public List<Transaction> getTransactions() { return transactions; }
    public void setTransactions(List<Transaction> transactions) { this.transactions = transactions; }

    public List<String> getSupplyChainJourney() { return supplyChainJourney; }
    public void setSupplyChainJourney(List<String> supplyChainJourney) { this.supplyChainJourney = supplyChainJourney; }

    public PriceInsightResponse getPriceInsight() { return priceInsight; }
    public void setPriceInsight(PriceInsightResponse priceInsight) { this.priceInsight = priceInsight; }

    public String getBlockchainStatus() { return blockchainStatus; }
    public void setBlockchainStatus(String blockchainStatus) { this.blockchainStatus = blockchainStatus; }

    public String getLatestBlockHash() { return latestBlockHash; }
    public void setLatestBlockHash(String latestBlockHash) { this.latestBlockHash = latestBlockHash; }
}
