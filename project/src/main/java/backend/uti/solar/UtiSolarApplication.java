package backend.uti.solar;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@ComponentScan("backend")
@EnableJpaRepositories("backend.repository")
public class UtiSolarApplication {

	public static void main(String[] args) {
		SpringApplication.run(UtiSolarApplication.class, args);
	}

}
