package com.magnetic.metarec;

/**
 * Created by dwhitesell on 4/20/16.
 */
public class WebRecRequest {

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

    public WebRecRequest(String clientName,
                         String serverEnvironment,
                         String pageTypeParam,
                         String zoneIds)
    {

    }

    public WebRecRequest()
    {

    }

    public WebRecRequest(String clientNm, String session)
    {
    
    }
}
