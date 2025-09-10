package com.studyhub.user.mapper;

import com.studyhub.user.dto.UserDto;
import org.apache.ibatis.annotations.Mapper;



@Mapper
public interface UserMapper {
    int existsByEmail(String email);
    int existsByNickname(String nickname);
    void signup(UserDto userDto);
    UserDto findByNickname(String nickname);
    UserDto findByEmail(String email);

}
