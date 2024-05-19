package com.miu.backend.web.util;

import org.springframework.data.domain.Page;

import java.util.HashMap;
import java.util.Map;

public class PageResponse {

    public static Map<String, Object> getPagedResponse(Page<?> query) {
        Map<String, Object> response = new HashMap<>();
        response.put("items", query.getContent());
        response.put("currentPage", query.getNumber());
        response.put("totalItems", query.getTotalElements());
        response.put("totalPages", query.getTotalPages());

        return response;
    }
}
