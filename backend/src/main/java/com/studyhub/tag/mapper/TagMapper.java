package com.studyhub.tag.mapper;

import com.studyhub.tag.dto.TagDto;
import io.lettuce.core.dynamic.annotation.Param;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface TagMapper {
    /**
     * 태그 이름을 데이터베이스에 삽입합니다.
     * @param tagName 삽입할 태그 이름
     */
    void insertTag(@Param("tagName") String tagName);

    /**
     * 태그 이름으로 태그 ID를 조회합니다.
     * @param tagName 조회할 태그 이름
     * @return 태그 ID
     */
    Long findTagIdByName(@Param("tagName") String tagName);

    /**
     * 여러 개의 태그 이름을 한 번에 삽입하고, 생성된 ID를 반환합니다.
     * @param tagNames 삽입할 태그 이름 리스트
     * @return 생성된 태그 ID 리스트
     */
    void insertTags(@Param("tagNames") List<String> tagNames);

    /**
     * 여러 개의 태그 ID를 이름으로 조회합니다.
     * @param tagNames 조회할 태그 이름 리스트
     * @return 태그 ID 리스트
     */
    List<Long> findTagIdsByNames(@Param("tagNames") List<String> tagNames);

    List<TagDto> findAll();
}
