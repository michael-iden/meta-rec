package com.magnetic.metarec.dto;

import com.magnetic.metarec.PageType;
import lombok.Data;

import java.util.List;

/**
 * Created by kraja on 4/21/16.
 */
@Data
public class WebRecRequestParameters {

    String clientIdentifier;
    PageType pageType;
    String zoneId;
    String productId;
    List<String> productsInPage;
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



    public List<String> getProductsInPage() {
        return productsInPage;
    }

    public void setProductsInPage(List<String> productsInPage) {
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



    public PageType getPageType() {
        return pageType;
    }

    public void setPageType(PageType pageType) {
        this.pageType = pageType;
    }

    public Integer getNumberOfQueries() {
        return numberOfQueries;
    }

    public void setNumberOfQueries(Integer numberOfQueries) {
        this.numberOfQueries = numberOfQueries;
    }

    public String toString() {
        return "com.magnetic.metarec.dto.WebRecRequestParameters(clientIdentifier=" + this.getClientIdentifier() + ", pageType=" + this.getPageType() + ", zoneId=" + this.getZoneId() + ", productId=" + this.getProductId() + ", productsInPage=" + this.getProductsInPage() + ", consumerId=" + this.getConsumerId() + ", brandName=" + this.getBrandName() + ", numberOfQueries=" + this.getNumberOfQueries() + ")";
    }


}
