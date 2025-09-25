package com.studyhub.user.service;


import com.studyhub.config.CustomUserDetails;
import com.studyhub.user.dto.UserDto;
import com.studyhub.user.mapper.UserMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;


@Service
@RequiredArgsConstructor
public class UserService {

    private final UserMapper userMapper;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;

    public void signup(UserDto userDTO) {
        if (userMapper.existsByEmail(userDTO.getEmail()) > 0) {
            throw new DataIntegrityViolationException("이미 존재하는 이메일입니다.");
        }

        if (userMapper.existsByNickname(userDTO.getNickname()) > 0) {
            throw new DataIntegrityViolationException("이미 존재하는 닉네임입니다.");
        }

        UserDto encodedUserDto = userDTO.toBuilder()
                .password(bCryptPasswordEncoder.encode(userDTO.getPassword()))
                .build();


        userMapper.signup(encodedUserDto);
    }
}
