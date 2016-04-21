package com.magnetic.metarec.service;

import com.magnetic.metarec.PageType;
import com.magnetic.metarec.domain.merchbase.PageTypeZoneKeys;
import com.magnetic.metarec.domain.merchbase.WebZoneKeyMap;
import com.magnetic.siterex.integration.dto.WebZoneKeyMapDto;
import org.springframework.stereotype.Service;

import javax.inject.Inject;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;

/**
 *
 */

@Service
public class WebRecConfigService {

    @Inject
    private MerchBaseService merchBaseService;

    public WebZoneKeyMap getWebZoneKeyMap(String client) throws IOException {
        WebZoneKeyMapDto webZoneKeyMapDto = merchBaseService.getWebZoneKeyMap(client).execute().body();
        Map<String, Map<String, String>> primitiveWebZoneKeyMap = webZoneKeyMapDto.getWebZoneKeyMap();

        WebZoneKeyMap webZoneKeyMap = new WebZoneKeyMap(client);
        for(Entry<String, Map<String, String>> pageTypeEntry : primitiveWebZoneKeyMap.entrySet()) {
            PageType pageType = PageType.getPageTypeFromKey(pageTypeEntry.getKey());

            List<Integer> zoneKeys = new ArrayList<>();
            pageTypeEntry.getValue().keySet().forEach(zoneKey -> zoneKeys.add(Integer.parseInt(zoneKey)));

            webZoneKeyMap.addPageTypeZoneKeys(new PageTypeZoneKeys(client, pageType, zoneKeys));
        }

        return webZoneKeyMap;
    }

    public List<PageTypeZoneKeys> getPageTypeZoneKeys(String client) throws IOException {
        return getWebZoneKeyMap(client).getPageTypeZoneKeys();
    }

    public List<Integer> getZoneIdsForPageType(String client, PageType pageType) throws IOException {
        return getWebZoneKeyMap(client).getZoneKeysForPageType(pageType);
    }

}
