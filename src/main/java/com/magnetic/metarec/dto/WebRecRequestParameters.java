package com.magnetic.metarec.dto;

/**
 * Created by kraja on 4/21/16.
 */
public class WebRecRequestParameters {

    String clientIdentifier;
    String pageType;
    String zoneId;
    String productId;
    String productsInPage;
    String consumerId;
    String brandName;
    Integer numberOfQueries;


    public String getClientIdentifier() {
        return clientIdentifier;
    }

    public void setClientIdentifier(String clientIdentifier) {
        this.clientIdentifier = clientIdentifier;
    }


    public String getProductId() {
        return productId;
    }

    public void setProductId(String productId) {
        this.productId = productId;
    }



    public String getConsumerId() {
        return consumerId;
    }

    public void setConsumerId(String consumerId) {
        this.consumerId = consumerId;
    }



    public String getProductsInPage() {
        return productsInPage;
    }

    public void setProductsInPage(String productsInPage) {
        this.productsInPage = productsInPage;
    }



    public String getBrandName() {
        return brandName;
    }

    public void setBrandName(String brandName) {
        this.brandName = brandName;
    }



    public String getZoneId() {
        return zoneId;
    }

    public void setZoneId(String zoneId) {
        this.zoneId = zoneId;
    }



    public String getPageType() {
        return pageType;
    }

    public void setPageType(String pageType) {
        this.pageType = pageType;
    }

    public Integer getNumberOfQueries() {
        return numberOfQueries;
    }

    public void setNumberOfQueries(Integer numberOfQueries) {
        this.numberOfQueries = numberOfQueries;
    }



}
