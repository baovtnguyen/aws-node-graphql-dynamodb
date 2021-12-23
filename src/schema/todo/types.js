const TodoTypes = `
  type Todo {
    pk: String!
    sk: ID!
    content: String!
    completed: Boolean!
  }

  extend type Query {
    getTodos: [Todo!]!
    getTodo(sk: ID!): Todo
  }

  extend type Mutation {
    createTodo(content: String!, completed: Boolean): Todo!
    deleteTodo(sk: ID!): Todo!
    updateTodo(sk: ID!, content: String, completed: Boolean): Todo!
  }
`

module.exports = {
  TodoTypes,
}
