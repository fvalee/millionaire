package fvale.backend.controller;

import fvale.backend.dto.FeedbackDto;
import fvale.backend.dto.QuestionDto;
import fvale.backend.dto.QuestionSetDto;
import fvale.backend.service.impl.GameServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/game")
@RequiredArgsConstructor
public class GameController {

    private final GameServiceImpl gameService;

    @PostMapping
    public ResponseEntity<Map<String, String>> createNewGame() {
        return ResponseEntity.ok().body(Map.of("id", gameService.createGame()));
    }

    @GetMapping("/{id}/check")
    public ResponseEntity<Map<String, Boolean>> checkIfGameExists(@PathVariable String id) {
        return ResponseEntity.ok().body(Map.of("exists", gameService.isPlayable(id)));
    }

    @GetMapping("/{id}")
    public ResponseEntity<QuestionDto> getNextQuestion(@PathVariable String id) {
        return ResponseEntity.ok().body(gameService.getNextQuestion(id));
    }

    @PutMapping("/{id}/{answer}")
    public ResponseEntity<FeedbackDto> answerQuestion(@PathVariable String id, @PathVariable char answer) {
        return ResponseEntity.ok().body(gameService.answerQuestion(id, answer));
    }

    @PostMapping("/questions")
    public ResponseEntity<Map<String, String>> createGameWithQuestions(@RequestBody QuestionSetDto set) {
        return ResponseEntity.ok().body(Map.of("gameId", gameService.createGameWithQuestions(set)));
    }

}
