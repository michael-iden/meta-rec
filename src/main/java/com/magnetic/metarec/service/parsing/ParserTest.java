package com.magnetic.metarec.service.parsing;



import com.magnetic.metarec.PageType;
import com.magnetic.metarec.domain.WebRecSimulation;

/**
 * Created by kraja on 4/21/16.
 */
public class ParserTest {


    public static void getRecommendations(WebRecSimulation request) {

        request.setClientIdentifier("JOANN");
        request.setPageType(PageType.PRODUCT_DETAILS);
        request.setZoneId(1);
        request.setNumberOfQueries(1);

        UriBuilder util = new UriBuilder(request);
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
        getRecommendations(new WebRecSimulation());
        System.out.println("All Done");
    }
}
