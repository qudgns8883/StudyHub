package com.studyhub.study.mapper;

import com.studyhub.study.dto.StudyCreationDto;

import com.studyhub.study.dto.StudyResponseDto;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface StudyMapper {
    void insertStudy(@Param("studyDto") StudyCreationDto studyDto);
    List<StudyResponseDto> findRecentStudies();
    StudyResponseDto getStudyById(@Param("studyId") int studyId);
}

