package fvale.backend.controller;

import fvale.backend.dto.FeedbackDto;
import fvale.backend.dto.NewQuestionDto;
import fvale.backend.dto.QuestionDto;
import fvale.backend.enums.Level;
import fvale.backend.model.Question;
import fvale.backend.service.impl.QuestionServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Locale;

@RestController
@RequestMapping("/api/question")
@RequiredArgsConstructor
public class QuestionController {

    private final QuestionServiceImpl questionService;

    @GetMapping("/level/{lvl}")
    public ResponseEntity<QuestionDto> getQuestionOfLevel(@PathVariable String lvl) {
        return ResponseEntity.ok().body(
                questionService.getQuestionOfLevel(Level.getLevelByString(lvl.toLowerCase(Locale.ROOT)))
        );
    }

    @GetMapping("/level/{lvl}/all")
    public ResponseEntity<List<QuestionDto>> getQuestionsOfLevel(@PathVariable String lvl) {
        return ResponseEntity.ok().body(
                questionService.getQuestionsOfLevel(Level.getLevelByString(lvl.toLowerCase(Locale.ROOT)))
        );
    }

    @PostMapping("/{questionId}/answer/{answerCode}")
    public ResponseEntity<FeedbackDto> answerQuestion(@PathVariable Long questionId, @PathVariable char answerCode) {
        return ResponseEntity.ok().body(
                questionService.answerQuestion(questionId, answerCode)
        );
    }

    @PostMapping
    public ResponseEntity<Boolean> createQuestion(@RequestBody NewQuestionDto newQuestionDto) {
        return ResponseEntity.ok().body(questionService.saveQuestion(newQuestionDto));
    }

}
