package com.magnetic.metarec.domain;

import com.magnetic.metarec.PageType;

import javax.persistence.*;
import java.util.List;

/**
 * Created by kraja on 4/21/16.
 */
@Entity
@Table(name = "web_rec_simulation")
public class WebRecSimulation {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;

    @Column(name = "client_identifier")
    private String clientIdentifier;

    @Column(name = "page_type")
    private PageType pageType;

    @Column(name = "zone_id")
    private Integer zoneId;

    @Column(name = "product_id")
    private Integer productId;

    @Transient
    private List<String> productsInPage;

    @Column(name = "consumer_id")
    private String consumerId;

    @Column(name = "brand_name")
    private String brandName;

    @Column(name = "number_of_queries")
    private Integer numberOfQueries;

    @Column(name = "filtering_attribute_name")
    private String filteringAttributeName;

    @Column(name = "filtering_attribute_value")
    private String filteringAttributeValue;

    public String getFilteringAttributeName() {
        return filteringAttributeName;
    }

    public void setFilteringAttributeName(String filteringAttributeName) {
        this.filteringAttributeName = filteringAttributeName;
    }

    public String getFilteringAttributeValue() {
        return filteringAttributeValue;
    }

    public void setFilteringAttributeValue(String filteringAttributeValue) {
        this.filteringAttributeValue = filteringAttributeValue;
    }



    public String getClientIdentifier() {
        return clientIdentifier;
    }

    public void setClientIdentifier(String clientIdentifier) {
        this.clientIdentifier = clientIdentifier;
    }


    public Integer getProductId() {
        return productId;
    }

    public void setProductId(Integer productId) {
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



    public Integer getZoneId() {
        return zoneId;
    }

    public void setZoneId(Integer zoneId) {
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
        return "com.magnetic.metarec.domain.WebRecSimulation(clientIdentifier=" + this.getClientIdentifier() + ", pageType=" + this.getPageType() + ", zoneId=" + this.getZoneId() + ", productId=" + this.getProductId() + ", productsInPage=" + this.getProductsInPage() + ", consumerId=" + this.getConsumerId() + ", brandName=" + this.getBrandName() + ", numberOfQueries=" + this.getNumberOfQueries() + ")";
    }


}
