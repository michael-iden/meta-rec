package com.magnetic.metarec.repository;

import com.magnetic.metarec.domain.reporting.Simulation;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * Spring Data JPA repository for the Recipe entity.
 */
public interface SimulationRepository extends JpaRepository<Simulation,Long> {

}
