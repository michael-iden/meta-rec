package com.magnetic.metarec.service;

import com.magnetic.metarec.domain.WebRecSimulation;
import com.magnetic.metarec.service.util.RecFetcher;
import com.magnetic.metarec.service.util.UrlUtil;
import org.springframework.stereotype.Service;


import java.net.URI;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.Callable;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Future;
import java.util.concurrent.TimeUnit;


/**
 * Created by kraja on 4/21/16.
 */

@Service
public class RecommendationService {

    private ExecutorService taskExecutor;

    public void getRecommendations(WebRecSimulation request) {



        try {

            List<Callable<RecFetcher>> tasks = new ArrayList<Callable<RecFetcher>>();

            int numQueries;

            if(request.getNumberOfQueries() == null) {numQueries = 1;}
            else {numQueries = request.getNumberOfQueries();}

            URI uri = UrlUtil.getURI(request);

            while(numQueries > 0) {
                tasks.add(new RecFetcher(uri));
                numQueries--;
            }

            /* invokeAll blocks until all service requests complete,
           * or a max of 10 seconds. */
            List<Future<RecFetcher>> results = taskExecutor.invokeAll(tasks, 10, TimeUnit.SECONDS);
            for (Future<RecFetcher> f : results) {
             System.out.println(f.get());
            }


           // taskExecutor.submit(new RecFetcher(uri));

        } catch (Exception e) {
            e.printStackTrace();
        }


    }


    public void setTaskExecutor(ExecutorService taskExecutor1) {
        this.taskExecutor = taskExecutor1;
    }


}
