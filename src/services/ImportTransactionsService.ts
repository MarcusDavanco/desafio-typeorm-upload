import { getCustomRepository } from 'typeorm';
import csvParse from 'csv-parse';
import path from 'path';
import fs from 'fs';

import uploadConfig from '../config/upload';
import Transaction from '../models/Transaction';

interface Request {
  csvFilename: string;
}

class ImportTransactionsService {
  public async execute({ csvFilename }: Request): Promise<Transaction[]> {
    // TODO

    const transactionsRepository = getCustomRepository(Transaction);
  }
}

export default ImportTransactionsService;
