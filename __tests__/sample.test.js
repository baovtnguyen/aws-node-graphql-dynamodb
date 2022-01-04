require('dotenv').config();

const { ApolloServer } = require('apollo-server-lambda');
const { typeDefs, resolvers } = require('../src/schema');

const server = new ApolloServer({ typeDefs, resolvers });
const Todo = require('../src/libs/todo');

beforeAll(async () => {
  await Todo.deleteAll();
});

test('should create a new todo', async () => {
  // Arrange
  const mutation = `
    mutation CreateTodo($todo: TodoInput!) {
      createTodo(todo: $todo) {
        pk
        sk
        content
        isCompleted
      }
    }
  `;

  const CONTENT = 'Learn Unit test with Jest';
  const variables = {
    todo: {
      content: CONTENT,
    },
  };

  // Act
  let result = await server.executeOperation({ query: mutation, variables });
  result = JSON.parse(JSON.stringify(result));

  // Assert
  expect(result.data?.createTodo.content).toEqual(CONTENT);
});

test('should throw an error create a new todo with invalid input', async () => {
  // Arrange
  const mutation = `
    mutation CreateTodo($todo: TodoInput!) {
      createTodo(todo: $todo) {
        pk
        sk
        content
        isCompleted
      }
    }
  `;

  const CONTENT = 'Learn Unit test with Jest';
  const variables = {
    todo: {
      content: 123,
    },
  };

  // Act
  let result = await server.executeOperation({ query: mutation, variables });
  result = JSON.parse(JSON.stringify(result));

  // Assert
  expect(result.errors).not.toBeUndefined();
});
