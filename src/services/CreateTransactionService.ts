import { getCustomRepository, getRepository } from 'typeorm';
// import AppError from '../errors/AppError';

import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';
import Category from '../models/Category';

interface Request {
  title: string;
  value: number;
  type: 'income' | 'outcome';
  category: Category;
}

class CreateTransactionService {
  public async execute({
    title,
    value,
    type,
    category,
  }: Request): Promise<Transaction> {
    // TODO
    const transactionsRepository = getCustomRepository(TransactionsRepository);
    const categoriesRepository = getRepository(Category);

    let newCategory;

    const findCategory = await categoriesRepository.findOne({
      where: { title: category },
    });

    if (!findCategory) {
      newCategory = categoriesRepository.create({
        title,
      });

      categoriesRepository.save(newCategory);
    }

    const transaction = transactionsRepository.create({
      title,
      value,
      type,
      category_id: newCategory.id || findCategory.id,
    });

    return transaction;
  }
}

export default CreateTransactionService;
