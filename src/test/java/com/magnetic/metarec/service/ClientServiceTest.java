package com.magnetic.metarec.service;

import org.junit.Assert;
import org.junit.Test;

/**
 * Created by kraja on 4/20/16.
 */
public class ClientServiceTest {

    @Test
    public void getClientsTest()
    {
        ClientService clientService = new ClientServiceImpl();
        Assert.assertTrue(clientService.getClientsActiveOnWebrec().size()>0);
    }
}
