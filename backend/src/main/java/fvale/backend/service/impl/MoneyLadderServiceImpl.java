package fvale.backend.service.impl;

import fvale.backend.model.MoneyLadder;
import fvale.backend.repository.MoneyLadderRepository;
import fvale.backend.service.MoneyLadderService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class MoneyLadderServiceImpl implements MoneyLadderService {

    private final MoneyLadderRepository moneyLadderRepository;

    @Override
    public List<MoneyLadder> getMoneyLadder() {
        return moneyLadderRepository.findAllByOrderByIdDesc();
    }

}
