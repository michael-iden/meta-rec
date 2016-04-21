package com.magnetic.metarec;

import org.apache.http.client.HttpClient;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.client.utils.URIBuilder;

import java.net.URI;

/**
 * Created by dwhitesell on 4/20/16.
 */
public class WebRecRequest implements Runnable{


    private WebRecRequestSchedulingController controller;
    private URI requestURI;
    private HttpGet httpConnect;

    public WebRecRequest(URI uri, WebRecRequestSchedulingController control)
    {
        requestURI = uri;
        controller = control;
        httpConnect = new HttpGet(requestURI);

    }

    public void run()
    {

    }

    public String getResponseFromRequest()
    {
        String response = "";
        return response;
    }

}
