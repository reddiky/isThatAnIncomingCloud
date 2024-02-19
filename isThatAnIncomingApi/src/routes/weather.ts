import * as express from 'express';
const router = express.Router();

/* GET this week's forecast. */
router.get('/api/weather', function(req, res, next) {
  res.send('this week');
});

export default router;
