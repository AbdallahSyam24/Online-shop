package com.miu.backend.service;

import com.miu.backend.data.OrderRepository;
import com.miu.backend.data.ProductRepository;
import com.miu.backend.domain.Order;
import com.miu.backend.domain.Product;
import com.miu.backend.domain.ProductCartItem;
import com.miu.backend.domain.ShoppingCart;
import com.miu.backend.service.adapter.OrderAdapter;
import com.miu.backend.service.adapter.ProductAdapter;
import com.miu.backend.web.dto.OrderDto;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class OrderService {

    private OrderRepository orderRepository;
    private ProductService productService;

    public Page<Order> findAll(Pageable paging) {
        return orderRepository.findAll(paging);
    }

    public OrderDto getSingleOrder(String orderId) {
        Order order = orderRepository.findById(orderId).orElseThrow(() -> new RuntimeException("Order not found"));
        return OrderAdapter.getDto(order);
    }

    public void addOrder(OrderDto orderDto) {
        Order order = OrderAdapter.getOrder(orderDto);
        List<ProductCartItem> items = order.getItems();
        items.forEach(item -> {productService.updateStock(item.getId(), item.getQuantity());});

        orderRepository.save(order);
    }

    public OrderDto updateOrderStatue(String orderId, String newValue) {
        Order order = orderRepository.findById(orderId).orElseThrow(() -> new RuntimeException("Order not found"));
        order.setStatus(Order.OrderStatus.fromString(newValue));
        orderRepository.save(order);
        return OrderAdapter.getDto(order);
    }

    public List<ProductCartItem> getProductsInOrder(String orderId) {
        Order order = orderRepository.findById(orderId).orElseThrow(() -> new RuntimeException("Order not found"));
        return order.getItems();
    }
}
