package com.miu.backend.web.controller;

import com.miu.backend.domain.Product;
import com.miu.backend.service.OrderService;
import com.miu.backend.service.ProductService;
import com.miu.backend.web.dto.ProductDto;
import com.miu.backend.web.util.PageResponse;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/product")
@AllArgsConstructor
@CrossOrigin
public class ProductController {

    private final ProductService productService;

    @GetMapping
    public ResponseEntity<?> getAll(@RequestParam(defaultValue = "0") int page, @RequestParam(defaultValue = "10") int size) {
        Pageable paging = PageRequest.of(page, size);
        Page<Product> query = productService.findAll(paging);

        Map<String, Object> response = PageResponse.getPagedResponse(query);

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @GetMapping("/{productId}")
    public ResponseEntity<?> getSingleProduct (@PathVariable String productId) {
        ProductDto product = productService.getSingleProduct(productId);

        return new ResponseEntity<>(product, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<?> addNew(@Valid @RequestBody ProductDto productDto) {
        ProductDto product = productService.addProduct(productDto);

        return new ResponseEntity<>(product, HttpStatus.CREATED);
    }

    @PutMapping("/{productId}")
    public ResponseEntity<?> updateProduct(@Valid @RequestBody ProductDto productDto, @PathVariable String productId) {
        productService.updateProduct(productId, productDto);
        return new ResponseEntity<>(productDto, HttpStatus.OK);
    }

    @DeleteMapping("/{productId}")
    public ResponseEntity<?> deleteProduct(@PathVariable String productId) {
        productService.deleteProduct(productId);
        return new ResponseEntity<>(HttpStatus.ACCEPTED);
    }

    @GetMapping("/search")
    public ResponseEntity<?> search(@RequestParam String name,
                                    @RequestParam(defaultValue = "0") int page,
                                    @RequestParam(defaultValue = "10") int size) {
        Pageable paging = PageRequest.of(page, size);
        Page<Product> query = productService.searchForItem(paging, name);

        Map<String, Object> response = PageResponse.getPagedResponse(query);

        return new ResponseEntity<>(response, HttpStatus.OK);
    }
}