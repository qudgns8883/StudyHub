package com.studyhub.exception;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public class ErrorResponse {
    private final String message; // 오류 메시지를 저장하는 필드

    // Exception 객체를 인자로 받는 생성자
    public ErrorResponse(Exception exception) {
        this.message = exception.getMessage(); // 예외의 메시지를 필드에 저장
    }
}
