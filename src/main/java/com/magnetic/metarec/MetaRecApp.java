package com.magnetic.metarec;

import com.magnetic.metarec.config.Constants;
import com.magnetic.metarec.config.JHipsterProperties;
import com.magnetic.metarec.service.MerchBaseService;
import groovy.util.logging.Slf4j;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.actuate.autoconfigure.MetricFilterAutoConfiguration;
import org.springframework.boot.actuate.autoconfigure.MetricRepositoryAutoConfiguration;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.liquibase.LiquibaseProperties;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.core.env.Environment;
import org.springframework.core.env.SimpleCommandLinePropertySource;
import retrofit.JacksonConverterFactory;
import retrofit.Retrofit;

import javax.annotation.PostConstruct;
import javax.inject.Inject;
import javax.net.ssl.HostnameVerifier;
import java.net.InetAddress;
import java.net.UnknownHostException;
import java.util.Arrays;
import java.util.Collection;
import java.util.concurrent.TimeUnit;

@Slf4j
@ComponentScan
@EnableAutoConfiguration(exclude = { MetricFilterAutoConfiguration.class, MetricRepositoryAutoConfiguration.class })
@EnableConfigurationProperties({ JHipsterProperties.class, LiquibaseProperties.class })
public class MetaRecApp {

    private static final Logger log = LoggerFactory.getLogger(MetaRecApp.class);

    @Inject
    private Environment env;

    @Value("${integration.server.url}")
    private String integrationServerUrl;

    /**
     * Initializes MetaRec.
     * <p>
     * Spring profiles can be configured with a program arguments --spring.profiles.active=your-active-profile
     * <p>
     * You can find more information on how profiles work with JHipster on <a href="http://jhipster.github.io/profiles/">http://jhipster.github.io/profiles/</a>.
     */
    @PostConstruct
    public void initApplication() {
        if (env.getActiveProfiles().length == 0) {
            log.warn("No Spring profile configured, running with default configuration");
        } else {
            log.info("Running with Spring profile(s) : {}", Arrays.toString(env.getActiveProfiles()));
            Collection<String> activeProfiles = Arrays.asList(env.getActiveProfiles());
            if (activeProfiles.contains(Constants.SPRING_PROFILE_DEVELOPMENT) && activeProfiles.contains(Constants.SPRING_PROFILE_PRODUCTION)) {
                log.error("You have misconfigured your application! " +
                    "It should not run with both the 'dev' and 'prod' profiles at the same time.");
            }
            if (activeProfiles.contains(Constants.SPRING_PROFILE_DEVELOPMENT) && activeProfiles.contains(Constants.SPRING_PROFILE_CLOUD)) {
                log.error("You have misconfigured your application! " +
                    "It should not run with both the 'dev' and 'cloud' profiles at the same time.");
            }
        }
    }

    /**
     * Main method, used to run the application.
     *
     * @param args the command line arguments
     * @throws UnknownHostException if the local host name could not be resolved into an address
     */
    public static void main(String[] args) throws UnknownHostException {
        SpringApplication app = new SpringApplication(MetaRecApp.class);
        SimpleCommandLinePropertySource source = new SimpleCommandLinePropertySource(args);
        addDefaultProfile(app, source);
        Environment env = app.run(args).getEnvironment();
        log.info("\n----------------------------------------------------------\n\t" +
                "Application '{}' is running! Access URLs:\n\t" +
                "Local: \t\thttp://127.0.0.1:{}\n\t" +
                "External: \thttp://{}:{}\n----------------------------------------------------------",
            env.getProperty("spring.application.name"),
            env.getProperty("server.port"),
            InetAddress.getLocalHost().getHostAddress(),
            env.getProperty("server.port"));

    }

    /**
     * If no profile has been configured, set by default the "dev" profile.
     */
    private static void addDefaultProfile(SpringApplication app, SimpleCommandLinePropertySource source) {
        if (!source.containsProperty("spring.profiles.active") &&
                !System.getenv().containsKey("SPRING_PROFILES_ACTIVE")) {

            app.setAdditionalProfiles(Constants.SPRING_PROFILE_DEVELOPMENT);
        }
    }

    @Bean
    public MerchBaseService merchBaseService() {
        Retrofit retrofit = new Retrofit.Builder()
            .baseUrl(integrationServerUrl)
            .addConverterFactory(JacksonConverterFactory.create())
            .build();

        retrofit.client().setHostnameVerifier(nullHostnameVerifier());
        retrofit.client().setReadTimeout(1L, TimeUnit.MINUTES); // increase timeout to 1 min.

        return retrofit.create(MerchBaseService.class);
    }

    @Bean
    public HostnameVerifier nullHostnameVerifier() {
        return (hostname, sslSession) -> {
            log.info(String.format("Verifying hostname %s", hostname));
            return true;
        };
    }
}
