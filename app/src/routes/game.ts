import express, {Router} from 'express';
import { postNewEntry, postNewGame, putGameStatistics } from '../controllers/game';

const router: Router = express.Router();

router.post('/', postNewGame);
router.post('/entry', postNewEntry);
router.put('/update/:uuid', putGameStatistics);


export default router;