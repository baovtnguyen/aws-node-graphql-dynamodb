const Todo = require('../../libs/todo');

const TodoMutation = {
  createTodo: async (parent, { content, completed = false }, context, info) => {
    const todo = new Todo({ content, completed });
    try {
      await todo.save();
      return todo;
    } catch (err) {
      return err;
    }
  },
  updateTodo: async (parent, { sk, content, completed }, context, info) => {
    try {
      const res = await Todo.updateOne(sk, { content, completed });
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
};

module.exports = {
  TodoMutation,
};
