import mongoose from 'mongoose';
import { User } from '../models/user';
import { Team } from '../models/team';
import { Activity } from '../models/activity';
import { Leaderboard } from '../models/leaderboard';
import { Workout } from '../models/workout';

// Seed the octofit_db database with test data.
async function seedDatabase(): Promise<void> {
  const mongoUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/octofit_db';
  await mongoose.connect(mongoUri);
  console.log('Seed the octofit_db database with test data');

  await Promise.all([
    User.deleteMany({}),
    Team.deleteMany({}),
    Activity.deleteMany({}),
    Leaderboard.deleteMany({}),
    Workout.deleteMany({}),
  ]);

  const users = await User.insertMany([
    {
      name: 'Avery Chen',
      email: 'avery@example.com',
      fitnessGoal: 'Build endurance',
      level: 'Intermediate',
    },
    {
      name: 'Mina Patel',
      email: 'mina@example.com',
      fitnessGoal: 'Increase strength',
      level: 'Advanced',
    },
    {
      name: 'Jordan Lee',
      email: 'jordan@example.com',
      fitnessGoal: 'Improve flexibility',
      level: 'Beginner',
    },
  ]);

  const teams = await Team.insertMany([
    {
      name: 'Velocity Squad',
      sport: 'Running',
      members: [users[0].name, users[1].name],
      goal: 'Complete 5 weekly runs',
    },
    {
      name: 'Core Crew',
      sport: 'Cross-training',
      members: [users[2].name],
      goal: 'Master 3 mobility sessions',
    },
  ]);

  await Activity.insertMany([
    {
      userId: users[0]._id.toString(),
      type: 'Run',
      duration: 35,
      distance: 6.2,
      date: new Date('2026-06-25'),
    },
    {
      userId: users[1]._id.toString(),
      type: 'Strength',
      duration: 45,
      date: new Date('2026-06-26'),
    },
    {
      userId: users[2]._id.toString(),
      type: 'Yoga',
      duration: 25,
      date: new Date('2026-06-27'),
    },
  ]);

  await Leaderboard.insertMany([
    { userId: users[0]._id.toString(), name: users[0].name, points: 1800, rank: 1 },
    { userId: users[1]._id.toString(), name: users[1].name, points: 1600, rank: 2 },
    { userId: users[2]._id.toString(), name: users[2].name, points: 1200, rank: 3 },
  ]);

  await Workout.insertMany([
    { title: 'Tempo Run', focus: 'Cardio', duration: 30, difficulty: 'Intermediate' },
    { title: 'Upper Body Strength', focus: 'Strength', duration: 40, difficulty: 'Advanced' },
    { title: 'Mobility Flow', focus: 'Recovery', duration: 20, difficulty: 'Beginner' },
  ]);

  console.log('Database seeded successfully');
  await mongoose.disconnect();
}

seedDatabase().catch((error) => {
  console.error('Seeding failed', error);
  process.exit(1);
});
