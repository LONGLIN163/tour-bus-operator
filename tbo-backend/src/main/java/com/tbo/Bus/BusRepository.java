package com.tbo.Bus;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface BusRepository
        extends JpaRepository<Bus, Long> {
    @Query("SELECT b FROM Bus b WHERE b.name = ?1")
    Optional<Bus> findBusByName(String name);
}
