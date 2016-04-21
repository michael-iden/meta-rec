package com.magnetic.metarec.web.rest.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 */
@RestController
@RequestMapping("/simulator")
public class SimulatorController {

    @RequestMapping
    public String testing() {

        return "cat";
    }



}
