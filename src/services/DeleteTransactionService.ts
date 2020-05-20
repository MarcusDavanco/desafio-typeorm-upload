import AppError from '../errors/AppError';
import { getCustomRepository } from 'typeorm';

import Category from '../models/Category';
import Transaction from '../models/Transaction';
import TransactionsRepository from '../repositories/TransactionsRepository';

interface Request {
  id: string;
}

class DeleteTransactionService {
  public async execute({ id }: Request): Promise<Transaction> {
    const transactionsRepository = getCustomRepository(TransactionsRepository);

    const findTransaction = await transactionsRepository.findOne({ where: id });

    if (!findTransaction) {
      throw new AppError('Transaction not found');
    }

    await transactionsRepository.delete({ id });

    return findTransaction;
  }
}

export default DeleteTransactionService;
