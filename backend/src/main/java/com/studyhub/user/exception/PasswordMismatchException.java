package com.studyhub.user.exception;


import com.studyhub.utill.BaseException;

public class PasswordMismatchException extends BaseException {
    public static final String MESSAGE = "비밀번호가 일치하지 않습니다.";

    public PasswordMismatchException() {
        super(MESSAGE);
    }
}
