package com.magnetic.metarec.service.util;

import org.apache.http.HttpEntity;
import org.apache.http.HttpResponse;
import org.apache.http.client.ClientProtocolException;
import org.apache.http.client.HttpClient;
import org.apache.http.client.ResponseHandler;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.client.utils.URIBuilder;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.util.EntityUtils;

import java.io.IOException;
import java.net.URI;

/**
 * Created by dwhitesell on 4/20/16.
 */
public class RequestUtil{


/*
    private URI requestURI;
    private HttpGet httpConnect;
    private String request_id;

    public RequestUtil(URI uri)
    {
        requestURI = uri;

        httpConnect = new HttpGet(requestURI);

    }

    public void run()
    {
        try {
            String responseFromRequest = getResponseFromRequest();
        } catch (Exception ex)
        {
            ex.printStackTrace();
        }
    }
*/
    public static String getResponseFromRequest(URI uri) throws Exception
    {

        HttpGet httpConnect = new HttpGet(uri);

        String response = "";
        CloseableHttpClient httpclient = HttpClients.createDefault();
        ResponseHandler<String> responseHandler = new ResponseHandler<String>() {
            @Override
            public String handleResponse(
                final HttpResponse response) throws ClientProtocolException, IOException {
                int status = response.getStatusLine().getStatusCode();
                if (status >= 200 && status < 300) {
                    HttpEntity entity = response.getEntity();
                    return entity != null ? EntityUtils.toString(entity) : null;
                } else {
                    throw new ClientProtocolException("Unexpected response status: " + status);
                }
            }

        };
        response = httpclient.execute(httpConnect, responseHandler);
        System.out.println("----------------------------------------");
        System.out.println(response);
        return response;
    }
}
