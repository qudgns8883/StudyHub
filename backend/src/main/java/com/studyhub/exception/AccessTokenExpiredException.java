package com.studyhub.exception;


import com.studyhub.utill.BaseException;

public class AccessTokenExpiredException extends BaseException {
    public static final String MESSAGE = "엑세스 토큰이 만료되었습니다.";

    public AccessTokenExpiredException() {
        super(MESSAGE);
    }
}
