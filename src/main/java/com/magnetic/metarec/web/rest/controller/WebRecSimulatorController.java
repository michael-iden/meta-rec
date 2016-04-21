package com.magnetic.metarec.web.rest.controller;

import com.magnetic.metarec.dto.WebRecRequestParameters;
import org.springframework.hateoas.mvc.ControllerLinkBuilder;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

/**
 *
 */
@RestController
@RequestMapping(value = "{client}/webRecSimulator", produces = "application/hal+json")
public class WebRecSimulatorController {

    @RequestMapping(method = RequestMethod.POST)
    public ResponseEntity<Void> runSimulation(@PathVariable("client") String client,
        @RequestBody @Valid WebRecRequestParameters request) {

        HttpHeaders headers = new HttpHeaders();
        headers.setLocation(ControllerLinkBuilder.linkTo(WebRecSimulatorController.class, client).slash("12345").toUri());

        return new ResponseEntity<Void>(headers, HttpStatus.CREATED);
    }

    @RequestMapping
    public void getMostRecommendedProducts(@RequestParam("limit") Integer limit) {

    }
}
