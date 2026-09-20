package com.springboot.app.farmchainai.controller;

import com.springboot.app.farmchainai.dto.PriceInsightResponse;
import com.springboot.app.farmchainai.service.AIService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/ai")
@CrossOrigin(origins = "*")
public class AIController {

    private final AIService aiService;

    public AIController(AIService aiService) {
        this.aiService = aiService;
    }

    @PostMapping("/price-insight")
    public ResponseEntity<PriceInsightResponse> getPriceInsight(@RequestBody Map<String, Object> body) {
        String crop = body.getOrDefault("crop", "Tomato").toString();
        Double price = Double.parseDouble(body.getOrDefault("price", "28.0").toString());
        Double quantity = Double.parseDouble(body.getOrDefault("quantity", "500.0").toString());

        PriceInsightResponse response = aiService.analyzePrice(crop, price, quantity);
        return ResponseEntity.ok(response);
    }
}
