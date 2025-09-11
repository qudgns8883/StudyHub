package com.studyhub.user.controller;


import com.studyhub.config.CustomUserDetails;
import com.studyhub.user.dto.UserDto;
import com.studyhub.user.service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RestController
@RequestMapping("/users")
public class UserController {

    private final UserService userService;

    //회원가입
    @PostMapping("/signup")
    public ResponseEntity<Void> signup(@RequestBody @Valid UserDto userDTO) {
        userService.signup(userDTO);
        return ResponseEntity.ok().build();
    }

   //토큰으로 사용자 정보 조회
    @GetMapping
    public ResponseEntity<UserDto> localUserInfo(@AuthenticationPrincipal CustomUserDetails userDetails) {

        UserDto userInfo = userService.getUserInfo(userDetails.getUsername());
        return ResponseEntity.ok(userInfo);
    }
}
