package com.spring.foodorder.Controllers;

import com.spring.foodorder.DTOs.General.ChangeStatusOrderRequest;
import com.spring.foodorder.DTOs.General.OrderRequest;
import com.spring.foodorder.Exceptions.ResourceNotFoundException;
import com.spring.foodorder.Services.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/orders")
public class OrderController {
    @Autowired
    private OrderService orderService;

    @PostMapping("/place")
    public ResponseEntity<?> placeOrder(@RequestBody OrderRequest orderRequest) {
        try {
            orderService.placeOrder(orderRequest);
            return ResponseEntity.ok("Order placed successfully");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("An error occurred while placing the order: " + e.getMessage());
        }
    }

    @GetMapping("/history")
    public ResponseEntity<?> getOrderHistory() {
        try {
            return ResponseEntity.ok(orderService.getHistoryOrders());
        } catch (ResourceNotFoundException e) {
          return ResponseEntity.status(404).body("User not found: " + e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(500).body("An error occurred while fetching order history: " + e.getMessage());
        }
    }

    @PutMapping("/change-status")
    public ResponseEntity<?> changeOrderStatus(@RequestBody ChangeStatusOrderRequest request) {
        try {
            orderService.changeStatus(request);
            return ResponseEntity.ok("Order status updated successfully");
        } catch (ResourceNotFoundException e) {
            return ResponseEntity.status(404).body("Order not found: " + e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(500).body("An error occurred while updating order status: " + e.getMessage());
        }
    }

}
