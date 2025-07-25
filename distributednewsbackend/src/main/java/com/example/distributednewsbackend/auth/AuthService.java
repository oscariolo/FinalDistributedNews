package com.example.distributednewsbackend.auth;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.distributednewsbackend.model.Role;
import com.example.distributednewsbackend.model.User;
import com.example.distributednewsbackend.repository.UserRepository;
import com.example.distributednewsbackend.services.JwtService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthService {

  private final UserRepository userRepository;
  private final JwtService jwtService;
  private final PasswordEncoder passwordEncoder;
  private final AuthenticationManager authenticationManager;

  public AuthResponse login(LoginRequest request) {
    authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(request.getUsername(),request.getPassword()));
    UserDetails user = userRepository.findByUsername(request.getUsername()).orElseThrow();
    String token = jwtService.getToken(user);
    return AuthResponse.builder()
      .token(token)
      .build();
  }

  public AuthResponse register (RegisterRequest request) {
    User user = User.builder()
      .username(request.getUsername())
      .password(passwordEncoder.encode(request.getPassword()))
      .name(request.getName())
      .email(request.getEmail())
      .birthday(request.getBirthday())
      .role(Role.USER)
      .subs(request.getSubs())
      .build();

    userRepository.save(user);

    return AuthResponse.builder()
      .token(jwtService.getToken(user))
      .build();
  }

}
