package com.studyhub.exception;


import com.studyhub.utill.BaseException;

public class InvalidRefreshTokenException extends BaseException {
    public static final String MESSAGE = "유효하지 않은 리프레시 토큰입니다.";

    public InvalidRefreshTokenException() {
        super(MESSAGE);
    }
}
