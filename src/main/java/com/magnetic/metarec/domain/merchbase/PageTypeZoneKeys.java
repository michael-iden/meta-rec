package com.magnetic.metarec.domain.merchbase;

import com.magnetic.metarec.PageType;

import java.util.List;

/**
 *
 */

public class PageTypeZoneKeys {



    private String client;
    private PageType pageType;
    private List<Integer> zoneNumbers;

    public PageTypeZoneKeys(String client, PageType pageType, List<Integer> zoneNumbers) {
        this.client = client;
        this.pageType = pageType;
        this.zoneNumbers = zoneNumbers;
    }

    public String getClient() {
        return client;
    }

    public PageType getPageType() {
        return pageType;
    }

    public List<Integer> getZoneNumbers() {
        return zoneNumbers;
    }


}
