package com.springboot.app.farmchainai.controller;

import com.springboot.app.farmchainai.dto.BatchRequest;
import com.springboot.app.farmchainai.entity.Batch;
import com.springboot.app.farmchainai.service.BatchService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/batches")
@CrossOrigin(origins = "*")
public class BatchController {

    private final BatchService batchService;

    public BatchController(BatchService batchService) {
        this.batchService = batchService;
    }

    @PostMapping
    public ResponseEntity<Batch> createBatch(@RequestBody BatchRequest request) {
        Batch batch = batchService.createBatch(request);
        return ResponseEntity.ok(batch);
    }

    @GetMapping
    public ResponseEntity<List<Batch>> getAllBatches(
            @RequestParam(required = false) Long farmerId,
            @RequestParam(required = false) Long ownerId) {
        if (farmerId != null) {
            return ResponseEntity.ok(batchService.getBatchesByFarmer(farmerId));
        } else if (ownerId != null) {
            return ResponseEntity.ok(batchService.getBatchesByOwner(ownerId));
        }
        return ResponseEntity.ok(batchService.getAllBatches());
    }

    @GetMapping("/{batchId}")
    public ResponseEntity<Batch> getBatchByBatchId(@PathVariable String batchId) {
        return batchService.getBatchByBatchId(batchId)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{batchId}/transfer")
    public ResponseEntity<Batch> transferOwnership(
            @PathVariable String batchId,
            @RequestBody Map<String, Object> body) {
        Long newOwnerId = Long.parseLong(body.get("newOwnerId").toString());
        String newOwnerName = body.getOrDefault("newOwnerName", "Retailer").toString();
        String status = body.getOrDefault("status", "RECEIVED").toString();

        Batch updated = batchService.updateBatchOwner(batchId, newOwnerId, newOwnerName, status);
        if (updated != null) {
            return ResponseEntity.ok(updated);
        }
        return ResponseEntity.notFound().build();
    }
}
