package com.magnetic.metarec.service;



import com.magnetic.metarec.PageType;
import com.magnetic.metarec.dto.WebRecRequestParameters;
import com.magnetic.metarec.service.util.UrlUtil;
import com.magnetic.metarec.service.util.RequestUtil;
import org.springframework.stereotype.Service;

import java.net.URISyntaxException;

/**
 * Created by kraja on 4/21/16.
 */

@Service
public class RecommendationService {


    public static void getRecommendations(WebRecRequestParameters request) {

        request.setClientIdentifier("JOANN");
        request.setPageType(PageType.SHOPPING_CART);
        request.setZoneId("1");
        request.setNumberOfQueries(1);

        try {

            RequestUtil.getResponseFromRequest(UrlUtil.getURI(request));
        } catch (Exception e) {
            e.printStackTrace();
        }


    }


    public static void main(String args[])
    {
        getRecommendations(new WebRecRequestParameters());
    }
}
