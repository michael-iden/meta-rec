package com.magnetic.metarec.service;

import org.springframework.stereotype.Component;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

/**
 * Created by kraja on 4/20/16.
 */
@Component
public class ClientServiceImpl implements ClientService {


    public List<String> getClientsActiveOnWebrec()
    {
        List<String> clientNames = new ArrayList<String>();

        try {
            Class.forName("oracle.jdbc.driver.OracleDriver");
            String url = "jdbc:oracle:thin:@oracle.aws-qa.mybuystest.com:1521:DEVQA";
            Connection conn = DriverManager.getConnection(url,"qa","password");
            Statement stmt = conn.createStatement();
            ResultSet rs;

            rs = stmt.executeQuery("select identifier from rm_client where web_status='ACTIVE' OR web_status='PREP'");
            while ( rs.next() ) {
                clientNames.add(rs.getString(1));
            }
            conn.close();
        } catch (Exception e) {
            System.err.println("Got an exception! ");
            System.err.println(e.getMessage());

        }

        return clientNames;
    }
}
