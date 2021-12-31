const Todo = require('../../libs/todo');

const TodoMutation = {
  createTodo: async (parent, { todo }, context, info) => {
    const newTodo = new Todo({ ...todo });
    try {
      await newTodo.save();
      return newTodo;
    } catch (err) {
      return err;
    }
  },
  updateTodo: async (parent, { sk, content, isCompleted }, context, info) => {
    try {
      const res = await Todo.updateOne(sk, { content, isCompleted });
      return res.Attributes;
    } catch (err) {
      return err;
    }
  },
  deleteTodo: async (parent, { sk }, context, info) => {
    try {
      const res = await Todo.deleteOne(sk);
      return res.Attributes;
    } catch (err) {
      return err;
    }
  },
  deleteAll: async () => {
    await Todo.deleteAll();
    return 'Deleted All'
  }
};

module.exports = {
  TodoMutation,
};
