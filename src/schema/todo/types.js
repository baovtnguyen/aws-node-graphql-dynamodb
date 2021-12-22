const TodoTypes = `
  type Todo {
    pk: String!
    sk: String!
    content: String!
    completed: Boolean!
  }

  extend type Query {
    greeting: String
  }

  extend type Mutation {
    createUser(name: String): String
  }
`

module.exports = {
  TodoTypes,
}
