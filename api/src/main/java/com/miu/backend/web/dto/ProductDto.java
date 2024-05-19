package com.miu.backend.web.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProductDto {

    private String productNumber;
    @NotNull
    private String name;
    @NotNull
    private String description;
    private BigDecimal price;
    private int stock;
    private String imageUrl;
}
