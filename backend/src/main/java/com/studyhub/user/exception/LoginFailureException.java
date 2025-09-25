package com.studyhub.user.exception;


import com.studyhub.utill.BaseException;

public class LoginFailureException extends BaseException {
    public static final String MESSAGE = "로그인 실패: 비밀번호가 틀립니다.";

    public LoginFailureException() {
        super(MESSAGE);
    }
}
