package com.dashboard.dashboard.system.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
@AllArgsConstructor
public class PageTimeSpent {
    private String pageUrl;
    private Long durationPerPage;
}