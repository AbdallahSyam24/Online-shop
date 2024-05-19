package com.miu.backend.service.adapter;

import com.miu.backend.domain.Review;
import com.miu.backend.web.dto.ReviewDto;

public class ReviewAdapter {

    public static ReviewDto getDto(Review review) {
        return new ReviewDto(
                review.getReviewId(),
                review.getProductNumber(),
                review.getUserId(),
                review.getDescription()
        );
    }

    public static Review getReview(ReviewDto review) {
        return new Review(
                review.getReviewId(),
                review.getProductNumber(),
                review.getUserId(),
                review.getDescription()
        );
    }
}
