package com.springboot.app.farmchainai.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "batches")
public class Batch {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String batchId;

    private String crop;

    private Double quantity;

    private String unit;

    private String harvestDate;

    private String quality;

    private Double expectedPrice;

    private String location;

    private Long farmerId;

    private String farmerName;

    private Long currentOwnerId;

    private String currentOwnerName;

    private String status; // CREATED, LISTED, ORDER_PENDING, CONFIRMED, TRANSFERRED, RECEIVED

    @Column(length = 2000)
    private String qrData;

    private LocalDateTime createdAt = LocalDateTime.now();

    public Batch() {}

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getBatchId() { return batchId; }
    public void setBatchId(String batchId) { this.batchId = batchId; }

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

    public String getFarmerName() { return farmerName; }
    public void setFarmerName(String farmerName) { this.farmerName = farmerName; }

    public Long getCurrentOwnerId() { return currentOwnerId; }
    public void setCurrentOwnerId(Long currentOwnerId) { this.currentOwnerId = currentOwnerId; }

    public String getCurrentOwnerName() { return currentOwnerName; }
    public void setCurrentOwnerName(String currentOwnerName) { this.currentOwnerName = currentOwnerName; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public String getQrData() { return qrData; }
    public void setQrData(String qrData) { this.qrData = qrData; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
}
