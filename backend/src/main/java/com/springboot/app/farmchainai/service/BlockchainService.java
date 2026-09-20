package com.springboot.app.farmchainai.service;

import org.springframework.stereotype.Service;

import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.time.Instant;
import java.util.ArrayList;
import java.util.List;

@Service
public class BlockchainService {

    public static class Block {
        private final int index;
        private final String timestamp;
        private final String batchId;
        private final String action;
        private final String payload;
        private final String previousHash;
        private final String hash;

        public Block(int index, String timestamp, String batchId, String action, String payload, String previousHash) {
            this.index = index;
            this.timestamp = timestamp;
            this.batchId = batchId;
            this.action = action;
            this.payload = payload;
            this.previousHash = previousHash;
            this.hash = calculateHash();
        }

        public String calculateHash() {
            String input = index + timestamp + batchId + action + payload + previousHash;
            try {
                MessageDigest digest = MessageDigest.getInstance("SHA-256");
                byte[] hashBytes = digest.digest(input.getBytes(StandardCharsets.UTF_8));
                StringBuilder hexString = new StringBuilder("0x");
                for (byte b : hashBytes) {
                    String hex = Integer.toHexString(0xff & b);
                    if (hex.length() == 1) hexString.append('0');
                    hexString.append(hex);
                }
                return hexString.toString();
            } catch (Exception e) {
                return "0x" + Math.abs(input.hashCode());
            }
        }

        public int getIndex() { return index; }
        public String getTimestamp() { return timestamp; }
        public String getBatchId() { return batchId; }
        public String getAction() { return action; }
        public String getPayload() { return payload; }
        public String getPreviousHash() { return previousHash; }
        public String getHash() { return hash; }
    }

    private final List<Block> chain = new ArrayList<>();

    public BlockchainService() {
        // Genesis block
        chain.add(new Block(0, Instant.now().toString(), "GENESIS", "INIT", "FarmChain EVM Ledger Genesis Block", "0x0000000000000000000000000000000000000000000000000000000000000000"));
    }

    public synchronized String recordEvent(String batchId, String action, String payload) {
        String prevHash = chain.get(chain.size() - 1).getHash();
        Block newBlock = new Block(chain.size(), Instant.now().toString(), batchId, action, payload, prevHash);
        chain.add(newBlock);
        return newBlock.getHash();
    }

    public List<Block> getChain() {
        return chain;
    }

    public Block getBlockByHash(String hash) {
        return chain.stream().filter(b -> b.getHash().equalsIgnoreCase(hash)).findFirst().orElse(null);
    }
}
