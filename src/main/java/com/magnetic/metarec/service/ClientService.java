package com.magnetic.metarec.service;

import com.magnetic.metarec.domain.Client;
import com.magnetic.metarec.repository.ClientRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Profile;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import javax.inject.Inject;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

/**
 * Created by kraja on 4/20/16.
 */

@Service
public class ClientService {


    @Value("${jdbc.url}")
    String url;

    @Value("${jdbc.username}")
    String username;

    @Value("${jdbc.password}")
    String password;

    @Inject
    private ClientRepository clientRepository;


    @PostConstruct
    @Profile("dev")
    @Scheduled(fixedRate = 300000)
    public void writeActiveClientsToH2() {
        List<Client> clients = getClientsActiveOnWebrec();

        clientRepository.save(clients);
    }

    private List<Client> getClientsActiveOnWebrec() {
        List<Client> clients = new ArrayList<>();

        try {
            Class.forName("oracle.jdbc.driver.OracleDriver");
            Connection conn = DriverManager.getConnection(url, username, password);
            Statement stmt = conn.createStatement();
            ResultSet rs;

            rs = stmt.executeQuery("select identifier from rm_client where web_status='ACTIVE' OR web_status='PREP' order by identifier");
            while ( rs.next() ) {
                if(rs.getString(1) != null) {
                    clients.add(new Client(rs.getString(1)));
                }
            }
            conn.close();
        } catch (Exception e) {
            System.err.println("Got an exception! ");
            System.err.println(e.getMessage());
        }

        return clients;
    }

    public List<Client> getClientsActiveOnWebRecLocal() {
        return clientRepository.findAll().stream()
            .sorted((object1, object2) -> object1.getClientIdentifier().compareTo(object2.getClientIdentifier())).collect(Collectors.toList());
    }


}
