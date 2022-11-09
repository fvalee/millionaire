package fvale.backend.service.impl;

import fvale.backend.dto.FeedbackDto;
import fvale.backend.dto.QuestionDto;
import fvale.backend.dto.QuestionSetDto;
import fvale.backend.exception.GameFinishedException;
import fvale.backend.exception.GameNotFoundException;
import fvale.backend.exception.QuestionLevelMismatchException;
import fvale.backend.model.Game;
import fvale.backend.repository.GameRepository;
import fvale.backend.service.GameService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class GameServiceImpl implements GameService {

    private final GameRepository gameRepository;

    private final QuestionServiceImpl questionService;

    @Override
    public String createGame() {
        Game game = new Game(UUID.randomUUID().toString());

        Long[] questions = questionService.generateQuestionSet()
                .stream()
                .map(QuestionDto::getQuestionId)
                .toArray(Long[]::new);

        game.setQuestions(questions);
        gameRepository.save(game);
        return game.getId();
    }

    @Override
    public boolean isPlayable(String id) {
        boolean playable;
        try {
            Game game = getGame(id);
            playable = !game.isFinished();
        } catch (GameNotFoundException e) {
            playable = false;
        }
        return playable;
    }

    @Override
    public QuestionDto getNextQuestion(String gameId) {
        Game game = getGame(gameId);
        validateGameState(game);

        Long nextQuestionId = game.getQuestions()[game.getAnswered()];
        QuestionDto questionDto = questionService.getQuestion(nextQuestionId);
        questionDto.setQuestionNumber((long) (game.getAnswered() + 1));
        return questionDto;
    }

    @Override
    public FeedbackDto answerQuestion(String gameId, char providedAnswer) {
        Game game = getGame(gameId);
        validateGameState(game);

        Long currentQuestionId = game.getQuestions()[game.getAnswered()];
        FeedbackDto feedbackDto = questionService.answerQuestion(currentQuestionId, Character.toUpperCase(providedAnswer));

        if (feedbackDto.getCorrectAnswer().toString().equals(Character.toString(feedbackDto.getGivenAnswer()))) {
            game.setAnswered(game.getAnswered() + 1);
            if (game.getAnswered() == 15) {
                game.setFinished(true);
            }
        } else {
            game.setFinished(true);
        }
        gameRepository.save(game);

        return feedbackDto;
    }

    @Override
    public String createGameWithQuestions(QuestionSetDto set) {
        Game game = new Game(UUID.randomUUID().toString());

        boolean isOkay = true;
        try {
            isOkay = questionService.verifyQuestionSet(set);
        } catch (QuestionLevelMismatchException e) {
            e.printStackTrace();
        }
        if (isOkay) {
            game.setQuestions(set.getQuestions());
            gameRepository.save(game);
        }

        return isOkay ? game.getId() : "Something went wrong...";
    }


    private void validateGameState(Game game) {
        if (game.isFinished()) {
            throw new GameFinishedException("This game has finished.");
        }
    }

    private Game getGame(String gameId) {
        return gameRepository.findById(gameId).orElseThrow(() -> new GameNotFoundException("Cannot find game with ID marked as " + gameId + "."));
    }
}
