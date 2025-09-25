package com.studyhub.user.exception;


import com.studyhub.utill.BaseException;

public class UserNotFoundException extends BaseException {
    public static final String MESSAGE = "사용자를 찾을 수 없습니다.";

    public UserNotFoundException() {
        super(MESSAGE);
    }
}
