package com.spring.foodorder.Security;

import com.spring.foodorder.Documents.User;
import io.jsonwebtoken.Jwts;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.util.Date;

import static io.jsonwebtoken.security.Keys.hmacShaKeyFor;

@Service
public class JwtUtils {

    private final Long EXPIRATION_TIME = 3600000L * 24; // 24 hours in milliseconds

    private SecretKey key;

    @Value("${jwt.secret}")
    private String secretJwt;

    @PostConstruct
    public void init() {
        byte[] keyBytes = secretJwt.getBytes(StandardCharsets.UTF_8);
        key = hmacShaKeyFor(keyBytes);
    }

    public String generateToken(User user) {
        String username = user.getEmail();
        return generateToken(username);
    }

    public String generateToken(String username) {
        return Jwts.builder()
                .setSubject(username)
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME))
                .signWith(key)
                .compact();
    }

    public String getUsernameFromToken(String token) {
        return Jwts.parser()
                .verifyWith(key)
                .build()
                .parseSignedClaims(token)
                .getBody()
                .getSubject();
    }

    public boolean isTokenValid(String token, User user) {
        String username = getUsernameFromToken(token);
        return username.equals(user.getEmail()) && !isTokenExpired(token);
    }

    public boolean isTokenExpired(String token) {
        Date expirationDate = Jwts.parser()
                .verifyWith(key)
                .build()
                .parseSignedClaims(token)
                .getBody()
                .getExpiration();
        return expirationDate.before(new Date());
    }
}
