package com.miu.backend.service;

import com.miu.backend.data.ReviewRepository;
import com.miu.backend.domain.Product;
import com.miu.backend.domain.Review;
import com.miu.backend.service.adapter.ReviewAdapter;
import com.miu.backend.web.dto.ReviewDto;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class ReviewService {

    private ReviewRepository reviewRepository;
    private ProductService productService;

    public Page<Review> getAllReviews(Pageable paging, String productId) {
        productService.getSingleProduct(productId);

        return reviewRepository.findAllByProductNumber(paging, productId);
    }

    public void addNewReview(String productId, ReviewDto reviewDto) {
        productService.getSingleProduct(productId);
        Review review = ReviewAdapter.getReview(reviewDto);

        reviewRepository.save(review);
    }
}
