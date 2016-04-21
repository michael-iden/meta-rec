package com.magnetic.metarec.service;

import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Created by kraja on 4/20/16.
 */

@Service
public interface ClientService {

    public List<String> getClientsActiveOnWebrec();

}
