package com.miu.backend.web.controller;

import com.miu.backend.domain.Review;
import com.miu.backend.service.ReviewService;
import com.miu.backend.web.dto.ReviewDto;
import com.miu.backend.web.util.PageResponse;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/review")
@AllArgsConstructor
@CrossOrigin
public class ReviewController {

    private ReviewService reviewService;

    @GetMapping("/{productId}")
    public ResponseEntity<?> getProductReviews(@PathVariable String productId,
                                               @RequestParam(defaultValue = "0") int page,
                                               @RequestParam(defaultValue = "10") int size) {
        Pageable paging = PageRequest.of(page, size);
        Page<Review> query = reviewService.getAllReviews(paging, productId);

        Map<String, Object> response = PageResponse.getPagedResponse(query);

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @PostMapping("/{productId}")
    public ResponseEntity<?> addProductReviews(@PathVariable String productId, @RequestBody ReviewDto reviewDto) {
        reviewService.addNewReview(productId, reviewDto);
        return new ResponseEntity<>(reviewDto, HttpStatus.CREATED);
    }
}
