package com.magnetic.metarec.web.rest.controller;

import com.magnetic.metarec.domain.WebRecSimulation;
import com.magnetic.metarec.domain.reporting.ResponseParameters;
import com.magnetic.metarec.service.RecommendationService;
import org.springframework.hateoas.mvc.ControllerLinkBuilder;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.inject.Inject;
import javax.validation.Valid;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

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


    @RequestMapping(value = "/{id}/recipeData", method = RequestMethod.GET)
    public Map<String, Integer> getRecipe(@PathVariable("id") Integer id) {

        List<ResponseParameters> parametersList = recommendationService.getResponseParameters(id);
        Map<String, Integer> recipesFreq = new HashMap<>();
        for(ResponseParameters response : parametersList) {
            String recipeId = response.getRecipeId();
            if(!recipesFreq.containsKey(recipeId)) {
                recipesFreq.put(recipeId, 0);
            }
            recipesFreq.put(recipeId, recipesFreq.get(recipeId)+1);
        }

        return recipesFreq;
    }

    @RequestMapping(value = "/{id}/criteriaData", method = RequestMethod.GET)
    public Map<String, Integer> getCriteria(@PathVariable("id") Integer id) {

        List<ResponseParameters> parametersList = recommendationService.getResponseParameters(id);
        Map<String, Integer> criteriaFreq = new HashMap<>();
        for(ResponseParameters response : parametersList) {
            String criteriaId = response.getCriteria();
            if(!criteriaFreq.containsKey(criteriaId)) {
                criteriaFreq.put(criteriaId, 0);
            }
            criteriaFreq.put(criteriaId, criteriaFreq.get(criteriaId)+1);
        }

        return criteriaFreq;
    }

    @RequestMapping(value = "/{id}/categoryData", method = RequestMethod.GET)
    public Map<String, Integer> getClientCategory(@PathVariable("id") Integer id) {

        List<ResponseParameters> parametersList = recommendationService.getResponseParameters(id);
        Map<String, Integer> categoryFreq = new HashMap<>();
        for(ResponseParameters response : parametersList) {
            String categoryId = response.getCustomerCategory();
            if(!categoryFreq.containsKey(categoryId)) {
                categoryFreq.put(categoryId, 0);
            }
            categoryFreq.put(categoryId, categoryFreq.get(categoryId)+1);
        }

        return categoryFreq;
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
