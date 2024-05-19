package com.miu.backend.web.dto;

import com.miu.backend.domain.User;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserDto {

    private String userId;
    @NotNull
    private String type;
    @NotNull
    private String username;
}
