package com.studyhub.exception;


import com.studyhub.utill.BaseException;

public class RefreshTokenExpiredException extends BaseException {
  public static final String MESSAGE = "리프레시 토큰이 만료되었습니다.";

  public RefreshTokenExpiredException() {
    super(MESSAGE);
  }
}
