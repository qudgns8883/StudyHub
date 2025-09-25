package com.studyhub.study.service;

import com.studyhub.study.dto.StudyCreationDto;
import com.studyhub.study.dto.StudyResponseDto;
import com.studyhub.study.mapper.StudyMapper;
import com.studyhub.studyTag.mapper.StudyTagMapper;
import com.studyhub.tag.mapper.TagMapper;
import com.studyhub.utill.UserUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class StudyService {

    private final StudyMapper studyMapper;
    private final TagMapper tagMapper;
    private final StudyTagMapper studyTagMapper;
    private final UserUtil userUtil;


    @Transactional
    public void createStudy(StudyCreationDto studyDto) {
        log.info("Mybatis를 사용하여 스터디 생성 및 태그 저장 로직 실행: {}", studyDto.toString());
        Long userId = userUtil.getCurrentUserId();

        // 1. 스터디를 studies 테이블에 저장하고, 생성된 study_id를 DTO에 담습니다.
        StudyCreationDto studyToInsert = StudyCreationDto.builder()
                .title(studyDto.getTitle())
                .description(studyDto.getDescription())
                .tags(studyDto.getTags())
                .maxParticipants(studyDto.getMaxParticipants())
                .startDate(studyDto.getStartDate())
                .duration(studyDto.getDuration())
                .creatorId(userId)
                .build();

        log.info("추가하기전 스터디 ID: {}", studyToInsert);

        studyMapper.insertStudy(studyToInsert);

        // 생성된 스터디 ID를 가져옵니다.
        Long studyId = studyToInsert.getId();
        log.info("새로 생성된 스터디 ID: {}", studyId);

        // 2. 태그가 존재하면 처리합니다.
        if (studyDto.getTags() != null && !studyDto.getTags().isEmpty()) {
            // 태그 문자열을 파싱합니다 (쉼표, 공백, #으로 구분).
            List<String> parsedTagNames = Arrays.stream(studyDto.getTags().split("[,\\s#]+"))
                    .map(String::trim)
                    .filter(tagName -> !tagName.isEmpty())
                    .distinct()
                    .collect(Collectors.toList());

            if (!parsedTagNames.isEmpty()) {
                // 3. 존재하지 않는 태그를 tags 테이블에 일괄 삽입합니다. (IGNORE로 중복 방지)
                tagMapper.insertTags(parsedTagNames);

                // 4. 모든 태그 이름에 대한 ID를 조회합니다.
                List<Long> tagIds = tagMapper.findTagIdsByNames(parsedTagNames);

                if (!tagIds.isEmpty()) {
                    // 5. 스터디 ID와 태그 ID들을 study_tags 테이블에 일괄 저장합니다.
                    studyTagMapper.bulkInsertStudyTags(studyId, tagIds);
                }
            }
        }

        log.info("스터디 및 태그가 성공적으로 생성되었습니다. Study ID: {}", studyId);
    }

    public List<StudyResponseDto> getRecentStudies() {
        return studyMapper.findRecentStudies();
    }

    public StudyResponseDto getStudyById(int studyId) {
        return studyMapper.getStudyById(studyId);
    }
}

