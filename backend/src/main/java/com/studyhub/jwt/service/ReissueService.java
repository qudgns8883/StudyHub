package com.studyhub.jwt.service;


import com.studyhub.jwt.filter.JWTUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.TimeUnit;

@Service
@RequiredArgsConstructor
public class ReissueService {

    private final JWTUtil jwtUtil;
    private final RedisTemplate<String, String> redisTemplate;

    @Transactional
    public Map<String, String> reissueToken(String refreshToken) {

        String nickname = jwtUtil.getNickname(refreshToken);

        String storedToken = redisTemplate.opsForValue().get(nickname);

        if (storedToken == null || !storedToken.equals(refreshToken)) {
            throw new RuntimeException("Invalid refresh token");
        }

        String access = jwtUtil.createJwt("access", nickname, 50000L);
        String refresh = jwtUtil.createJwt("refresh", nickname, 86400000L);

        redisTemplate.opsForValue().set(nickname, refresh, 86400000L, TimeUnit.MILLISECONDS);

        Map<String, String> tokens = new HashMap<>();
        tokens.put("access", access);
        tokens.put("refresh", refresh);

        return tokens;
    }

}