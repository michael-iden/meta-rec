package com.magnetic.metarec;

/**
 * Created by dwhitesell on 4/20/16.
 */
public enum PAGE_TYPES {

    HOME("h"),
    HIGH_LEVEL_CATEGORY("hcat"),
    CATEGORY("cat"),
    PRODUCT_DETAILS("prod"),
    SHOPPING_CART("cart"),
    SEARCH_RESULTS("ks"),
    BRAND_HOME("bh"),
    NEW("np"),
    SALE("sale"),
    LANDING_PAGE("lnd"),
    CONTENT_ITEM("ci"),
    MY_PAGE("myp"),
    RATINGS("rate"),
    ADD_TO_CART("cartadd"),
    ORDER_CONFIRMATION("purchase");

    private final String _value;

    PAGE_TYPES(String value)
    {
        _value = value;
    }

    public String Value()
    {
        return _value;
    }
}
