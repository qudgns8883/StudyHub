package com.studyhub.studyTag.mapper;

import com.studyhub.study.dto.StudyResponseDto;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import java.util.List;

@Mapper
public interface StudyTagMapper {
    /**
     * 스터디와 태그의 관계를 연결 테이블에 저장합니다.
     * @param studyId 스터디 ID
     * @param tagId 태그 ID
     */
    void insertStudyTag(@Param("studyId") Long studyId, @Param("tagId") Long tagId);

    /**
     * 스터디와 태그의 관계를 일괄적으로 저장합니다.
     * @param studyId 스터디 ID
     * @param tagIds 태그 ID 리스트
     */
    void bulkInsertStudyTags(@Param("studyId") Long studyId, @Param("tagIds") List<Long> tagIds);

}
