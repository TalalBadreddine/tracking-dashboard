package com.dashboard.dashboard.system.model;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
@AllArgsConstructor
public class EventModel {
    long totalClicks;
    long timeSpentInProject;
    long errorCount;
    List<PageClickCount> totalClickInEachPage;
    List<PageTimeSpent> timeSpentInPage;
    List<PageViewCount> pageViewCount;
}