import { Router } from 'express';

const router = Router();

router.get('/', (req, resp) => {
    req;
    resp.end('App Express');
});

export default router;
