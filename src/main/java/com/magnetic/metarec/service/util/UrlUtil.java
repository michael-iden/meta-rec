package com.magnetic.metarec.service.util;

import com.magnetic.metarec.dto.WebRecRequestParameters;
import org.apache.commons.lang.StringUtils;
import org.apache.http.client.utils.URIBuilder;
import org.springframework.cglib.core.CollectionUtils;

import java.net.URI;
import java.net.URISyntaxException;

/**
 * Created by dwhitesell on 4/20/16.
 */
public class UrlUtil
{
    private String client;
    private String sessionId;
    private String webreqZones;

    private String webrecServerAddress;

    private String pageType;

    private String channel;         // for 'chn' parameter in wr.do GET request
    private String productId;      // For 'cpc' parameter in wr.do GET request

    private String categoryId;     //  'ckc' parameter in wr.do GET request
    private String brandName;      // 'bnm' parameter in wr.do GET request
    private String productInPage;     // corresponds to the 'pips' param for wr.do GET request
    private String products;        // corresponds to the 'prods' param for wr.do GET request
    private String inventoryCategory;   // corresponds to 'scckc' param for wr.do GET request
    private String inventoryAttributeName;      // corresponds to 'scattr' param for wr.do GET request
    private String inventoryAttributeValue;     // corresponds to 'scval' param for wr.do GET request
    private String filteringAttribute1;
    private String filteringAttribute2;
    private String filteringAttribute1Val;  // corresponds to 'mbfa_filtering_attribute_1' param for wr.do GET request
    private String filteringAttribute2Val;  // corresponds to 'mbfa_filtering_attribute_2' param for wr.do GET request
    private String orderId;     // corresponds to 'order' param for wr.do GET request
    private String overrideConsumerId;  // corresponds to 'mbcc' parameter for wr.do GET request
    private String overrideEmail;       // corresponds to 'email' param of wr.do GET request
    private String outOfStock;      // corresponds to 'ostock' param of wr.do GET request
    private String keywords;    // corresponds to 'kws' param of wr.do GET request
    private String language;    // corresponds to 'lang' param for wr.do GET request

    private int numRequests;
    private URI uri;




    public static URI getURI(WebRecRequestParameters requestParams) throws URISyntaxException {

        URI uri;
        URIBuilder urib = new URIBuilder();

        urib.setScheme("http");
        urib.setHost("t.p.mybuys.com");
        urib.setPath("/webrec/wr.do");

        urib.setParameter("client", requestParams.getClientIdentifier());
        urib.setParameter("wrz", requestParams.getZoneId());
        urib.setParameter("pt", requestParams.getPageType().getKey());

        if(StringUtils.isNotEmpty(requestParams.getProductId())) {
            urib.setParameter("cpc",requestParams.getProductId() );
        }

        if(StringUtils.isNotEmpty(requestParams.getBrandName())) {
            urib.setParameter("bnm", requestParams.getBrandName());
        }

        if(requestParams.getProductsInPage() != null && requestParams.getProductsInPage().size()>0){
            StringBuilder sb = new StringBuilder();
            for(String pip : requestParams.getProductsInPage())
            {
                sb.append(pip);
            }
            urib.setParameter("pips", sb.toString());

        }

        if(StringUtils.isNotEmpty(requestParams.getFilteringAttributeName()) && StringUtils.isNotEmpty(requestParams.getFilteringAttributeValue()))
        {
            urib.setParameter("mbfa", requestParams.getFilteringAttributeName());
            urib.setParameter("mbfa_filtering_attribute_1", requestParams.getFilteringAttributeValue());
        }

        uri = urib.build();

        /*
        urib.setParameter("chn", channel);
        urib.setParameter("scckc", inventoryCategory);
        urib.setParameter("scattr", inventoryAttributeName);
        urib.setParameter("scval", inventoryAttributeValue);
        urib.setParameter("order", orderId);
        urib.setParameter("email", overrideEmail);
        urib.setParameter("ostock", outOfStock);
        urib.setParameter("kws", keywords);
        urib.setParameter("mbcc", overrideConsumerId);
        urib.setParameter("lang", language);
        urib.setParameter("v4", "6.0.0");

        */

        return uri;

    }
/*
    public void RunRequests()
    {
        try {
            getURI();
        } catch (URISyntaxException urisexception)
        {
            System.out.println("invalid syntax on URI ");
            urisexception.printStackTrace();
        }
        for (int x = 0; x < numRequests; x++)
        {
//            WebRecRequest wrr = new WebRecRequest(uri, this, "" + x);
//            Thread wrrThread = new Thread(wrr);
//            wrrThread.start();
        }
    }

*/


}
