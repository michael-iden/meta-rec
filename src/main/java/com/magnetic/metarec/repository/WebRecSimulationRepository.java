package com.magnetic.metarec.repository;

import com.magnetic.metarec.domain.WebRecSimulation;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * Spring Data JPA repository for the Recipe entity.
 */
public interface WebRecSimulationRepository extends JpaRepository<WebRecSimulation,Long> {

}
