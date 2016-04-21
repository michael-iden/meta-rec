package com.magnetic.metarec.service;

import com.magnetic.metarec.config.OracleConfiguration;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

/**
 * Created by kraja on 4/20/16.
 */

@Service
public interface ClientService {

    public List<String> getClientsActiveOnWebrec();

}
