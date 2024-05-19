package com.miu.backend.domain;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDate;
import java.util.List;

//for personal information (name, email, phone, street, city, zip). The second page asks
//for payment information (creditcard type, number, date valid, validation code)
@Document
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Order {

    @Id
    private String orderId;
    private String name;
    private String email;
    private String phone;
    private String street;
    private String city;
    private String zip;
    private CreditCard creditCardType;
    private String ccNumber;
    private LocalDate dateValid;
    private int ccv;
    private OrderStatus status;
    private List<ProductCartItem> items;

    public enum CreditCard {
        MASTER_CARD, VISA;

        public static CreditCard fromString(String str) {
            return switch (str.toLowerCase().trim()) {
                case "visa" -> VISA;
                default -> MASTER_CARD;
            };
        }
    }

    public enum OrderStatus {
        PLACED, SHIPPED, DELIVIRED;

        public static OrderStatus fromString(String str) {
            if(str == null) return PLACED;

            return switch (str.toLowerCase().trim()) {
                case "shipped" -> SHIPPED;
                case "delivered" -> DELIVIRED;
                default -> PLACED;
            };
        }
    }
}
