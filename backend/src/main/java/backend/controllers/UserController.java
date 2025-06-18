package backend.controllers;


import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import backend.dtos.OwnerRegisterResponse;
import backend.dtos.UserLoginRequest;
import backend.dtos.UserLoginResponse;
import backend.dtos.UserRegisterRequest;
import backend.dtos.UserRegisterResponse;
import backend.services.UserService;
import lombok.RequiredArgsConstructor;

@CrossOrigin(origins="http://localhost:5173")
@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;

    @PostMapping(value="/register")
    public ResponseEntity<UserRegisterResponse> registerAPI(@RequestBody UserRegisterRequest request){
        return ResponseEntity.status(HttpStatus.CREATED).body(userService.register(request));
    }
    @PostMapping(value="/create-owner")
    public ResponseEntity<OwnerRegisterResponse> createOwnerAPI(@RequestBody UserRegisterRequest request){
        return ResponseEntity.status(HttpStatus.CREATED).body(userService.createOwner(request));
    }
    @PostMapping(value="/login")
    public ResponseEntity<UserLoginResponse> loginAPI(@RequestBody UserLoginRequest request){
        return ResponseEntity.status(HttpStatus.CREATED).body(userService.login(request));
    }
    @GetMapping(value="/get-profile")
    public ResponseEntity<UserLoginResponse> getProfileAPI(@RequestHeader("Authorization") String authHeader){
        return ResponseEntity.status(HttpStatus.OK).body(userService.getProfile(authHeader));
    }
   
}
