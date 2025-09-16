package com.spring.foodorder.Services;

import com.spring.foodorder.DTOs.General.OrderRequest;
import com.spring.foodorder.DTOs.General.OrderResponse;
import com.spring.foodorder.DTOs.General.ChangeStatusOrderRequest;
import com.spring.foodorder.Documents.Order;
import com.spring.foodorder.Enums.OrderStatus;
import com.spring.foodorder.Exceptions.ResourceNotFoundException;
import com.spring.foodorder.Repositories.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OrderService {
    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private UserService userService;

    public static OrderResponse fromOrder(Order order) {
        OrderResponse response = new OrderResponse();
        response.setOrderId(order.getId());
        response.setUserId(order.getUserId());
        response.setItems(order.getItems());
        response.setTotalPrice(order.getTotalPrice());
        response.setStatus(order.getStatus().name());
        response.setCreatedAt(order.getCreatedAt());
        response.setDoneAt(order.getDoneAt());
        return response;
    }

    public void changeStatus(ChangeStatusOrderRequest request) {
        Order order = orderRepository.findById(request.getOrderId())
                .orElseThrow(() -> new ResourceNotFoundException("Order not found"));
        order.setStatus(request.getStatus());

        if (request.getStatus() == OrderStatus.DONE || request.getStatus() == OrderStatus.CANCELLED) {
            order.setDoneAt(java.time.LocalDate.now());
        }
        orderRepository.save(order);
    }

    public void placeOrder(OrderRequest order) {
        Order newOrder = new Order();
        newOrder.setUserId(order.getUserId());
        newOrder.setItems(order.getItems());
        newOrder.setStatus(OrderStatus.PREPARING);
        double totalPrice = order.getItems().stream()
                .mapToDouble(item -> item.getPrice() * item.getQuantity())
                .sum();
        newOrder.setTotalPrice(totalPrice);
        orderRepository.save(newOrder);
    }
}
