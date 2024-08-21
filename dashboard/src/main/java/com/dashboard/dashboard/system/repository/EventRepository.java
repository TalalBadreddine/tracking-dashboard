package com.dashboard.dashboard.system.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.dashboard.dashboard.system.entity.Event;

@Repository
public interface EventRepository extends JpaRepository<Event, Long> {
    List<Event> findAllByProjectName(@Param("projectName") String projectName);

    @Query("SELECT COUNT(e) FROM Event e JOIN e.project p WHERE p.name = :projectName AND e.eventType = 'CLICK'")
    long countClicksByProjectName(@Param("projectName") String projectName);

    @Query("SELECT e.pageUrl, COUNT(e) as CLICK_COUNT FROM Event e JOIN e.project p WHERE p.name = :projectName AND e.eventType = 'CLICK' GROUP BY e.pageUrl ORDER BY CLICK_COUNT DESC")
    List<Object[]> countClickPerPage(@Param("projectName") String projectName);

    @Query("SELECT e.pageUrl, SUM(e.duration) as DURATION_PER_PAGE FROM Event e JOIN e.project p WHERE p.name = :projectName GROUP BY e.pageUrl ORDER BY DURATION_PER_PAGE DESC")
    List<Object[]> getTimeSpentPerPage(@Param("projectName") String projectName);

    @Query("SELECT SUM(e.duration) as DURATION FROM Event e JOIN e.project p WHERE p.name = :projectName ORDER BY DURATION DESC")
    Long getTotalTimeSpentInProject(@Param("projectName") String projectName);

    @Query("SELECT e.pageUrl, COUNT(e) as VIEW_PAGE_COUNT FROM Event e JOIN e.project p WHERE p.name = :projectName AND e.eventType = 'PAGE_VIEW' GROUP BY e.pageUrl ORDER BY VIEW_PAGE_COUNT DESC ")
    List<Object[]> countPageViewsByPageUrl(@Param("projectName") String projectName);

    @Query("SELECT COUNT(e) as ERROR_COUNT FROM Event e JOIN e.project p WHERE p.name = :projectName AND e.error_message IS NOT NULL ")
    Long countErrors(@Param("projectName") String projectName);
}
