package com.springboot.app.farmchainai.service;

import com.springboot.app.farmchainai.dto.OrderRequest;
import com.springboot.app.farmchainai.entity.Batch;
import com.springboot.app.farmchainai.entity.Order;
import com.springboot.app.farmchainai.entity.Transaction;
import com.springboot.app.farmchainai.entity.User;
import com.springboot.app.farmchainai.repository.BatchRepository;
import com.springboot.app.farmchainai.repository.OrderRepository;
import com.springboot.app.farmchainai.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class OrderService {

    private final OrderRepository orderRepository;
    private final BatchRepository batchRepository;
    private final UserRepository userRepository;
    private final TransactionService transactionService;

    public OrderService(OrderRepository orderRepository,
                        BatchRepository batchRepository,
                        UserRepository userRepository,
                        TransactionService transactionService) {
        this.orderRepository = orderRepository;
        this.batchRepository = batchRepository;
        this.userRepository = userRepository;
        this.transactionService = transactionService;
    }

    public Order createOrder(OrderRequest request) {
        Batch batch = batchRepository.findByBatchId(request.getBatchId()).orElse(null);
        if (batch == null) return null;

        User buyer = userRepository.findById(request.getBuyerId()).orElse(null);
        String buyerName = buyer != null ? buyer.getName() : "Wholesaler";

        Long count = orderRepository.count() + 1;
        String orderId = String.format("ORD-%03d", count);

        Order order = new Order();
        order.setOrderId(orderId);
        order.setBatchId(request.getBatchId());
        order.setSellerId(batch.getFarmerId());
        order.setSellerName(batch.getFarmerName());
        order.setBuyerId(request.getBuyerId());
        order.setBuyerName(buyerName);
        order.setQuantity(request.getQuantity() != null ? request.getQuantity() : batch.getQuantity());
        order.setOfferedPrice(request.getOfferedPrice());
        order.setAgreedPrice(request.getOfferedPrice()); // Default to offered price, updated upon confirmation
        order.setStatus("PENDING");

        // Update batch status to ORDER_PENDING
        batch.setStatus("ORDER_PENDING");
        batchRepository.save(batch);

        return orderRepository.save(order);
    }

    public Order confirmOrder(String orderId) {
        Optional<Order> orderOpt = orderRepository.findByOrderId(orderId);
        if (orderOpt.isPresent()) {
            Order order = orderOpt.get();
            order.setStatus("CONFIRMED");

            Order savedOrder = orderRepository.save(order);

            // Trigger Transaction creation & Blockchain block record
            Transaction tx = transactionService.createTransaction(
                    savedOrder.getBatchId(),
                    savedOrder.getOrderId(),
                    savedOrder.getSellerId(),
                    savedOrder.getSellerName(),
                    savedOrder.getBuyerId(),
                    savedOrder.getBuyerName(),
                    savedOrder.getAgreedPrice(),
                    savedOrder.getQuantity(),
                    "FARMER_TO_WHOLESALER"
            );

            // Update batch owner to buyer
            Optional<Batch> batchOpt = batchRepository.findByBatchId(savedOrder.getBatchId());
            if (batchOpt.isPresent()) {
                Batch batch = batchOpt.get();
                batch.setCurrentOwnerId(savedOrder.getBuyerId());
                batch.setCurrentOwnerName(savedOrder.getBuyerName());
                batch.setStatus("SOLD");
                batchRepository.save(batch);
            }

            return savedOrder;
        }
        return null;
    }

    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }

    public Optional<Order> getOrderByOrderId(String orderId) {
        return orderRepository.findByOrderId(orderId);
    }

    public List<Order> getOrdersByBatchId(String batchId) {
        return orderRepository.findByBatchId(batchId);
    }
}
