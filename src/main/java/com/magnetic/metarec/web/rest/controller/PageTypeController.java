package com.magnetic.metarec.web.rest.controller;

import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 */

@RestController
@RequestMapping(value = "{client}/pageTypes", produces = "application/hal+json")
public class PageTypeController {

    @RequestMapping
    public void getPageTypes(@PathVariable("client") String client) {

    }
}
