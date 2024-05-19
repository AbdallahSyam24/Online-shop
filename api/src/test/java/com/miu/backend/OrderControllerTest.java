package com.miu.backend;

import com.miu.backend.data.OrderRepository;
import com.miu.backend.web.dto.OrderDto;
import io.restassured.RestAssured;
import io.restassured.http.ContentType;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.HttpStatus;

import static io.restassured.RestAssured.given;
import static io.restassured.RestAssured.port;
import static org.hamcrest.Matchers.*;

@SpringBootTest
//@ContextConfiguration
public class OrderControllerTest {

    @BeforeAll
    public static void setup() {
        port = 8082;
        RestAssured.baseURI = "http://localhost/";
        RestAssured.basePath = "";
    }

    @Autowired
    private OrderRepository orderRepository;

    @BeforeAll
    public static void setUp() {
        RestAssured.enableLoggingOfRequestAndResponseIfValidationFails();
    }

    @Test
    public void whenGetAllOrders_thenOK() {
        given()
                .port(port)
                .when()
                .get("/order")
                .then()
                .statusCode(HttpStatus.OK.value())
                .body("items", not(empty()));
    }

    @Test
    public void whenGetSingleOrder_thenOK() {
        String orderId = orderRepository.findAll().get(0).getOrderId();

        given()
                .port(port)
                .when()
                .get("/order/{orderId}", orderId)
                .then()
                .statusCode(HttpStatus.OK.value())
                .body("name", notNullValue())
                .body("orderId", notNullValue());
    }

    @Test
    public void whenGetNonexistentOrder_thenNotFound() {
        given()
                .port(port)
                .when()
                .get("/order/{orderId}", "nonexistentOrderId")
                .then()
                .statusCode(HttpStatus.BAD_REQUEST.value())
                .body("isSuccess", is(false));
    }

    @Test
    public void whenAddInvalidOrder_thenBadRequest() {
        OrderDto invalidOrderDto = new OrderDto();

        given()
                .port(port)
                .contentType(ContentType.JSON)
                .body(invalidOrderDto)
                .when()
                .post("/order")
                .then()
                .statusCode(HttpStatus.BAD_REQUEST.value())
                .body("isSuccess", is(false));
    }

    @Test
    public void whenUpdateOrderStatus_thenOK() {
        String orderId = orderRepository.findAll().get(0).getOrderId();
        String newStatus = "shipped";

        given()
                .port(port)
                .param("newValue", newStatus)
                .when()
                .put("/order/{orderId}", orderId)
                .then()
                .statusCode(HttpStatus.OK.value())
                .body("status", equalTo("SHIPPED"));
    }

    @Test
    public void whenUpdateNonexistentOrderStatus_thenNotFound() {
        String newStatus = "SHIPPED";

        given()
                .port(port)
                .param("newValue", newStatus)
                .when()
                .put("/order/{orderId}", "nonexistentOrderId")
                .then()
                .statusCode(HttpStatus.BAD_REQUEST.value())
                .body("isSuccess", is(false));
    }
}
