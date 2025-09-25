package com.studyhub.user.exception;


import com.studyhub.utill.BaseException;

public class EmailDuplicateException extends BaseException {
    public static final String MESSAGE = "이미 사용 중인 이메일입니다.";

    public EmailDuplicateException() {
        super(MESSAGE);
    }
}
