package com.magnetic.metarec.dto.resource;

import com.magnetic.metarec.PageType;
import org.springframework.hateoas.ResourceSupport;
import org.springframework.hateoas.core.Relation;

/**
 *
 */
@Relation(value = "pageType", collectionRelation = "pageTypes")
public class PageTypeResource extends ResourceSupport {

    private String displayName;
    private PageType pageType;

    public String getDisplayName() {
        return displayName;
    }

    public void setDisplayName(String displayName) {
        this.displayName = displayName;
    }

    public PageType getPageType() {
        return pageType;
    }

    public void setPageType(PageType pageType) {
        this.pageType = pageType;
    }

}
