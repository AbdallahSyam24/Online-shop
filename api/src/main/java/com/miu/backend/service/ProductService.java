package com.miu.backend.service;

import com.miu.backend.data.ProductRepository;
import com.miu.backend.domain.Product;
import com.miu.backend.service.adapter.ProductAdapter;
import com.miu.backend.web.dto.ProductDto;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class ProductService {

    private final ProductRepository productRepository;

    public Page<Product> findAll(Pageable paging) {
        return productRepository.findAll(paging);
    }


    public ProductDto addProduct(ProductDto productDto) {
        Product product = ProductAdapter.getProduct(productDto);
        return ProductAdapter.getDto(productRepository.save(product));
    }

    public void updateProduct(String productId, ProductDto productDto) {
        productRepository.findById(productId).orElseThrow(() -> new RuntimeException("Product not Found"));
        Product originalProduct = ProductAdapter.getProduct(productDto);
        productRepository.save(originalProduct);
    }

    public void deleteProduct(String productId) {
        productRepository.findById(productId).orElseThrow(() -> new RuntimeException("Product not Found"));
        productRepository.deleteById(productId);
    }

    public Page<Product> searchForItem(Pageable paging, String searchQuery) {
        return productRepository.findAllByName(paging, searchQuery);
    }

    public ProductDto getSingleProduct(String productId) {
        Product product = productRepository.findById(productId).orElseThrow(() -> new RuntimeException("Product not Found"));
        return ProductAdapter.getDto(product);
    }

    public void updateStock(String productId, int quantity) {
        Product product = productRepository.findById(productId).orElseThrow(() -> new RuntimeException("Product not Found"));
        if (product.getStock() - quantity < 0) throw new RuntimeException("Product not in stock");
        product.setStock(product.getStock() - quantity);
        productRepository.save(product);
    }
}
