package com.magnetic.metarec.web.rest.controller;

import com.magnetic.metarec.PageType;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

/**
 *
 */
@RestController
@RequestMapping(value = "{client}/{pageType}/zones", produces = "application/hal+json")
public class ZoneController {

    public List<String> getZones(@PathVariable("client") String client,
                                 @PathVariable("pageType") PageType pageType) {

        return new ArrayList<>();
    }
}
