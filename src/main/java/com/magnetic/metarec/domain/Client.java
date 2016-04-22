package com.magnetic.metarec.domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 *
 */

@Entity
@Table(name = "client")
public class Client {

    @Id
    @Column(name = "client_identifier")
    private String clientIdentifier;

    public Client() {}

    public Client(String clientIdentifier) {
        this.clientIdentifier = clientIdentifier;
    }

    public String getClientIdentifier() {
        return this.clientIdentifier;
    }

    public void setClientIdentifier(String clientIdentifier) {
        this.clientIdentifier = clientIdentifier;
    }




}
