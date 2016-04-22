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
    String customer_category;
    String recipe_id;
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

    public String getCustomer_category() {
        return customer_category;
    }

    public void setCustomer_category(String customer_category) {
        this.customer_category = customer_category;
    }

    public String getProductKey() {
        return productKey;
    }

    public void setProductKey(String productKey) {
        this.productKey = productKey;
    }

    public String getRecipe_id() {
        return recipe_id;
    }

    public void setRecipe_id(String recipe_id) {
        this.recipe_id = recipe_id;
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
