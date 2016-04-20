package com.magnetic.metarec.web.rest.controller;

import com.magnetic.metarec.WebRecRequest;
import org.springframework.web.bind.annotation.*;

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
    public void getMostRecommendedProducts(@RequestParam("limit") Integer limit) {

    }
}
