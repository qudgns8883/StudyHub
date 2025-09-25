package com.studyhub.exception;


import com.studyhub.utill.BaseException;

public class InvalidAccessTokenException extends BaseException {
  public static final String MESSAGE = "유효하지 않은 액세스 토큰입니다.";

  public InvalidAccessTokenException() {
    super(MESSAGE);
  }
}
