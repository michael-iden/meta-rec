package com.magnetic.metarec.web.rest.controller;

import com.magnetic.metarec.domain.reporting.Simulation;
import com.magnetic.metarec.dto.WebRecRequestParameters;
import com.magnetic.metarec.repository.SimulationRepository;
import com.magnetic.metarec.service.RecommendationService;
import com.magnetic.metarec.service.SimulatorReportingService;
import org.springframework.hateoas.mvc.ControllerLinkBuilder;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.inject.Inject;
import javax.validation.Valid;
import java.util.ArrayList;
import java.util.List;

/**
 *
 */
@RestController
@RequestMapping(value = "{client}/webRecSimulator", produces = "application/hal+json")
public class WebRecSimulatorController {

    @Inject
    private RecommendationService recommendationService;

    @Inject
    private SimulatorReportingService simulatorReportingService;

    @Inject
    private SimulationRepository simulationRepository;

    @RequestMapping(method = RequestMethod.POST)
    public ResponseEntity<Void> runSimulation(@PathVariable("client") String client,
        @RequestBody @Valid WebRecRequestParameters request) {

        HttpHeaders headers = new HttpHeaders();
        headers.setLocation(ControllerLinkBuilder.linkTo(WebRecSimulatorController.class, client).slash("12345").toUri());

        recommendationService.getRecommendations(request);



        return new ResponseEntity<Void>(headers, HttpStatus.CREATED);
    }

    @RequestMapping(value = "/simulations")
    public List<Simulation> getSimulations(@PathVariable("client") String client) {

        List<Simulation> clientSimulations = new ArrayList<>();

        List<Simulation> simulations = simulationRepository.findAll();
        for(Simulation sim : simulations) {
            if(sim.getClient().equals(client)) {
                clientSimulations.add(sim);
            }
        }

        return clientSimulations;
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
