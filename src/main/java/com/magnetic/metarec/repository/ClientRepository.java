package com.magnetic.metarec.repository;

import com.magnetic.metarec.domain.Client;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * Spring Data JPA repository for the Recipe entity.
 */
public interface ClientRepository extends JpaRepository<Client,Long> {

}
