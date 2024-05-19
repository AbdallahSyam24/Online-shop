package com.miu.backend.web.dto;

import com.miu.backend.domain.ProductCartItem;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ShoppingCartDto {

    private String cartId;
    private BigDecimal amount;
    private String userId;
}
