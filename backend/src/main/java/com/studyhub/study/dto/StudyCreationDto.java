package com.studyhub.study.dto;


import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Getter
@NoArgsConstructor
public class StudyCreationDto {

    private Long id;
    private String title;
    private String description;
    private String tags;
    private Integer maxParticipants;
    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate startDate;
    private String duration;
    private long creatorId;

    @Builder
    public StudyCreationDto(Long id, String title, String description, String tags, Integer maxParticipants, LocalDate startDate, String duration, long creatorId) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.tags = tags;
        this.maxParticipants = maxParticipants;
        this.startDate = startDate;
        this.duration = duration;
        this.creatorId = creatorId;

    }

    @Override
    public String toString() {
        return "StudyCreationDto{" +
                "title='" + title + '\'' +
                ", description='" + description + '\'' +
                ", tags='" + tags + '\'' +
                ", maxParticipants=" + maxParticipants +
                ", startDate='" + startDate + '\'' +
                ", duration='" + duration + '\'' +
                ", creatorId='" + creatorId + '\'' +
                '}';
    }
}
