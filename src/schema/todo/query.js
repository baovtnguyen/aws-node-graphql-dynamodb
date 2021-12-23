const Todo = require('../../libs/todo');

const TodoQuery = {
  getTodos: async (parent, args, context, info) => {
    try {
      const res = await Todo.findAll();
      return res.Items;
    } catch (err) {
      return err;
    }
  },
  getTodo: async (parent, { sk }, context, info) => {
    try {
      const res = await Todo.findOne(sk);
      return res.Item;
    } catch (err) {
      return err;
    }
  },
};

module.exports = {
  TodoQuery,
};
