package com.magnetic.metarec.domain.reporting;

import javax.persistence.*;

/**
 * Created by kraja on 4/21/16.
 */

@Entity
@Table
public class ResponseParameters {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;

    int jobId;
    String productKey;
    String client;
    String customerCategory;
    String recipeId;
    String policy ;
    String criteria;

    public int getJobId() {
        return jobId;
    }

    public void setJobId(int jobId) {
        this.jobId = jobId;
    }

    public String getClient() {
        return client;
    }

    public void setClient(String client) {
        this.client = client;
    }

    public String getCustomerCategory() {
        return customerCategory;
    }

    public void setCustomerCategory(String customerCategory) {
        this.customerCategory = customerCategory;
    }

    public String getProductKey() {
        return productKey;
    }

    public void setProductKey(String productKey) {
        this.productKey = productKey;
    }

    public String getRecipeId() {
        return recipeId;
    }

    public void setRecipeId(String recipeId) {
        this.recipeId = recipeId;
    }

    public String getPolicy() {
        return policy;
    }

    public void setPolicy(String policy) {
        this.policy = policy;
    }

    public String getCriteria() {
        return criteria;
    }

    public void setCriteria(String criteria) {
        this.criteria = criteria;
    }
}
