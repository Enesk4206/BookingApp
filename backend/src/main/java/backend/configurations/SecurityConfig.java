package backend.configurations;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import backend.components.JwtFilter;
import backend.services.CustomUserService;
import lombok.RequiredArgsConstructor;

@Configuration
@RequiredArgsConstructor
public class SecurityConfig {
    private final CustomUserService customUserService;
    private final JwtFilter jwtFilter;

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception{
        
        http
        .cors()
        .and()
        .csrf(csrf ->csrf.disable())
        .sessionManagement(sess ->sess.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
        .authorizeHttpRequests(auth -> auth
            .requestMatchers(HttpMethod.POST, "/api/auth/create-owner").hasAnyRole("SUPERADMIN")
            .requestMatchers("/api/auth/**").permitAll()
            .requestMatchers(HttpMethod.POST, "/api/hotel/**").hasAnyRole("SUPERADMIN")
            .requestMatchers(HttpMethod.GET, "/api/hotel/**").hasAnyRole("SUPERADMIN")
            .requestMatchers(HttpMethod.DELETE, "/api/hotel/**").hasAnyRole("SUPERADMIN")
            .requestMatchers(HttpMethod.PUT, "/api/hotel/**").hasAnyRole("SUPERADMIN")
            .requestMatchers(HttpMethod.POST, "/api/room/**").hasAnyRole("SUPERADMIN","OWNER")
            .requestMatchers(HttpMethod.GET, "/api/room/**").hasAnyRole("SUPERADMIN","OWNER")
            .requestMatchers(HttpMethod.DELETE, "/api/room/**").hasAnyRole("SUPERADMIN","OWNER")
            .requestMatchers(HttpMethod.PUT, "/api/room/**").hasAnyRole("SUPERADMIN","OWNER")
            .requestMatchers(HttpMethod.POST, "/api/rezervation/**").hasAnyRole("SUPERADMIN","CUSTOMER")
            .requestMatchers(HttpMethod.GET, "/api/rezervation/**").hasAnyRole("SUPERADMIN","CUSTOMER")
            .requestMatchers(HttpMethod.DELETE, "/api/rezervation/**").hasAnyRole("SUPERADMIN","CUSTOMER")
            .requestMatchers(HttpMethod.PUT, "/api/rezervation/**").hasAnyRole("SUPERADMIN","CUSTOMER")
            .requestMatchers(HttpMethod.POST, "/api/category/**").hasAnyRole("SUPERADMIN")
            .requestMatchers(HttpMethod.GET, "/api/category/**").hasAnyRole("SUPERADMIN")
            .requestMatchers(HttpMethod.DELETE, "/api/category/**").hasAnyRole("SUPERADMIN")
            .requestMatchers(HttpMethod.PUT, "/api/category/**").hasAnyRole("SUPERADMIN")
            .anyRequest().authenticated()

        ).userDetailsService(customUserService).addFilterBefore(jwtFilter,UsernamePasswordAuthenticationFilter.class);
        return http.build();
    }

    @Bean
    public PasswordEncoder passwordEncoder(){
        return new BCryptPasswordEncoder();
    }

    @Bean
    public AuthenticationManager authenticationManager(HttpSecurity http) throws Exception{
        return http
        .getSharedObject(AuthenticationManagerBuilder.class)
        .userDetailsService(customUserService)
        .passwordEncoder(passwordEncoder())
        .and()
        .build();
    }
}
