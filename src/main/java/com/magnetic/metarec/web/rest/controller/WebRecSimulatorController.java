package com.magnetic.metarec.web.rest.controller;

import com.magnetic.metarec.domain.WebRecSimulation;
import com.magnetic.metarec.service.RecommendationService;
import org.springframework.hateoas.mvc.ControllerLinkBuilder;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.inject.Inject;
import javax.validation.Valid;
import java.util.List;

/**
 *
 */
@RestController
@RequestMapping(value = "{client}/webRecSimulations", produces = "application/hal+json")
public class WebRecSimulatorController {

    @Inject
    private RecommendationService recommendationService;

    @RequestMapping(method = RequestMethod.POST)
    public ResponseEntity<Void> runSimulation(@PathVariable("client") String client,
        @RequestBody @Valid WebRecSimulation request) {

        HttpHeaders headers = new HttpHeaders();
        headers.setLocation(ControllerLinkBuilder.linkTo(WebRecSimulatorController.class, client).slash("12345").toUri());

        recommendationService.getRecommendations(request);

        return new ResponseEntity<Void>(headers, HttpStatus.CREATED);
    }

    @RequestMapping(method = RequestMethod.GET)
    public List<WebRecSimulation> getSimulations(@PathVariable("client") String client) {

        return recommendationService.getSimulationRuns(client);
    }
//
//    @RequestMapping(value = "topRecipes/{simulationId}")
//    public void getTopRecipes(@RequestParam("limit") Integer limit) {
//        return;
//    }
//
//    @RequestMapping
//    public void getTopProducts(@RequestParam("limit") Integer limit) {
//        return;
//    }
}
