package com.magnetic.metarec;

import org.apache.commons.lang3.text.WordUtils;

/**
 * Created by dwhitesell on 4/20/16.
 */
public enum PageType {
    HOME("HOME", "h", "Home", "Home", 4057),
    PRODUCT_DETAILS("PRODUCT_DETAILS", "prod", "Product Details", "Product Detail", 4052),
    SHOPPING_CART("SHOPPING_CART", "cart", "Shopping Cart", "Cart", 4054),
    ORDER_CONFIRMATION("ORDER_CONFIRMATION", "purchase", "Order Confirmation", "Order Confirmation", 4053),
    CATEGORY("CATEGORY", "cat", "Category", "Category", 4051),
    SEARCH_RESULTS("SEARCH_RESULTS", "ks", "Search Results", "Search Results", 4056),
    SALE("SALE", "sale", "Sale", "Sale", 4058),
    NEW("NEW", "np", "New Product", "New Arrivals", 4055),
    BRAND("BRAND", "brand", "Brand", "Brand", 4059),
    BRAND_HOME("BRAND_HOME", "bh", "Brand Home", "Brand", 4061),
    HIGH_LEVEL_CATEGORY("HIGH_LEVEL_CATEGORY", "hcat", "High-Level Category", "High-Level Category", 4060),
    TOP_LEVEL_CATEGORY("TOP_LEVEL_CATEGORY", "tcat", "Top-Level Category", "High-Level Category", 23),
    LANDING("LANDING", "lnd", "Landing", "Landing", 4062),
    CONTENT_ITEM("CONTENT_ITEM", "ci", "Content Item", "Other", 14),
    CONTENT_CATEGORY("CONTENT_CATEGORY", "cc", "Content Category", "Category", 24),
    MY_PAGE("MY_PAGE", "myp", "My Page", "Other", 15),
    ADD_TO_CART("ADD_TO_CART", "cartadd", "Add to Cart", "Add-to-Cart", 17),
    RATINGS("RATINGS", "rate", "Ratings", "Ratings", 16);

    private String name;
    private String key;
    private String displayName;
    private String camelCaseDisplayName;
    private String salesforceDisplayName;
    private int merchBaseId;

    PageType(String name, String key, String displayName, String salesforceDisplayName, int merchBaseId) {
        this.name = name;
        this.key = key;
        this.displayName = displayName;
        this.camelCaseDisplayName = WordUtils.uncapitalize(WordUtils.capitalizeFully(displayName, ' ', '-').replaceAll("\\s+|-", ""));
        this.salesforceDisplayName = salesforceDisplayName;
        this.merchBaseId = merchBaseId;
    }

    public String getName() {
        return name;
    }

    public String getKey() {
        return key;
    }

    public String getDisplayName() {
        return displayName;
    }

    public String getCamelCaseDisplayName() {
        return camelCaseDisplayName;
    }

    public String getSalesforceDisplayName() {
        return salesforceDisplayName;
    }

    public Integer getMerchBaseId() {
        return merchBaseId;
    }

    public static PageType getPageTypeFromSalesforce(String salesforceDisplayName) throws IllegalArgumentException {
        for (PageType pageType : values()) {
            if (pageType.getSalesforceDisplayName().equals(salesforceDisplayName)) {
                return pageType;
            }
        }

        throw new IllegalArgumentException("Unable to get page type from Salesforce name:" + salesforceDisplayName);
    }

    public static PageType getPageTypeFromKey(String key) throws IllegalArgumentException {
        for (PageType pageType : values()) {
            if (pageType.getKey().equals(key)) {
                return pageType;
            }
        }

        throw new IllegalArgumentException("Unable to get page type from key:" + key);
    }

    public static PageType getPageTypeKeyFromDisplayName(String displayName) throws IllegalArgumentException {
        for (PageType pageType : values()) {
            if (pageType.getDisplayName().equals(displayName)) {
                return pageType;
            }
        }
        throw new IllegalArgumentException("Unable to get page type from displayName:" + displayName);
    }
}
