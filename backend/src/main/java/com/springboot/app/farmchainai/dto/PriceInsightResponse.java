package com.springboot.app.farmchainai.dto;

public class PriceInsightResponse {
    private String crop;
    private Double observedPrice;
    private String referenceRange;
    private String status;
    private String insight;
    private String confidenceScore;

    public PriceInsightResponse() {}

    public PriceInsightResponse(String crop, Double observedPrice, String referenceRange, String status, String insight, String confidenceScore) {
        this.crop = crop;
        this.observedPrice = observedPrice;
        this.referenceRange = referenceRange;
        this.status = status;
        this.insight = insight;
        this.confidenceScore = confidenceScore;
    }

    public String getCrop() { return crop; }
    public void setCrop(String crop) { this.crop = crop; }

    public Double getObservedPrice() { return observedPrice; }
    public void setObservedPrice(Double observedPrice) { this.observedPrice = observedPrice; }

    public String getReferenceRange() { return referenceRange; }
    public void setReferenceRange(String referenceRange) { this.referenceRange = referenceRange; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public String getInsight() { return insight; }
    public void setInsight(String insight) { this.insight = insight; }

    public String getConfidenceScore() { return confidenceScore; }
    public void setConfidenceScore(String confidenceScore) { this.confidenceScore = confidenceScore; }
}
