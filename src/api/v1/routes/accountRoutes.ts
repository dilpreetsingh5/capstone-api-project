import { Router } from 'express';
import { getAccounts, getAccount, createAccount, updateAccount, deleteAccount } from '../controllers/accountController';
import { validateRequest } from '../middleware/validateRequest';
import { createAccountSchema, updateAccountSchema } from '../validation/accountValidation';

const router = Router();

router.get('/', getAccounts);
router.get('/:id', getAccount);
router.post('/', validateRequest(createAccountSchema), createAccount);
router.put('/:id', validateRequest(updateAccountSchema), updateAccount);
router.delete('/:id', deleteAccount);

export default router;