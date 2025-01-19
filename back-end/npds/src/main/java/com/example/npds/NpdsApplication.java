//brew services stop postgresql
//brew services start postgresql
//brew services list

package com.example.npds;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;

@SpringBootApplication(exclude = {DataSourceAutoConfiguration.class})
public class NpdsApplication {

	public static void main(String[] args) {
		SpringApplication.run(NpdsApplication.class, args);
	}

}
