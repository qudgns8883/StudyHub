package com.studyhub.user.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.*;

@Getter
@NoArgsConstructor
public class UserDto {

    private Long id;
    @NotBlank(message = "이메일은 필수입니다.")
    @Email(message = "유효한 이메일 형식이어야 합니다.")
    private String email;
    @NotBlank(message = "비밀번호는 필수입니다.")
    private String password;
    @NotBlank(message = "닉네임은 필수입니다.")
    private String nickname;
    private String createDate;

    @Builder(toBuilder = true)
    private UserDto(Long id, String nickname, String password, String email,
                      String createDate) {
        this.id = id;
        this.nickname = nickname;
        this.password = password;
        this.email = email;
        this.createDate = createDate;
    }

    public void updatePassword(String encodedPassword) {
        this.password = encodedPassword;
    }
}
