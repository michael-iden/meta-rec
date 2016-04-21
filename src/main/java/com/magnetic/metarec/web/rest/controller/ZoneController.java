package com.magnetic.metarec.web.rest.controller;

import com.magnetic.metarec.PageType;
import com.magnetic.metarec.service.WebRecConfigService;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.inject.Inject;
import java.io.IOException;
import java.util.List;

/**
 *
 */
@RestController
@RequestMapping(value = "{client}/{pageType}/zones", produces = "application/hal+json")
public class ZoneController {

    @Inject
    private WebRecConfigService webRecConfigService;

    @RequestMapping
    public List<Integer> getZones(@PathVariable("client") String client,
                                 @PathVariable("pageType") PageType pageType) throws IOException {

        return webRecConfigService.getZoneIdsForPageType(client, pageType);
    }
}
