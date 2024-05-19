package com.miu.backend;

import com.miu.backend.data.*;
import com.miu.backend.domain.*;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.Arrays;
import java.util.List;
import java.util.Random;
import java.util.UUID;

//@Component
public class SeedDataCommandLineRunner implements CommandLineRunner {

    private final OrderRepository orderRepository;
    private final ProductRepository productRepository;
    private final ReviewRepository reviewRepository;
    private final ShoppingCartRepository shoppingCartRepository;
    private final UserRepository userRepository;

    public SeedDataCommandLineRunner(OrderRepository orderRepository, ProductRepository productRepository,
                                     ReviewRepository reviewRepository, ShoppingCartRepository shoppingCartRepository,
                                     UserRepository userRepository) {
        this.orderRepository = orderRepository;
        this.productRepository = productRepository;
        this.reviewRepository = reviewRepository;
        this.shoppingCartRepository = shoppingCartRepository;
        this.userRepository = userRepository;
    }

    @Override
    public void run(String... args) {
        seedOrders();
        seedProducts();
        seedReviews();
        seedShoppingCarts();
        seedUsers();
    }

    private void seedOrders() {
        Order order = new Order();
        order.setOrderId(UUID.randomUUID().toString());
        order.setName("John Doe");
        order.setEmail("john.doe@example.com");
        order.setPhone("123-456-7890");
        order.setStreet("123 Main St");
        order.setCity("Cityville");
        order.setZip("12345");
        order.setCreditCardType(Order.CreditCard.VISA);
        order.setCcNumber(generateRandomCreditCardNumber());
        order.setDateValid(LocalDate.now().plusMonths(12));
        order.setCcv(123);
        order.setStatus(Order.OrderStatus.PLACED);
        orderRepository.save(order);
    }

    private String generateRandomCreditCardNumber() {
        // This is a simplified example. In a real application, use a proper credit card number generator.
        Random random = new Random();
        return String.format("%04d%04d%04d%04d",
                random.nextInt(10000),
                random.nextInt(10000),
                random.nextInt(10000),
                random.nextInt(10000));
    }

    private void seedProducts() {
        Product product = new Product();
        product.setProductNumber("655c53d925d8cb3d1a610f26");
        product.setName("Product 1");
        product.setDescription("This is a sample product.");
        product.setPrice(new BigDecimal("19.99"));
        product.setStock(100);
        productRepository.save(product);
    }

    private void seedReviews() {
        Review review = new Review();
        review.setReviewId(UUID.randomUUID().toString());
        review.setProductNumber(UUID.randomUUID().toString());
        review.setUserId(UUID.randomUUID().toString());
        review.setDescription("Great product!");
        reviewRepository.save(review);
    }

    private void seedShoppingCarts() {
        ProductCartItem productCartItem = new ProductCartItem();
        productCartItem.setId(UUID.randomUUID().toString());
        productCartItem.setQuantity(2);

        ShoppingCart shoppingCart = new ShoppingCart();
        shoppingCart.setCartId(UUID.randomUUID().toString());
        shoppingCart.setItems(Arrays.asList(productCartItem));
        shoppingCart.setAmount(new BigDecimal("39.98"));
        shoppingCart.setUserId(UUID.randomUUID().toString());
        shoppingCartRepository.save(shoppingCart);
    }

    private void seedUsers() {
        User user = new User();
        user.setUserId(UUID.randomUUID().toString());
        user.setType(User.UserType.CUSTOMER);
        user.setUsername("customer1");
        userRepository.save(user);
    }
}
