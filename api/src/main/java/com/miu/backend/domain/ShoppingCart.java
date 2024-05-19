package com.miu.backend.domain;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.math.BigDecimal;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Document
public class ShoppingCart {

    @Id
    private String cartId;
    private List<ProductCartItem> items;
    private BigDecimal amount;
    private String userId;
}
