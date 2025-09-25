package com.studyhub.tag.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Getter
@NoArgsConstructor
public class TagDto {

    private Long id;
    private String name;

    @Builder
    public TagDto(Long id, String name) {
        this.id = id;
        this.name = name;
    }
}
