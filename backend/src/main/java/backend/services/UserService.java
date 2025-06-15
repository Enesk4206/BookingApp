package backend.services;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import backend.components.JwtUtil;
import backend.dtos.OwnerRegisterResponse;
import backend.dtos.UserLoginRequest;
import backend.dtos.UserLoginResponse;
import backend.dtos.UserRegisterRequest;
import backend.dtos.UserRegisterResponse;
import backend.models.Role;
import backend.models.User;
import backend.repositories.UserRepository;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    public UserRegisterResponse register(UserRegisterRequest request){
        if(request.getRole() != Role.CUSTOMER){
            throw new RuntimeException("Only customer can register!");
        }

        checkEmailAndUsernameUniqueness(request.getEmail(), request.getUsername());

        User user = new User();
        user.setUsername(request.getUsername());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setEmail(request.getEmail());
        user.setRole(Role.CUSTOMER);

        User registered = userRepository.save(user);

        UserDetails userDetails = org.springframework.security.core.userdetails.User
            .withUsername(registered.getUsername())
            .password(registered.getPassword())
            .roles(registered.getRole().name())
            .build();

        String token = jwtUtil.generateToken(userDetails);
        return new UserRegisterResponse(
            registered.getId(),
            registered.getUsername(),
            registered.getEmail(),
            // jwtUtil.generateToken(registered),
            token,
            registered.getRole()

        );
    }

    public OwnerRegisterResponse createOwner(UserRegisterRequest request){
        if(request.getRole() !=Role.OWNER){
            throw new RuntimeException("You can only create owner!");
        }

        checkEmailAndUsernameUniqueness(request.getEmail(), request.getUsername());

        User user = new User();
        user.setUsername(request.getUsername());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setEmail(request.getEmail());
        user.setRole(Role.OWNER);

        User registered = userRepository.save(user);
        return new OwnerRegisterResponse(
            registered.getId(),
            registered.getUsername(),
            registered.getEmail(),
            registered.getRole()

        );

    }

    public UserLoginResponse login(UserLoginRequest request){
        User user = userRepository.findByUsername(request.getUsername()).orElseThrow(
            () -> new RuntimeException("User not found")
        );
        
        if(!passwordEncoder.matches(request.getPassword(), user.getPassword())){
            throw new RuntimeException("Password isn't correct!");
        }
        UserDetails userDetails = org.springframework.security.core.userdetails.User
        .withUsername(user.getUsername())
        .password(user.getPassword())
        .roles(user.getRole().name())
        .build();
        String token = jwtUtil.generateToken(userDetails);


        return new UserLoginResponse(
            user.getId(),
            user.getUsername(),
            user.getEmail(),
            token
        );
    }

    private void checkEmailAndUsernameUniqueness(String email,String username){
        if(userRepository.existsByEmail(email)){
            throw new RuntimeException("Email already exists!");
        }
        if(userRepository.existsByUsername(username)){
            throw new RuntimeException("Username already exists!");
        }
    }
    
}
