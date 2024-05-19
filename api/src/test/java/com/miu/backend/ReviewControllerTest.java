package com.miu.backend;

import com.miu.backend.data.ReviewRepository;
import com.miu.backend.service.ProductService;
import com.miu.backend.web.dto.ReviewDto;
import io.restassured.RestAssured;
import io.restassured.http.ContentType;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;

import static io.restassured.RestAssured.given;
import static io.restassured.RestAssured.port;
import static org.hamcrest.Matchers.*;

@SpringBootTest
public class ReviewControllerTest {


    @Autowired
    private ProductService productService;

    @BeforeAll
    public static void setup() {
        port = 8082;
        RestAssured.baseURI = "http://localhost/";
        RestAssured.basePath = "";
    }

    @Test
    public void whenGetProductReviews_thenOK() {
        String productId = productService.findAll(PageRequest.of(0, 1)).getContent().get(0).getProductNumber();

        given()
                .port(port)
                .when()
                .get("/review/{productId}", productId)
                .then()
                .statusCode(HttpStatus.OK.value())
                .body("items", not(empty()));
    }

    @Test
    public void whenGetProductReviewsForNonexistentProduct_thenNotFound() {
        given()
                .port(port)
                .when()
                .get("/review/{productId}", "nonexistentProductId")
                .then()
                .statusCode(HttpStatus.BAD_REQUEST.value())
                .body("isSuccess", is(false));
    }

    @Test
    public void whenAddProductReview_thenCreated() {
        String productId = productService.findAll(PageRequest.of(0, 1)).getContent().get(0).getProductNumber();

        ReviewDto reviewDto = new ReviewDto(null, productId, "userId", "Great product!");

        given()
                .port(port)
                .contentType(ContentType.JSON)
                .body(reviewDto)
                .when()
                .post("/review/{productId}", productId)
                .then()
                .statusCode(HttpStatus.CREATED.value())
                .body("description", equalTo(reviewDto.getDescription()));
    }

    @Test
    public void whenAddProductReviewForNonexistentProduct_thenNotFound() {
        ReviewDto reviewDto = new ReviewDto(null, "nonexistentProductId", "userId", "Great product!");

        given()
                .port(port)
                .contentType(ContentType.JSON)
                .body(reviewDto)
                .when()
                .post("/review/{productId}", "nonexistentProductId")
                .then()
                .statusCode(HttpStatus.BAD_REQUEST.value())
                .body("isSuccess", is(false));
    }
}
