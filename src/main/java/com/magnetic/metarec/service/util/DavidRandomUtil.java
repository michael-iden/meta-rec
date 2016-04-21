package com.magnetic.metarec.service.util;

import com.magnetic.metarec.dto.WebRecRequestParameters;
import org.apache.http.client.utils.URIBuilder;

import java.net.URI;
import java.net.URISyntaxException;

/**
 * Created by dwhitesell on 4/20/16.
 */
public class DavidRandomUtil
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


    public DavidRandomUtil(WebRecRequestParameters requestParameters)
    {
        this();
        client = getEmptyStringIfNull(requestParameters.getClientIdentifier());
        webreqZones = getDefaultIfNullOrEmpty(requestParameters.getZoneId(), "1");
        pageType = requestParameters.getPageType().getKey();
        numRequests = requestParameters.getNumberOfQueries();

    }

    public DavidRandomUtil()
    {
        webrecServerAddress = getDefaultIfNullOrEmpty(webrecServerAddress,"t.p.mybuys.com");
        channel = getDefaultIfNullOrEmpty(channel, "web");
        pageType = getDefaultIfNullOrEmpty(pageType, "PRODUCT_DETAIL");
        productId = getEmptyStringIfNull(productId);
        categoryId = getEmptyStringIfNull(categoryId);
        brandName = getEmptyStringIfNull(brandName);
        productInPage = getEmptyStringIfNull(productInPage);
        products = getEmptyStringIfNull(products);
        inventoryCategory = getEmptyStringIfNull(inventoryCategory);
        inventoryAttributeName = getEmptyStringIfNull(inventoryAttributeName);
        inventoryAttributeValue = getEmptyStringIfNull(inventoryAttributeValue);
        filteringAttribute1 = getEmptyStringIfNull(filteringAttribute1);
        filteringAttribute2 = getEmptyStringIfNull(filteringAttribute2);
        filteringAttribute1Val = getEmptyStringIfNull(filteringAttribute1Val);
        filteringAttribute2Val = getEmptyStringIfNull(filteringAttribute2Val);
        orderId = getEmptyStringIfNull(orderId);
        overrideConsumerId = getEmptyStringIfNull(overrideConsumerId);
        overrideEmail = getEmptyStringIfNull(overrideEmail);
        outOfStock = getEmptyStringIfNull(outOfStock);
        keywords = getEmptyStringIfNull(keywords);
        language = getDefaultIfNullOrEmpty(language, "en");

    }

    public URI getURI() throws URISyntaxException {
        URIBuilder urib = new URIBuilder();
        urib.setScheme("http");
        urib.setHost(webrecServerAddress);
        urib.setPath("/webrec/wr.do");
        urib.setParameter("client", client);
        urib.setParameter("wrz", webreqZones);
        urib.setParameter("pt", pageType);
        urib.setParameter("cpc", productId);
        urib.setParameter("chn", channel);
        urib.setParameter("bnm", brandName);
        urib.setParameter("pips", productInPage);
        urib.setParameter("prods", products);
        urib.setParameter("scckc", inventoryCategory);
        urib.setParameter("scattr", inventoryAttributeName);
        urib.setParameter("scval", inventoryAttributeValue);
        urib.setParameter("mbfa_filtering_attribute_1", filteringAttribute1Val);
        urib.setParameter("mbfa_filtering_attribute_2", filteringAttribute1Val);
        urib.setParameter("order", orderId);
        urib.setParameter("email", overrideEmail);
        urib.setParameter("ostock", outOfStock);
        urib.setParameter("kws", keywords);
        urib.setParameter("mbcc", overrideConsumerId);
        urib.setParameter("lang", language);
        urib.setParameter("v4", "6.0.0");
        uri = urib.build();
        return uri;

    }

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

    public static String getEmptyStringIfNull(String input)
    {
        String output;
        if (input == null)
        {
            output = "";
        } else {
            output = input;
        }
        return output;
    }

    public static String getDefaultIfNullOrEmpty(String input, String defaultValue)
    {
        String supplied = getEmptyStringIfNull(input);
        if (supplied.isEmpty())
        {
            supplied = defaultValue;
        } else {    }
        return supplied;
    }


}
