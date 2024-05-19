package com.miu.backend.domain;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.math.BigDecimal;

@Document
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Product {

    @Id
    private String productNumber;
    private String name;
    private String description;
    private BigDecimal price;
    private int stock;
    private String imageUrl;
}
