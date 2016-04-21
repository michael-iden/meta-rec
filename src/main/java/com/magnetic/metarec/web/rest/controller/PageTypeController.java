package com.magnetic.metarec.web.rest.controller;

import com.magnetic.metarec.dto.assembler.PageTypeResourceAssembler;
import com.magnetic.metarec.dto.resource.PageTypeResource;
import com.magnetic.metarec.service.WebRecConfigService;
import org.springframework.hateoas.Resources;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.inject.Inject;
import java.io.IOException;

/**
 *
 */

@RestController
@RequestMapping(value = "{client}/pageTypes", produces = "application/hal+json")
public class PageTypeController {

    @Inject
    private WebRecConfigService webRecConfigService;

    @Inject
    private PageTypeResourceAssembler assembler;

    @RequestMapping
    public Resources<PageTypeResource> getPageTypes(@PathVariable("client") String client) throws IOException {

        return new Resources<PageTypeResource>(
            assembler.toResources(webRecConfigService.getPageTypeZoneKeys(client)));
    }
}
