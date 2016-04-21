package com.magnetic.metarec.web.rest.controller;

import com.magnetic.metarec.service.ClientService;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.inject.Inject;
import java.util.List;

/**
 *
 */
@RestController
@RequestMapping(value = "clients", produces = "application/hal+json")
public class ClientController {

    @Inject
    private ClientService clientService;

    @RequestMapping
    public List<String> getClients() {
        return clientService.getClientsActiveOnWebrec();

    }
}
