package com.springboot.app.farmchainai.dto;

public class BatchRequest {
    private String crop;
    private Double quantity;
    private String unit;
    private String harvestDate;
    private String quality;
    private Double expectedPrice;
    private String location;
    private Long farmerId;

    public BatchRequest() {}

    public String getCrop() { return crop; }
    public void setCrop(String crop) { this.crop = crop; }

    public Double getQuantity() { return quantity; }
    public void setQuantity(Double quantity) { this.quantity = quantity; }

    public String getUnit() { return unit; }
    public void setUnit(String unit) { this.unit = unit; }

    public String getHarvestDate() { return harvestDate; }
    public void setHarvestDate(String harvestDate) { this.harvestDate = harvestDate; }

    public String getQuality() { return quality; }
    public void setQuality(String quality) { this.quality = quality; }

    public Double getExpectedPrice() { return expectedPrice; }
    public void setExpectedPrice(Double expectedPrice) { this.expectedPrice = expectedPrice; }

    public String getLocation() { return location; }
    public void setLocation(String location) { this.location = location; }

    public Long getFarmerId() { return farmerId; }
    public void setFarmerId(Long farmerId) { this.farmerId = farmerId; }
}
