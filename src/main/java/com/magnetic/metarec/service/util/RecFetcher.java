package com.magnetic.metarec.service.util;

import java.net.URI;
import java.util.concurrent.Callable;

/**
 * Created by kraja on 4/21/16.
 */
public class RecFetcher implements Callable {

    private URI uri;

    private String response ="";

    public String getResponse() {
        return response;
    }


    public RecFetcher(URI uri)
    {
        this.uri = uri;
    }

    @Override
    public String call() {

        try {
           response =  RequestUtil.getResponseFromRequest(uri);
        } catch (Exception e) {
            System.out.println(e.toString());
        }

        return response;

    }
}
