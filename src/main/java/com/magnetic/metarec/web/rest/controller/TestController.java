package com.magnetic.metarec.web.rest.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 */
@RestController
@RequestMapping(value = "test", produces = "application/hal+json")
public class TestController {

    @RequestMapping
    public String testing() {

        return "cat";
    }
}
