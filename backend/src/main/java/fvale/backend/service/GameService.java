package fvale.backend.service;

import fvale.backend.dto.FeedbackDto;
import fvale.backend.dto.QuestionDto;
import fvale.backend.dto.QuestionSetDto;

public interface GameService {

    /**
     * Creates a new game with a correctly randomized set of questions.
     * @return Game ID
     */
    String createGame();

    /**
     * Checks if a game with given id exists and hasn't finished.
     * @param id Game ID
     * @return true if game is playable, false otherwise
     */
    boolean isPlayable(String id);

    /**
     * Retrieves the next question for the given game.
     * @param gameId unique game identifier
     * @return QuestionDto objects with Question ID, text and four possible options
     */
    QuestionDto getNextQuestion(String gameId);

    /**
     * Used to answer a question. If correct, a new question can be retrieved, otherwise game is finished.
     * @param gameId unique game identifier
     * @param providedAnswer user's answer
     * @return FeedbackDto object with Question ID, provided and correct answer
     */
    FeedbackDto answerQuestion(String gameId, char providedAnswer);

    /**
     * Creates a new game with provided set of questions.
     * @param set An object containing a list of question IDs
     * @return Newly created Game ID in which questions will be asked based on the provided question set.
     */
    String createGameWithQuestions(QuestionSetDto set);

}
