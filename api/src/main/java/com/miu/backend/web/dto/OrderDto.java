package com.miu.backend.web.dto;

import com.miu.backend.domain.ProductCartItem;
import jakarta.validation.constraints.Digits;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.validator.constraints.CreditCardNumber;

import java.time.LocalDate;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class OrderDto {

    private String orderId;
    @Size(min = 2)
    private String name;
    @Email
    private String email;
    @Size(min = 7)
    private String phone;
    @Size(min = 2)
    private String street;
    @Size(min = 2)
    private String city;
    @Digits(integer = 5, fraction = 0)
    private String zip;
    @NotEmpty
    private String creditCardType;
    @CreditCardNumber
    private String ccNumber;
    private LocalDate dateValid;
    private int ccv;
    private String status;
    private List<ProductCartItem> items;
}
