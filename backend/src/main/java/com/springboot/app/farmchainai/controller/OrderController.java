package com.springboot.app.farmchainai.controller;

import com.springboot.app.farmchainai.dto.OrderRequest;
import com.springboot.app.farmchainai.entity.Order;
import com.springboot.app.farmchainai.service.OrderService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/orders")
@CrossOrigin(origins = "*")
public class OrderController {

    private final OrderService orderService;

    public OrderController(OrderService orderService) {
        this.orderService = orderService;
    }

    @PostMapping
    public ResponseEntity<Order> createOrder(@RequestBody OrderRequest request) {
        Order order = orderService.createOrder(request);
        return ResponseEntity.ok(order);
    }

    @GetMapping
    public ResponseEntity<List<Order>> getAllOrders(@RequestParam(required = false) String batchId) {
        if (batchId != null && !batchId.isEmpty()) {
            return ResponseEntity.ok(orderService.getOrdersByBatchId(batchId));
        }
        return ResponseEntity.ok(orderService.getAllOrders());
    }

    @GetMapping("/{orderId}")
    public ResponseEntity<Order> getOrderByOrderId(@PathVariable String orderId) {
        return orderService.getOrderByOrderId(orderId)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{orderId}/confirm")
    public ResponseEntity<Order> confirmOrder(@PathVariable String orderId) {
        Order confirmed = orderService.confirmOrder(orderId);
        if (confirmed != null) {
            return ResponseEntity.ok(confirmed);
        }
        return ResponseEntity.notFound().build();
    }
}
