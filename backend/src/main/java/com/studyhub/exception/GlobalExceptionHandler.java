package com.studyhub.exception;

import com.studyhub.utill.BaseException;
import jakarta.validation.ConstraintViolationException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.stream.Collectors;

@RestControllerAdvice
public class GlobalExceptionHandler {

    // 예상치 못한 에러 메시지
    private static final String UNEXPECTED_ERROR_MESSAGE = "예상치 못한 에러입니다. 백엔드에 문의해주세요.";

    // BaseException 예외를 처리하는 메소드
    @ExceptionHandler(BaseException.class)
    public ResponseEntity<ErrorResponse> exceptError(BaseException exception) {
        return ResponseEntity.badRequest().body(new ErrorResponse(exception));
    }

    // @Valid @RequestBody 유효성 검증 실패 시
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ErrorResponse> handleValidationExceptions(MethodArgumentNotValidException exception) {
        return ResponseEntity.badRequest().body(new ErrorResponse(
                exception.getBindingResult().getFieldErrors().stream()
                        .map(error -> error.getField() + ": " + error.getDefaultMessage())
                        .collect(Collectors.joining(", "))));
    }

    // @Validated + @RequestParam, @PathVariable 제약조건 실패 시
    @ExceptionHandler(ConstraintViolationException.class)
    public ResponseEntity<ErrorResponse> handleConstraintViolationException(ConstraintViolationException exception) {
        return ResponseEntity.badRequest().body(new ErrorResponse(
                exception.getConstraintViolations().stream()
                        .map(error -> error.getPropertyPath() + ": " + error.getMessage())
                        .collect(Collectors.joining(", "))));
    }

    // 모든 예외를 처리하는 메소드
//    @ExceptionHandler(Exception.class)
//    public ResponseEntity<ErrorResponse> unExceptError() {
//        return ResponseEntity.internalServerError().body(new ErrorResponse(UNEXPECTED_ERROR_MESSAGE));
//    }
}
