package com.miu.backend;

import com.miu.backend.web.dto.ProductDto;
import io.restassured.RestAssured;
import io.restassured.http.ContentType;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.HttpStatus;

import java.math.BigDecimal;

import static io.restassured.RestAssured.given;
import static io.restassured.RestAssured.port;
import static org.hamcrest.Matchers.*;

@SpringBootTest
public class ProductControllerTest {

    @BeforeAll
    public static void setup() {
        port = 8082;
        RestAssured.baseURI = "http://localhost/";
        RestAssured.basePath = "";
    }

    @Test
    public void whenGetAllProducts_thenOK() {
        given()
                .port(port)
                .when()
                .get("/product")
                .then()
                .statusCode(HttpStatus.OK.value())
                .body("items", not(empty()));
    }

    @Test
    public void whenGetSingleProduct_thenOK() {
        String productId = "655c53d925d8cb3d1a610f26";

        given()
                .port(port)
                .when()
                .get("/product/{productId}", productId)
                .then()
                .statusCode(HttpStatus.OK.value())
                .body("name", notNullValue())
                .body("productNumber", notNullValue());
    }

    @Test
    public void whenGetNonexistentProduct_thenNotFound() {
        given()
                .port(port)
                .when()
                .get("/product/{productId}", "nonexistentProductId")
                .then()
                .statusCode(HttpStatus.BAD_REQUEST.value())
                .body("isSuccess", is(false));
    }

    @Test
    public void whenAddNewProduct_thenCreated() {
        ProductDto productDto = new ProductDto(null, "New Product", "Description", BigDecimal.valueOf(19.99), 10, "");

        given()
                .port(port)
                .contentType(ContentType.JSON)
                .body(productDto)
                .when()
                .post("/product")
                .then()
                .statusCode(HttpStatus.CREATED.value())
                .body("name", equalTo(productDto.getName()))
                .body("productNumber", notNullValue());
    }

    @Test
    public void whenAddInvalidProduct_thenBadRequest() {
        ProductDto invalidProductDto = new ProductDto(null, null, null, null, -1, null);

        given()
                .port(port)
                .contentType(ContentType.JSON)
                .body(invalidProductDto)
                .when()
                .post("/product")
                .then()
                .statusCode(HttpStatus.BAD_REQUEST.value())
                .body("isSuccess", is(false));
    }

    @Test
    public void whenUpdateProduct_thenOK() {
        String productId = "655c53d925d8cb3d1a610f26";
        ProductDto updatedProductDto = new ProductDto(productId, "Updated Product", "Updated Description", BigDecimal.valueOf(29.99), 20, "");

        given()
                .port(port)
                .contentType(ContentType.JSON)
                .body(updatedProductDto)
                .when()
                .put("/product/{productId}", productId)
                .then()
                .statusCode(HttpStatus.OK.value())
                .body("name", equalTo(updatedProductDto.getName()))
                .body("productNumber", equalTo(updatedProductDto.getProductNumber()));
    }

    @Test
    public void whenUpdateNonexistentProduct_thenNotFound() {
        ProductDto updatedProductDto = new ProductDto("nonexistentProductId", "Updated Product", "Updated Description", BigDecimal.valueOf(29.99), 20, "");

        given()
                .port(port)
                .contentType(ContentType.JSON)
                .body(updatedProductDto)
                .when()
                .put("/product/{productId}", "nonexistentProductId")
                .then()
                .statusCode(HttpStatus.BAD_REQUEST.value())
                .body("isSuccess", is(false));
    }

    @Test
    public void whenDeleteNonexistentProduct_thenNotFound() {
        given()
                .port(port)
                .when()
                .delete("/product/{productId}", "nonexistentProductId")
                .then()
                .statusCode(HttpStatus.BAD_REQUEST.value())
                .body("isSuccess", is(false));
    }

    @Test
    public void whenSearchForProduct_thenOK() {
        String productName = "Product 1";

        given()
                .port(port)
                .param("name", productName)
                .when()
                .get("/product/search")
                .then()
                .statusCode(HttpStatus.OK.value())
                .body("items", not(empty()));
    }

    @Test
    public void whenSearchForNonexistentProduct_thenEmptyResult() {
        given()
                .port(port)
                .param("name", "nonexistentProduct")
                .when()
                .get("/product/search")
                .then()
                .statusCode(HttpStatus.OK.value())
                .body("items", empty());
    }
}
