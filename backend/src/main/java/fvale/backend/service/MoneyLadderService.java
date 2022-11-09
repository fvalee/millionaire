package fvale.backend.service;

import fvale.backend.model.MoneyLadder;

import java.util.List;

public interface MoneyLadderService {

    /**
     * Retrieves money ladder for the game
     * @return List of sums of money that can be won on each question
     */
    List<MoneyLadder> getMoneyLadder();

}
