package com.example.distributednewsbackend.services;

import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

import javax.crypto.SecretKey;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;

@Service
public class JwtService {

  private final Key secretKey;

  // Inyectamos la propiedad y la usamos para construir la Key
  public JwtService(@Value("${jwt.secret}") String jwtSecret) {
    byte[] keyBytes = Decoders.BASE64.decode(jwtSecret);
    this.secretKey = Keys.hmacShaKeyFor(keyBytes);
  }

  public String getToken(UserDetails user) {
    return getToken(new HashMap<>(), user);
  }

  private String getToken(Map<String, Object> extraClaims, UserDetails user) {
    long now = System.currentTimeMillis();
    long expiration = now + 1000 * 60 * 60 * 24; // 24 horas
    
    return Jwts.builder()
        .header()
          .type("JWT")
        .and()
        .claims()
          .subject(user.getUsername())
          .issuedAt(new Date(now))
          .expiration(new Date(expiration))
          .add(extraClaims)
        .and()
        .signWith(secretKey)
        .compact();
  }

  public String getUsernameFromToken(String token) {
    return getClaim(token, Claims::getSubject);
  }

  public boolean isTokenValid(String token, UserDetails userDetails) {
    final String username = getUsernameFromToken(token);
    return (username.equals(userDetails.getUsername()) && !isTokenExpired(token));
  }

  private Claims getAllClaims(String token){
    return Jwts.parser()
      .verifyWith((SecretKey) secretKey) 
      .build() 
      .parseSignedClaims(token) 
      .getPayload(); 
  }

  public <T> T getClaim(String token, Function<Claims,T> claimsResolver){
    final Claims claims = getAllClaims(token);
    return claimsResolver.apply(claims);
  }

  private Date getExpiration (String token){
    return getClaim(token, Claims::getExpiration);
  }

  private boolean isTokenExpired(String token){
    return getExpiration(token).before(new Date());
  }
}
