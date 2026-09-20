package com.springboot.app.farmchainai.service;

import com.springboot.app.farmchainai.dto.PriceInsightResponse;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
public class AIService {

    private final Map<String, PriceRange> priceDatabase = new HashMap<>();

    public static class PriceRange {
        double minPrice;
        double maxPrice;
        String unit;

        public PriceRange(double minPrice, double maxPrice, String unit) {
            this.minPrice = minPrice;
            this.maxPrice = maxPrice;
            this.unit = unit;
        }
    }

    public AIService() {
        priceDatabase.put("TOMATO", new PriceRange(27.0, 31.0, "₹/kg"));
        priceDatabase.put("POTATO", new PriceRange(18.0, 24.0, "₹/kg"));
        priceDatabase.put("ONION", new PriceRange(25.0, 32.0, "₹/kg"));
        priceDatabase.put("RICE", new PriceRange(45.0, 55.0, "₹/kg"));
    }

    public PriceInsightResponse analyzePrice(String cropName, Double price, Double quantity) {
        String key = cropName != null ? cropName.trim().toUpperCase() : "TOMATO";
        PriceRange range = priceDatabase.getOrDefault(key, new PriceRange(25.0, 35.0, "₹/kg"));

        double actualPrice = price != null ? price : 28.0;
        String rangeStr = String.format("₹%.0f - ₹%.0f / %s", range.minPrice, range.maxPrice, range.unit.replace("₹/", ""));

        if (actualPrice >= range.minPrice && actualPrice <= range.maxPrice) {
            return new PriceInsightResponse(
                    cropName,
                    actualPrice,
                    rangeStr,
                    "NORMAL",
                    "Current transaction price (₹" + actualPrice + ") is within the observed market range (" + rangeStr + ").",
                    "96.8%"
            );
        } else if (actualPrice < range.minPrice * 0.7) {
            return new PriceInsightResponse(
                    cropName,
                    actualPrice,
                    rangeStr,
                    "ANOMALY",
                    "Unusual transaction price! Significant deviation below observed market range (" + rangeStr + "). High fraud/distress risk.",
                    "98.2%"
            );
        } else if (actualPrice < range.minPrice) {
            return new PriceInsightResponse(
                    cropName,
                    actualPrice,
                    rangeStr,
                    "LOW",
                    "Price (₹" + actualPrice + ") is slightly below market average (" + rangeStr + ").",
                    "91.5%"
            );
        } else {
            return new PriceInsightResponse(
                    cropName,
                    actualPrice,
                    rangeStr,
                    "HIGH",
                    "Price (₹" + actualPrice + ") is above standard market reference range (" + rangeStr + "). Premium quality batch.",
                    "93.1%"
            );
        }
    }
}
