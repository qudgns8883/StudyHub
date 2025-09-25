package com.studyhub.user.exception;

import com.studyhub.utill.BaseException;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.UNAUTHORIZED)
public class UnauthorizedException extends BaseException {
    public static final String MESSAGE = "사용자 인증이 필요합니다.";

    public UnauthorizedException() {
        super(MESSAGE);
    }
}
