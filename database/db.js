const mongoose = require('mongoose');
const User = require('./User');
const Task = require('./Task');

async function connectDB() {
  await mongoose.connect('mongodb://127.0.0.1:27017/todo');
  console.log('Connected to MongoDB');
}

async function createUserWithTasks() {
  try {
    const userObj = await User.create({
      username: 'Ankit',
      password: '1234',
    });

    const taskObj = await Task.create({
      title: 'Do Something about JWT',
      isComplete: false,
      user: userObj._id
    });

    userObj.tasks.push(taskObj._id);
    await userObj.save();

    console.log(userObj);
  } catch (err) {
    console.error('Error creating user and tasks:', err);
  }
}

module.exports = async () => {
  await connectDB();
  await createUserWithTasks();
}
// (async () => {
//   await connectDB();
//   await createUserWithTasks();
//   await mongoose.disconnect();
// })();