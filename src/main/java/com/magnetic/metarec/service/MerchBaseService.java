package com.magnetic.metarec.service;

import com.magnetic.siterex.integration.dto.ClientInfoDto;
import com.magnetic.siterex.integration.dto.WebZoneKeyMapDto;
import retrofit.Call;
import retrofit.http.GET;
import retrofit.http.Path;

/**
 *
 */
public interface MerchBaseService {

//    @GET("/monitoring/health")
//    Call<SiteRexIntegrationHealthIndicator.IntegrationHealthDto> getHealth();

    @GET("/{clientIdentifier}")
    Call<ClientInfoDto> getClientInfo(@Path("clientIdentifier") String clientIdentifier);

    @GET("/{clientIdentifier}/webZoneKeyMap")
    Call<WebZoneKeyMapDto> getWebZoneKeyMap(@Path("clientIdentifier") String clientIdentifier);
}
