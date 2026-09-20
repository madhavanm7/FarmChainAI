package com.springboot.app.farmchainai.repository;

import com.springboot.app.farmchainai.entity.Batch;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface BatchRepository extends JpaRepository<Batch, Long> {
    Optional<Batch> findByBatchId(String batchId);
    List<Batch> findByFarmerId(Long farmerId);
    List<Batch> findByCurrentOwnerId(Long currentOwnerId);
    List<Batch> findByStatus(String status);
}
