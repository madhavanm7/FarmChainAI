package com.springboot.app.farmchainai.controller;

import com.springboot.app.farmchainai.dto.TraceabilityResponse;
import com.springboot.app.farmchainai.service.TraceabilityService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/batches")
@CrossOrigin(origins = "*")
public class TraceabilityController {

    private final TraceabilityService traceabilityService;

    public TraceabilityController(TraceabilityService traceabilityService) {
        this.traceabilityService = traceabilityService;
    }

    @GetMapping("/{batchId}/history")
    public ResponseEntity<TraceabilityResponse> getTraceabilityHistory(@PathVariable String batchId) {
        TraceabilityResponse response = traceabilityService.getTraceabilityHistory(batchId);
        if (response != null) {
            return ResponseEntity.ok(response);
        }
        return ResponseEntity.notFound().build();
    }
}
