package com.miu.backend.domain;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Document
public class User {

    @Id
    private String userId;
    private UserType type;
    private String username;

    public enum UserType {
        EMPLOYEE, CUSTOMER;
    }
}
