package com.magnetic.metarec.domain.merchbase;

import com.magnetic.metarec.PageType;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 *
 */
public class WebZoneKeyMap {

    private String client;
    private Map<PageType, PageTypeZoneKeys> pageTypeZoneKeysMap = new HashMap<PageType, PageTypeZoneKeys>();

    public WebZoneKeyMap(String client) {
        this.client = client;
    }

    public String getClient() {
        return client;
    }

    public void addPageTypeZoneKeys(PageTypeZoneKeys pageTypeZoneKeys) {

        pageTypeZoneKeysMap.put(pageTypeZoneKeys.getPageType(), pageTypeZoneKeys);
    }

    public List<PageTypeZoneKeys> getPageTypeZoneKeys() {
        return new ArrayList<>(pageTypeZoneKeysMap.values());
    }

    public List<Integer> getZoneKeysForPageType(PageType pageType) {
        return pageTypeZoneKeysMap.get(pageType).getZoneNumbers();
    }

}
