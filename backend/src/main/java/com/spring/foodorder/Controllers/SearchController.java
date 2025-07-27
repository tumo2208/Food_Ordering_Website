package com.spring.foodorder.Controllers;

import com.spring.foodorder.DTOs.SearchResponse;
import com.spring.foodorder.Services.SearchService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.Collections;
import java.util.List;

@RestController
@RequestMapping("/search")
public class SearchController {
    @Autowired
    private SearchService searchService;

    @GetMapping("/search")
    public ResponseEntity<?> search(@RequestParam(required = false) String query) {
        try {
            List<SearchResponse> results = searchService.search(query);
            return ResponseEntity.ok(Collections.singletonMap("results", results));
        } catch (Exception e) {
            return ResponseEntity.status(500).body("An unexpected error occurred: " + e.getMessage());
        }
    }
}
