package com.studyhub.utill;


import com.studyhub.config.CustomUserDetails;
import com.studyhub.user.dto.UserDto;
import com.studyhub.user.exception.UnauthorizedException;
import com.studyhub.user.mapper.UserMapper;
import com.studyhub.user.exception.UserNotFoundException;

import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class UserUtil {

    private final UserMapper userMapper;

    public Long getCurrentUserId() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null || !authentication.isAuthenticated()) {
            throw new UnauthorizedException();
        }

        Object principal = authentication.getPrincipal();
        if (principal instanceof CustomUserDetails) {
            return ((CustomUserDetails) principal).getId();
        }

        throw new UnauthorizedException();
    }

    public UserDto getCurrentUser() {
        Long userId = getCurrentUserId();
        return userMapper.findByUserId(userId)
                .orElseThrow(UserNotFoundException::new);
    }
}