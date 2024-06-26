package com.miu.backend.data;

import com.miu.backend.domain.Product;
import com.miu.backend.domain.Review;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface ReviewRepository extends MongoRepository<Review, String> {

    Page<Review> findAllByProductNumber(Pageable paging, String productNumber);

}
