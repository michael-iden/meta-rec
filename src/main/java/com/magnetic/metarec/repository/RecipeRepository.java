package com.magnetic.metarec.repository;

import com.magnetic.metarec.domain.Recipe;

import org.springframework.data.jpa.repository.*;

import java.util.List;

/**
 * Spring Data JPA repository for the Recipe entity.
 */
public interface RecipeRepository extends JpaRepository<Recipe,Long> {

}
