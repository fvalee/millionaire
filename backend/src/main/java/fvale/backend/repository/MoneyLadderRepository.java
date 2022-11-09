package fvale.backend.repository;

import fvale.backend.model.MoneyLadder;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MoneyLadderRepository extends JpaRepository<MoneyLadder, Long> {

    List<MoneyLadder> findAllByOrderByIdDesc();

}
