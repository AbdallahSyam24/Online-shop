package com.miu.backend.web.dto;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ReviewDto {

    private String reviewId;
    @NotNull
    private String productNumber;
    private String userId;
    @NotNull
    @NotEmpty
    private String description;
}
