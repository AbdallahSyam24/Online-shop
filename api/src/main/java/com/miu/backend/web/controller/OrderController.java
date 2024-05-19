package com.miu.backend.web.controller;

import com.miu.backend.domain.Order;
import com.miu.backend.domain.ProductCartItem;
import com.miu.backend.service.OrderService;
import com.miu.backend.web.dto.OrderDto;
import com.miu.backend.web.util.PageResponse;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/order")
@AllArgsConstructor
@CrossOrigin
public class OrderController {

    private OrderService orderService;

    @GetMapping
    public ResponseEntity<?> getAll(@RequestParam(defaultValue = "0") int page, @RequestParam(defaultValue = "10") int size) {
        Pageable paging = PageRequest.of(page, size);
        Page<Order> query = orderService.findAll(paging);

        Map<String, Object> response = PageResponse.getPagedResponse(query);

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @GetMapping("/{orderId}")
    public ResponseEntity<?> getSingleOrder (@PathVariable String orderId) {
        OrderDto order = orderService.getSingleOrder(orderId);

        return new ResponseEntity<>(order, HttpStatus.OK);
    }

    @GetMapping("/{orderId}/product")
    public ResponseEntity<?> getOrderProducts(@PathVariable String orderId) {
        List<ProductCartItem> order = orderService.getProductsInOrder(orderId);

        return new ResponseEntity<>(order, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<?> addNew(@Valid @RequestBody OrderDto orderDto) {
        orderService.addOrder(orderDto);

        return new ResponseEntity<>(orderDto, HttpStatus.CREATED);
    }

    @PutMapping("/{orderId}")
    public ResponseEntity<?> updateOrderStatus (@PathVariable String orderId, @RequestBody Map<String, String> requestBody) {
        String newValue = requestBody.get("newValue");
        OrderDto order =  orderService.updateOrderStatue(orderId, newValue);

        return new ResponseEntity<>(order, HttpStatus.OK);
    }
}


