const TodoTypes = `
  type Todo {
    pk: String!
    sk: ID!
    content: String!
    isCompleted: Boolean!
  }

  input TodoInput {
    content: String!
    isCompleted: Boolean = false
  }

  extend type Query {
    getTodos: [Todo!]!
    getTodo(sk: ID!): Todo!
  }

  extend type Mutation {
    createTodo(todo: TodoInput!): Todo!
    deleteTodo(sk: ID!): Todo!
    updateTodo(sk: ID!, content: String, isCompleted: Boolean): Todo!
    deleteAll: String
  }
`

module.exports = {
  TodoTypes,
}
