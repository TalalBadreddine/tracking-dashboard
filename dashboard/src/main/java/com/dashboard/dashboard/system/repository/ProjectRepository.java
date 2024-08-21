package com.dashboard.dashboard.system.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.dashboard.dashboard.system.entity.Project;

@Repository
public interface ProjectRepository extends JpaRepository<Project, Long> {
        Optional<Project> findByName(String name);
        List<Project> findAll();

}
