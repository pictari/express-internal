import express, {Router} from 'express';
import { postNewEntry, postNewGame } from '../controllers/game';

const router: Router = express.Router();

router.post('/', postNewGame);
router.post('/entry', postNewEntry);


export default router;