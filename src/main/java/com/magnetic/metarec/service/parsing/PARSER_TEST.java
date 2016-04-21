package com.magnetic.metarec.service.parsing;



import com.magnetic.metarec.PageType;
import com.magnetic.metarec.dto.WebRecRequestParameters;
import org.apache.http.HttpResponse;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.impl.client.DefaultHttpClient;

import java.net.MalformedURLException;
import java.net.URI;
import java.net.URISyntaxException;

/**
 * Created by kraja on 4/21/16.
 */
public class PARSER_TEST{


    public static void getRecommendations(WebRecRequestParameters request) {

        request.setClientIdentifier("JOANN");
        request.setPageType(PageType.PRODUCT_DETAILS);
        request.setZoneId("1");
        request.setNumberOfQueries(1);

        URIBUILDER util = new URIBUILDER(request);
        util.RunRequests();

//        try {
//            URI requestURL = util.getURI();
//            try {
//                System.out.println("Running Request on URI " + requestURL.toURL().toString());
//           } catch (MalformedURLException mfuex)
//            {
//                mfuex.printStackTrace();
//            }
//            DavidRequest recrequest = new DavidRequest(requestURL);
//            recrequest.run();
//        } catch (URISyntaxException e) {
//            e.printStackTrace();
//        }
    }


    public static void main(String args[])
    {
        getRecommendations(new WebRecRequestParameters());
        System.out.println("All Done");
    }
}
