package com.magnetic.metarec.web.rest;

import com.magnetic.metarec.MetaRecApp;
import com.magnetic.metarec.domain.Recipe;
import com.magnetic.metarec.repository.RecipeRepository;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import static org.hamcrest.Matchers.hasItem;
import org.mockito.MockitoAnnotations;
import org.springframework.boot.test.IntegrationTest;
import org.springframework.boot.test.SpringApplicationConfiguration;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.test.util.ReflectionTestUtils;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.PostConstruct;
import javax.inject.Inject;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;


/**
 * Test class for the RecipeResource REST controller.
 *
 * @see RecipeResource
 */
@RunWith(SpringJUnit4ClassRunner.class)
@SpringApplicationConfiguration(classes = MetaRecApp.class)
@WebAppConfiguration
@IntegrationTest
public class RecipeResourceIntTest {

    private static final String DEFAULT_RECIPE_NAME = "AAAAA";
    private static final String UPDATED_RECIPE_NAME = "BBBBB";

    @Inject
    private RecipeRepository recipeRepository;

    @Inject
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Inject
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    private MockMvc restRecipeMockMvc;

    private Recipe recipe;

    @PostConstruct
    public void setup() {
        MockitoAnnotations.initMocks(this);
        RecipeResource recipeResource = new RecipeResource();
        ReflectionTestUtils.setField(recipeResource, "recipeRepository", recipeRepository);
        this.restRecipeMockMvc = MockMvcBuilders.standaloneSetup(recipeResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setMessageConverters(jacksonMessageConverter).build();
    }

    @Before
    public void initTest() {
        recipe = new Recipe();
        recipe.setRecipeName(DEFAULT_RECIPE_NAME);
    }

    @Test
    @Transactional
    public void createRecipe() throws Exception {
        int databaseSizeBeforeCreate = recipeRepository.findAll().size();

        // Create the Recipe

        restRecipeMockMvc.perform(post("/api/recipes")
                .contentType(TestUtil.APPLICATION_JSON_UTF8)
                .content(TestUtil.convertObjectToJsonBytes(recipe)))
                .andExpect(status().isCreated());

        // Validate the Recipe in the database
        List<Recipe> recipes = recipeRepository.findAll();
        assertThat(recipes).hasSize(databaseSizeBeforeCreate + 1);
        Recipe testRecipe = recipes.get(recipes.size() - 1);
        assertThat(testRecipe.getRecipeName()).isEqualTo(DEFAULT_RECIPE_NAME);
    }

    @Test
    @Transactional
    public void getAllRecipes() throws Exception {
        // Initialize the database
        recipeRepository.saveAndFlush(recipe);

        // Get all the recipes
        restRecipeMockMvc.perform(get("/api/recipes?sort=id,desc"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$.[*].id").value(hasItem(recipe.getId().intValue())))
                .andExpect(jsonPath("$.[*].recipe_name").value(hasItem(DEFAULT_RECIPE_NAME.toString())));
    }

    @Test
    @Transactional
    public void getRecipe() throws Exception {
        // Initialize the database
        recipeRepository.saveAndFlush(recipe);

        // Get the recipe
        restRecipeMockMvc.perform(get("/api/recipes/{id}", recipe.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON))
            .andExpect(jsonPath("$.id").value(recipe.getId().intValue()))
            .andExpect(jsonPath("$.recipe_name").value(DEFAULT_RECIPE_NAME.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingRecipe() throws Exception {
        // Get the recipe
        restRecipeMockMvc.perform(get("/api/recipes/{id}", Long.MAX_VALUE))
                .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateRecipe() throws Exception {
        // Initialize the database
        recipeRepository.saveAndFlush(recipe);
        int databaseSizeBeforeUpdate = recipeRepository.findAll().size();

        // Update the recipe
        Recipe updatedRecipe = new Recipe();
        updatedRecipe.setId(recipe.getId());
        updatedRecipe.setRecipeName(UPDATED_RECIPE_NAME);

        restRecipeMockMvc.perform(put("/api/recipes")
                .contentType(TestUtil.APPLICATION_JSON_UTF8)
                .content(TestUtil.convertObjectToJsonBytes(updatedRecipe)))
                .andExpect(status().isOk());

        // Validate the Recipe in the database
        List<Recipe> recipes = recipeRepository.findAll();
        assertThat(recipes).hasSize(databaseSizeBeforeUpdate);
        Recipe testRecipe = recipes.get(recipes.size() - 1);
        assertThat(testRecipe.getRecipeName()).isEqualTo(UPDATED_RECIPE_NAME);
    }

    @Test
    @Transactional
    public void deleteRecipe() throws Exception {
        // Initialize the database
        recipeRepository.saveAndFlush(recipe);
        int databaseSizeBeforeDelete = recipeRepository.findAll().size();

        // Get the recipe
        restRecipeMockMvc.perform(delete("/api/recipes/{id}", recipe.getId())
                .accept(TestUtil.APPLICATION_JSON_UTF8))
                .andExpect(status().isOk());

        // Validate the database is empty
        List<Recipe> recipes = recipeRepository.findAll();
        assertThat(recipes).hasSize(databaseSizeBeforeDelete - 1);
    }
}
