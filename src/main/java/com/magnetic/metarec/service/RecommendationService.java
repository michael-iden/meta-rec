package com.magnetic.metarec.service;



import com.magnetic.metarec.PageType;
import com.magnetic.metarec.dto.WebRecRequestParameters;
import com.magnetic.metarec.service.util.DavidRandomUtil;
import com.magnetic.metarec.service.util.DavidRequest;
import org.apache.http.HttpResponse;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.impl.client.DefaultHttpClient;

import java.net.URISyntaxException;

/**
 * Created by kraja on 4/21/16.
 */
public class RecommendationService {


    public static void getRecommendations(WebRecRequestParameters request) {

        request.setClientIdentifier("JOANN");
        request.setPageType(PageType.SHOPPING_CART);
        request.setZoneId("1");
        request.setNumberOfQueries(1);

        DavidRandomUtil util = new DavidRandomUtil(request);

        try {
            DavidRequest recrequest = new DavidRequest(util.getURI());
            recrequest.run();
        } catch (URISyntaxException e) {
            e.printStackTrace();
        }


    }


    public static void main(String args[])
    {
        getRecommendations(new WebRecRequestParameters());
    }
}
