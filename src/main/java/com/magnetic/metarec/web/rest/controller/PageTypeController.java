package com.magnetic.metarec.web.rest.controller;

import com.magnetic.metarec.service.WebRecConfigService;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.inject.Inject;

/**
 *
 */

@RestController
@RequestMapping(value = "{client}/pageTypes", produces = "application/hal+json")
public class PageTypeController {

    @Inject
    private WebRecConfigService webRecConfigService;

    @RequestMapping
    public void getPageTypes(@PathVariable("client") String client) {
        webRecConfigService.getPageTypes(client);
    }
}
