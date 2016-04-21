package com.magnetic.metarec.repository;

import com.magnetic.metarec.domain.reporting.ResponseParameters;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 *repository for response parameters we're interested in
 */
public interface ResponseParameterRepository extends JpaRepository<ResponseParameters,Long> {
}
