package com.studyhub.common.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class CommonResponseDto {

    private String message;

    public CommonResponseDto(String message) {
        this.message = message;
    }
}
