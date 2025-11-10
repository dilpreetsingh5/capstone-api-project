import { Router } from 'express';
import { getBudgets, getBudget, createBudget, updateBudget, deleteBudget } from '../controllers/budgetController';
import { validateRequest } from '../middleware/validateRequest';
import { createBudgetSchema, updateBudgetSchema } from '../validation/budgetValidation';

const router = Router();

router.get('/', getBudgets);
router.get('/:id', getBudget);
router.post('/', validateRequest(createBudgetSchema), createBudget);
router.put('/:id', validateRequest(updateBudgetSchema), updateBudget);
router.delete('/:id', deleteBudget);

export default router;