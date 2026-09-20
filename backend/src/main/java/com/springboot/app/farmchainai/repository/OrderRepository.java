package com.springboot.app.farmchainai.repository;

import com.springboot.app.farmchainai.entity.Order;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface OrderRepository extends JpaRepository<Order, Long> {
    Optional<Order> findByOrderId(String orderId);
    List<Order> findByBatchId(String batchId);
    List<Order> findBySellerId(Long sellerId);
    List<Order> findByBuyerId(Long buyerId);
}
