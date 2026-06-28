import express, { Router } from 'express';
import mongoose from 'mongoose';
import { User } from './models/user';
import { Team } from './models/team';
import { Activity } from './models/activity';
import { Leaderboard } from './models/leaderboard';
import { Workout } from './models/workout';

const app = express();
const port = Number(process.env.PORT) || 8000;
const mongoUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/octofit_db';
const codespaceName = process.env.CODESPACE_NAME;
const baseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : `http://localhost:${port}`;

app.use(express.json());

const createResourceRouter = (
  resourceName: string,
  model: mongoose.Model<any>,
) => {
  const router = Router();

  router.get('/', async (_req, res) => {
    const items = await model.find({});
    res.json({ resource: resourceName, items, apiUrl: baseUrl });
  });

  router.post('/', async (req, res) => {
    const item = await model.create(req.body);
    res.status(201).json(item);
  });

  return router;
};

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', apiUrl: baseUrl });
});

app.use('/api/users', createResourceRouter('users', User));
app.use('/api/teams', createResourceRouter('teams', Team));
app.use('/api/activities', createResourceRouter('activities', Activity));
app.use('/api/leaderboard', createResourceRouter('leaderboard', Leaderboard));
app.use('/api/workouts', createResourceRouter('workouts', Workout));

mongoose
  .connect(mongoUri)
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(port, () => {
      console.log(`Backend listening on port ${port}`);
    });
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  });
