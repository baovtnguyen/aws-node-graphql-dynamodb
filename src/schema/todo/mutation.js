const TodoMutation = {
  createUser: (parent, { name }, context, info) => `Hello, ${name}`,
};

module.exports = {
  TodoMutation,
};
