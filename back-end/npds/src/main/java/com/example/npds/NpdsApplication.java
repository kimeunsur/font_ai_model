//brew services stop postgresql
//brew services start postgresql
//brew services list

package com.example.npds;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class NpdsApplication {

	public static void main(String[] args) {
		SpringApplication.run(NpdsApplication.class, args);
	}

}
