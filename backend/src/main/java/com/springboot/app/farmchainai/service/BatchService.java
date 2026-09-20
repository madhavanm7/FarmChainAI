package com.springboot.app.farmchainai.service;

import com.springboot.app.farmchainai.dto.BatchRequest;
import com.springboot.app.farmchainai.entity.Batch;
import com.springboot.app.farmchainai.entity.User;
import com.springboot.app.farmchainai.repository.BatchRepository;
import com.springboot.app.farmchainai.repository.UserRepository;
import jakarta.annotation.PostConstruct;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class BatchService {

    private final BatchRepository batchRepository;
    private final UserRepository userRepository;
    private final QRCodeService qrCodeService;
    private final BlockchainService blockchainService;

    public BatchService(BatchRepository batchRepository,
                        UserRepository userRepository,
                        QRCodeService qrCodeService,
                        BlockchainService blockchainService) {
        this.batchRepository = batchRepository;
        this.userRepository = userRepository;
        this.qrCodeService = qrCodeService;
        this.blockchainService = blockchainService;
    }

    @PostConstruct
    public void initSeedBatch() {
        if (batchRepository.count() == 0) {
            Optional<User> farmerOpt = userRepository.findByUserCode("FR001");
            Long farmerId = farmerOpt.map(User::getId).orElse(1L);
            String farmerName = farmerOpt.map(User::getName).orElse("Ravi");

            Batch seedBatch = new Batch();
            seedBatch.setBatchId("TOM-2026-001");
            seedBatch.setCrop("Tomato");
            seedBatch.setQuantity(500.0);
            seedBatch.setUnit("KG");
            seedBatch.setHarvestDate("20-09-2026");
            seedBatch.setQuality("Grade A");
            seedBatch.setExpectedPrice(30.0);
            seedBatch.setLocation("Trichy, Tamil Nadu");
            seedBatch.setFarmerId(farmerId);
            seedBatch.setFarmerName(farmerName);
            seedBatch.setCurrentOwnerId(farmerId);
            seedBatch.setCurrentOwnerName(farmerName);
            seedBatch.setStatus("LISTED");
            seedBatch.setQrData(qrCodeService.generateQRCodeBase64("/trace/TOM-2026-001", 250, 250));

            batchRepository.save(seedBatch);

            blockchainService.recordEvent(
                    "TOM-2026-001",
                    "BATCH_CREATION",
                    "Crop: Tomato, Quantity: 500 KG, Quality: Grade A, Expected Price: ₹30/kg, Farmer: Ravi (FR001), Location: Trichy"
            );
        }
    }

    public Batch createBatch(BatchRequest request) {
        Long count = batchRepository.count() + 1;
        String cropCode = request.getCrop() != null ? request.getCrop().substring(0, Math.min(3, request.getCrop().length())).toUpperCase() : "TOM";
        String batchId = String.format("%s-2026-%03d", cropCode, count);

        User farmer = userRepository.findById(request.getFarmerId()).orElse(null);
        String farmerName = farmer != null ? farmer.getName() : "Farmer";

        Batch batch = new Batch();
        batch.setBatchId(batchId);
        batch.setCrop(request.getCrop());
        batch.setQuantity(request.getQuantity());
        batch.setUnit(request.getUnit() != null ? request.getUnit() : "KG");
        batch.setHarvestDate(request.getHarvestDate() != null ? request.getHarvestDate() : "20-09-2026");
        batch.setQuality(request.getQuality() != null ? request.getQuality() : "Grade A");
        batch.setExpectedPrice(request.getExpectedPrice());
        batch.setLocation(request.getLocation() != null ? request.getLocation() : "Trichy, Tamil Nadu");
        batch.setFarmerId(request.getFarmerId());
        batch.setFarmerName(farmerName);
        batch.setCurrentOwnerId(request.getFarmerId());
        batch.setCurrentOwnerName(farmerName);
        batch.setStatus("LISTED");
        batch.setQrData(qrCodeService.generateQRCodeBase64("/trace/" + batchId, 250, 250));

        Batch saved = batchRepository.save(batch);

        blockchainService.recordEvent(
                batchId,
                "BATCH_CREATION",
                String.format("Crop: %s, Quantity: %.1f %s, Quality: %s, Expected Price: ₹%.1f/kg, Farmer: %s, Location: %s",
                        batch.getCrop(), batch.getQuantity(), batch.getUnit(), batch.getQuality(), batch.getExpectedPrice(), farmerName, batch.getLocation())
        );

        return saved;
    }

    public List<Batch> getAllBatches() {
        return batchRepository.findAll();
    }

    public Optional<Batch> getBatchByBatchId(String batchId) {
        return batchRepository.findByBatchId(batchId);
    }

    public List<Batch> getBatchesByFarmer(Long farmerId) {
        return batchRepository.findByFarmerId(farmerId);
    }

    public List<Batch> getBatchesByOwner(Long ownerId) {
        return batchRepository.findByCurrentOwnerId(ownerId);
    }

    public Batch updateBatchOwner(String batchId, Long newOwnerId, String newOwnerName, String newStatus) {
        Optional<Batch> batchOpt = batchRepository.findByBatchId(batchId);
        if (batchOpt.isPresent()) {
            Batch batch = batchOpt.get();
            batch.setCurrentOwnerId(newOwnerId);
            batch.setCurrentOwnerName(newOwnerName);
            if (newStatus != null) {
                batch.setStatus(newStatus);
            }
            Batch updated = batchRepository.save(batch);

            blockchainService.recordEvent(
                    batchId,
                    "OWNERSHIP_TRANSFER",
                    String.format("Ownership transferred to %s (ID: %d), Status: %s", newOwnerName, newOwnerId, batch.getStatus())
            );
            return updated;
        }
        return null;
    }
}
