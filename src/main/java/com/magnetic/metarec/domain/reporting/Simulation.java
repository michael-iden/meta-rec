package com.magnetic.metarec.domain.reporting;

import javax.persistence.*;
import java.time.LocalDateTime;

/**
 *
 */
@Entity
@Table
public class Simulation {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;

    private String client;

    @Column(name = "simulation_timestamp")
    private LocalDateTime simulationTimestamp;

    public Simulation() {

    }

    public Simulation(int id, String client, LocalDateTime localDateTime) {

        this.id = id;
        this.client = client;
        this.simulationTimestamp = localDateTime;
    }

    public int getId( ) {
        return id;
    }

    public void getId(int id) {
        this.id = id;
    }

    public String getClient() {
        return client;
    }

    public void setClient(String client) {
        this.client = client;
    }

    public LocalDateTime getLocalDateTime() {
        return simulationTimestamp;
    }

    public void setLocalDateTime(LocalDateTime localDateTime) {
        this.simulationTimestamp = localDateTime;
    }

}
