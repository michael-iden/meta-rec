package com.magnetic.metarec.web.rest.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 */
@RestController
@RequestMapping(value = "clients", produces = "application/hal+json")
public class ClientController {

    public void getClients() {
    }
}
