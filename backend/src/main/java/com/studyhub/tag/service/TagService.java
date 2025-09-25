package com.studyhub.tag.service;

import com.studyhub.tag.dto.TagDto;
import com.studyhub.tag.mapper.TagMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
@Slf4j
public class TagService {

    private final TagMapper tagMapper;

    public List<TagDto> getAllTags() {
        return tagMapper.findAll().stream()
                .map(tag -> new TagDto(tag.getId(), tag.getName()))
                .collect(Collectors.toList());
    }
}
