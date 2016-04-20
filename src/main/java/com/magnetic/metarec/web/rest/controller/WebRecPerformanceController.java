package com.magnetic.metarec.web.rest.controller;

import com.magnetic.metarec.WebRecRequest;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

/**
 *
 */
@RestController
@RequestMapping(value = "{client}/webRecPerformance", produces = "application/hal+json")
public class WebRecPerformanceController {

    @RequestMapping(method = RequestMethod.POST)
    public void runSimulation(@RequestBody @Valid WebRecRequest request) {
    }

    @RequestMapping
    public void getMostRecommendedProducts() {

    }
}
