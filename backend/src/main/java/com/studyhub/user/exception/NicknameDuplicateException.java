package com.studyhub.user.exception;


import com.studyhub.utill.BaseException;

public class NicknameDuplicateException extends BaseException {
    public static final String MESSAGE = "이미 사용 중인 닉네임입니다.";

    public NicknameDuplicateException() {
        super(MESSAGE);
    }
}
