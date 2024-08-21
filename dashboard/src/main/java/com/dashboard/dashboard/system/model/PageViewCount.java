package com.dashboard.dashboard.system.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
@AllArgsConstructor
public class PageViewCount {
    private String pageUrl;
    private Long viewPageCount;
}