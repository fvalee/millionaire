package fvale.backend.service;

import fvale.backend.dto.FeedbackDto;
import fvale.backend.dto.NewQuestionDto;
import fvale.backend.dto.QuestionDto;
import fvale.backend.dto.QuestionSetDto;
import fvale.backend.enums.Level;

import java.util.List;
import java.util.Set;

public interface QuestionService {

    /**
     * Retrieves question given its ID
     * @param id Question identifier
     * @return QuestionDto containing question text and four possible answers
     */
    QuestionDto getQuestion(Long id);

    /**
     * Retrieves all questions of given level
     * @param lvl Level name
     * @return all questions of provided level
     */
    List<QuestionDto> getQuestionsOfLevel(Level lvl);

    /**
     * Retrieves a random (single) question of given level
     * @param lvl Level name
     * @return a random question of provided level
     */
    QuestionDto getQuestionOfLevel(Level lvl);

    /**
     * Used to provide the next answer for certain game
     * @param id Game ID for which answer is provided
     * @param answer character representing the answer for certain question
     * @return FeedbackDto object that holds information whether the answer was answered correctly
     */
    FeedbackDto answerQuestion(Long id, char answer);

    /**
     * Used to generate a set of 15 questions for the next game to be played. Questions are separated
     * into 3 levels, with the first 5 being Easy, the following 5 Medium and the remaining 5 Hard.
     * @return
     */
    Set<QuestionDto> generateQuestionSet();

    /**
     * Used to add a question to the database
     * @param newQuestionDto An object that holds question information which user needs to provide
     * @return True if question is successfully saved
     */
    boolean saveQuestion(NewQuestionDto newQuestionDto);

    /**
     * Used to verify the set of 15 questions that will be played in one of the games
     * @param set An object containing a list of question IDs that are to be verified
     * @return True if set contains proper question IDs of proper difficulty levels
     */
    boolean verifyQuestionSet(QuestionSetDto set);

}
