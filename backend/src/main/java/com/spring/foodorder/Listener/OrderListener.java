package com.spring.foodorder.Listener;

import com.spring.foodorder.Documents.Order;
import org.springframework.data.mongodb.core.mapping.event.AbstractMongoEventListener;
import org.springframework.data.mongodb.core.mapping.event.BeforeConvertEvent;

public class OrderListener extends AbstractMongoEventListener<Order> {
    @Override
    public void onBeforeConvert(BeforeConvertEvent<Order> event) {
        Order order = event.getSource();
        if (order.getId() != null && order.getOrderId() == null) {
            order.setOrderId(order.getId()
                    .substring(Math.max(0, order.getId().length() - 6))
                    .toUpperCase());
        }
    }
}