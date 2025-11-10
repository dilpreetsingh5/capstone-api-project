import { Router } from 'express';
import { getTransactions, getTransaction, createTransaction, updateTransaction, deleteTransaction } from '../controllers/transactionController';
import { validateRequest } from '../middleware/validateRequest';
import { createTransactionSchema, updateTransactionSchema } from '../validation/transactionValidation';

const router = Router();

router.get('/', getTransactions);
router.get('/:id', getTransaction);
router.post('/', validateRequest(createTransactionSchema), createTransaction);
router.put('/:id', validateRequest(updateTransactionSchema), updateTransaction);
router.delete('/:id', deleteTransaction);

export default router;