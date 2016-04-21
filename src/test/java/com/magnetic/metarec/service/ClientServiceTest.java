package com.magnetic.metarec.service;

import com.magnetic.metarec.PageType;
import com.magnetic.metarec.domain.WebRecSimulation;
import org.junit.Assert;
import org.junit.Test;

import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

/**
 * Created by kraja on 4/20/16.
 */
public class ClientServiceTest {


    public void getClientsTest()
    {
        ClientService clientService = new ClientServiceImpl();
        Assert.assertTrue(clientService.getClientsActiveOnWebrec().size()>0);
    }

    @Test
    public void getRecsTest()
    {
        RecommendationService recService = new RecommendationService();
        ExecutorService taskExec =  Executors.newFixedThreadPool(5);


        recService.setTaskExecutor(taskExec);

        WebRecSimulation request = new WebRecSimulation();
        request.setClientIdentifier("JOANN");
        request.setPageType(PageType.SHOPPING_CART);
        request.setZoneId("1");
        request.setNumberOfQueries(30);

        recService.getRecommendations(request);
    }
}
