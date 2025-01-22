package com.example.npds.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import com.example.npds.service.UserService;
import com.example.npds.entity.User;
import org.springframework.web.bind.annotation.*;
import com.example.npds.util.JwtUtil;



@RestController
@CrossOrigin(origins = "http://localhost:3000") // React의 URL 허용
@RequestMapping("/auth")
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private JwtUtil jwtUtil;

    @PostMapping("/create")
    public User createUser(@RequestBody User user) {        
        return userService.saveUser(user);
    }
    
    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody User loginRequest) {
        String email = loginRequest.getEmail();
        String password = loginRequest.getPassword();
   
    
        User user = userService.findByEmail(email);
        if (user == null || !userService.checkPassword(password, user.getPassword())) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body("이메일 또는 비밀번호가 잘못되었습니다.");
        }
        String token = jwtUtil.generateToken(user.getId(), user.getName());
        return ResponseEntity.ok(new AuthResponse(token, user.getId()));
    }
}