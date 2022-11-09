package fvale.backend.service.impl;

import fvale.backend.dto.FeedbackDto;
import fvale.backend.dto.NewQuestionDto;
import fvale.backend.dto.QuestionDto;
import fvale.backend.dto.QuestionSetDto;
import fvale.backend.enums.Answer;
import fvale.backend.enums.Level;
import fvale.backend.exception.QuestionLevelMismatchException;
import fvale.backend.exception.QuestionNotFoundException;
import fvale.backend.model.Question;
import fvale.backend.repository.QuestionRepository;
import fvale.backend.service.QuestionService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.LinkedHashSet;
import java.util.List;
import java.util.Random;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class QuestionServiceImpl implements QuestionService {

    private final QuestionRepository questionRepository;

    @Override
    public QuestionDto getQuestion(Long id) {
        return mapToQuestionDto(getQuestionById(id));
    }

    @Override
    public List<QuestionDto> getQuestionsOfLevel(Level lvl) {
        return questionRepository.findByLevel(lvl)
                .stream()
                .map(this::mapToQuestionDto)
                .collect(Collectors.toList());
    }

    @Override
    public QuestionDto getQuestionOfLevel(Level lvl) {
        List<Question> questions = questionRepository.findByLevel(lvl);
        return chooseRandomQuestion(questions);
    }

    @Override
    public FeedbackDto answerQuestion(Long id, char answer) {
        Question question = getQuestionById(id);
        return FeedbackDto.builder()
                .questionId(id)
                .givenAnswer(Character.toUpperCase(answer))
                .correctAnswer(question.getAnswer())
                .build();
    }

    @Override
    public Set<QuestionDto> generateQuestionSet() {
        LinkedHashSet<QuestionDto> questions = new LinkedHashSet<>();
        Level[] levels = Level.values();
        for (Level level : levels) {
            for (int i = 0; i < 5; i++) {
                boolean isAdded = questions.add(getQuestionOfLevel(level));
                if (!isAdded) {
                    i--;
                }
            }
        }
        return questions;
    }

    @Override
    public boolean saveQuestion(NewQuestionDto newQuestionDto) {
        Question question = new Question();
        question.setText(newQuestionDto.getQuestion());
        question.setOptionA(newQuestionDto.getOptionA());
        question.setOptionB(newQuestionDto.getOptionB());
        question.setOptionC(newQuestionDto.getOptionC());
        question.setOptionD(newQuestionDto.getOptionD());
        question.setLevel(Level.getLevelByString(newQuestionDto.getQuestionLevel()));
        question.setAnswer(Answer.valueOf(newQuestionDto.getCorrectAnswer()));

        questionRepository.save(question);
        return true;
    }

    @Override
    public boolean verifyQuestionSet(QuestionSetDto set) {
        boolean result = true;
        int questionNumber = 1;

        Long[] questions = set.getQuestions();
        for (Long id : questions) {
            Question q = getQuestionById(id);
            verifyQuestionLevel(questionNumber, q.getLevel().getLevel());
            questionNumber++;
        }
        return result;
    }

    private void verifyQuestionLevel(int questionNumber, String level) {
        if (!(questionNumber >= 1 && questionNumber <= 5 && level.equals("Easy") ||
                questionNumber >= 6 && questionNumber <= 10 && level.equals("Medium") ||
                questionNumber >= 11 && questionNumber <= 15 && level.equals("Hard"))) {
            throw new QuestionLevelMismatchException("Cannot set question level " + level + " for question number " + questionNumber);
        }
    }

    private Question getQuestionById(Long id) {
        return questionRepository.findById(id).orElseThrow(() -> new QuestionNotFoundException("Cannot find question with id " + id + "."));
    }

    private QuestionDto chooseRandomQuestion(List<Question> questions) {
        Random random = new Random();
        return mapToQuestionDto(questions.get(random.nextInt(questions.size())));
    }

    private QuestionDto mapToQuestionDto(Question q) {
        return QuestionDto.builder()
                .questionId(q.getId())
                .question(q.getText())
                .optionA(q.getOptionA())
                .optionB(q.getOptionB())
                .optionC(q.getOptionC())
                .optionD(q.getOptionD())
                .build();
    }
}
