package fvale.backend.repository;

import fvale.backend.enums.Level;
import fvale.backend.model.Question;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface QuestionRepository extends JpaRepository<Question, Long> {

    List<Question> findByLevel(Level lvl);

}
