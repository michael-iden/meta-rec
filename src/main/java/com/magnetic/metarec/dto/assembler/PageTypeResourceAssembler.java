package com.magnetic.metarec.dto.assembler;

import com.magnetic.metarec.domain.merchbase.PageTypeZoneKeys;
import com.magnetic.metarec.dto.resource.PageTypeResource;
import com.magnetic.metarec.web.rest.controller.PageTypeController;
import com.magnetic.metarec.web.rest.controller.ZoneController;
import org.springframework.hateoas.mvc.ResourceAssemblerSupport;
import org.springframework.stereotype.Component;

import static org.springframework.hateoas.core.DummyInvocationUtils.methodOn;
import static org.springframework.hateoas.mvc.ControllerLinkBuilder.linkTo;


/**
 *
 */
@Component
public class PageTypeResourceAssembler extends ResourceAssemblerSupport<PageTypeZoneKeys, PageTypeResource> {
    public PageTypeResourceAssembler() {
        super(PageTypeController.class, PageTypeResource.class);
    }

    @Override
    public PageTypeResource toResource(PageTypeZoneKeys pageTypeZoneKeys)
    {

        PageTypeResource resource = instantiateResource(pageTypeZoneKeys);

        resource.add(linkTo(methodOn(ZoneController.class, pageTypeZoneKeys.getClient(),
            pageTypeZoneKeys.getPageType()).getZones(pageTypeZoneKeys.getClient(), pageTypeZoneKeys.getPageType())).withRel("zones"));

        return resource;
    }

    @Override
    protected PageTypeResource instantiateResource(PageTypeZoneKeys pageTypeZoneKeys) {
        PageTypeResource resource = new PageTypeResource();
        resource.setDisplayName(pageTypeZoneKeys.getPageType().getDisplayName());
        resource.setPageType(pageTypeZoneKeys.getPageType());

        return resource;
    }
}
