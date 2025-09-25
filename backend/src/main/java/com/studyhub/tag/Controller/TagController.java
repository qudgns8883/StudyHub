package com.studyhub.tag.Controller;

import com.studyhub.tag.dto.TagDto;
import com.studyhub.tag.service.TagService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
@Slf4j
public class TagController {

    private final TagService tagService;

    @GetMapping("/getTags")
    public ResponseEntity<List<TagDto>> getAllTags() {
        log.info("Request to get all tags");
        List<TagDto> tags = tagService.getAllTags();
        return ResponseEntity.ok(tags);
    }
}
