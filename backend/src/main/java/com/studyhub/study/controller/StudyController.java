package com.studyhub.study.controller;

import com.studyhub.common.dto.CommonResponseDto;
import com.studyhub.study.dto.StudyCreationDto;
import com.studyhub.study.dto.StudyResponseDto;
import com.studyhub.study.service.StudyService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@Slf4j
public class StudyController {

    private final StudyService studyService;

    @PostMapping("/studies")
    public ResponseEntity<CommonResponseDto> createStudy(@RequestBody StudyCreationDto studyDto) {
        log.info("DTO: {}", studyDto);
        studyService.createStudy(studyDto);

        return new ResponseEntity<>(new CommonResponseDto("스터디가 성공적으로 생성되었습니다."), HttpStatus.CREATED);
    }

    @GetMapping("/studies/recent")
    public ResponseEntity<List<StudyResponseDto>> getRecentStudies() {
        List<StudyResponseDto> recentStudies = studyService.getRecentStudies();
        return ResponseEntity.ok(recentStudies);
    }

    @GetMapping("/studies/{id}")
    public ResponseEntity<StudyResponseDto> getStudyById(@PathVariable("id") int studyId) {
        log.info("Request to get study by ID: {}", studyId);

        StudyResponseDto study = studyService.getStudyById(studyId);

        // 스터디를 찾지 못했을 경우 404 Not Found 반환
        if (study == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        return ResponseEntity.ok(study);
    }
}
