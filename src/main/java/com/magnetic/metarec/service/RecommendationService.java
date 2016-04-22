package com.magnetic.metarec.service;

import com.magnetic.metarec.domain.WebRecSimulation;
import com.magnetic.metarec.domain.reporting.ResponseParameters;
import com.magnetic.metarec.repository.ResponseParameterRepository;
import com.magnetic.metarec.repository.WebRecSimulationRepository;
import com.magnetic.metarec.service.util.RecFetcher;
import com.magnetic.metarec.service.util.UrlUtil;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import javax.inject.Inject;
import java.net.URI;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.concurrent.Callable;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Future;
import java.util.concurrent.TimeUnit;
import java.util.regex.Matcher;
import java.util.regex.Pattern;


/**
 * Created by kraja on 4/21/16.
 */

@Service
public class RecommendationService {

    @Inject
    ResponseParameterRepository responseParameterRepository;

    @Inject
    WebRecSimulationRepository webRecSimulationRepository;

    private ExecutorService taskExecutor;

    public void getRecommendations(WebRecSimulation request) {


        webRecSimulationRepository.save(request);
        int jobId = request.getId();

        try {

            List<Callable<RecFetcher>> tasks = new ArrayList<Callable<RecFetcher>>();


            int numQueries;

            if(request.getNumberOfQueries() == null) {
                numQueries = 1;
            } else {
                numQueries = Math.min(request.getNumberOfQueries(), 5);
            }

            URI uri = UrlUtil.getURI(request);

            for(int i = 0; i < numQueries; i++) {
                tasks.add(new RecFetcher(uri));
            }

//            testScriptEngine();

            /* invokeAll blocks until all service requests complete,
           * or a max of 10 seconds. */
            List<Future<RecFetcher>> results = taskExecutor.invokeAll(tasks, 10, TimeUnit.SECONDS);
            for (Future<RecFetcher> f : results) {

                List<ResponseParameters> relevantParamsInResponseList = parseRecommendations(String.valueOf(f.get()));

                for(ResponseParameters responseParameters : relevantParamsInResponseList) {
                    responseParameters.setJobId(jobId);
                }

               responseParameterRepository.save(relevantParamsInResponseList);

            }
        } catch (Exception e) {
            e.printStackTrace();
        }


    }

    @PostConstruct
    public void testString() {


    }

    public List<ResponseParameters> parseRecommendations(String responseBody) throws Exception {

        Pattern debugPattern = Pattern.compile("cl=\"(.*?)\" cp=\"(.*?)\" cc=\"(.*?)\" pr=\"(.*?)\" re=\"(.*?)\" po=\"(.*?)\" cr=\"(.*?)\"");

        List<ResponseParameters> reponseParametersList = new ArrayList<>();

        List<String> substrings = Arrays.asList(responseBody.split("</span>.*?<span\\sclass=\"MB_DEBUG\" "));
        for(String str : substrings) {
            Matcher debugMatcher = debugPattern.matcher(str);
            while(debugMatcher.find()) {
                ResponseParameters responseParams = new ResponseParameters();
                responseParams.setClient(debugMatcher.group(1));
                responseParams.setProductKey(debugMatcher.group(4));
                responseParams.setRecipeId(debugMatcher.group(5));
                responseParams.setPolicy(debugMatcher.group(6));
                responseParams.setCriteria(debugMatcher.group(7));

                reponseParametersList.add(responseParams);
            }
        }

        return reponseParametersList;

    }


    public void setTaskExecutor(ExecutorService taskExecutor1) {
        this.taskExecutor = taskExecutor1;
    }

    public List<WebRecSimulation> getSimulationRuns(String client) {
        List<WebRecSimulation> clientSimulations = new ArrayList<>();

        List<WebRecSimulation> simulations = webRecSimulationRepository.findAll();
        for(WebRecSimulation sim : simulations) {
            if(sim.getClientIdentifier().equals(client)) {
                clientSimulations.add(sim);
            }
        }

        return clientSimulations;
    }
}


