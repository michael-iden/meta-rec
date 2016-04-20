package com.magnetic.metarec.web.rest.controller;

import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 */
@RestController
@RequestMapping(value = "{client}/{pageType}/zones", produces = "application/hal+json")
public class ZoneController {

    public void getZones(@PathVariable("client") String client,
                         @PathVariable("pageType") String name) {

    }
}
