const { v4: uuidv4 } = require('uuid');

const dynamodb = require('../dynamodb');
const { DYNAMODB_TABLE_NAME, TODO_APP_PK } = require('../env');

class Todo {
  constructor({ content, completed }) {
    this.pk = TODO_APP_PK;
    this.sk = uuidv4();
    this.content = content;
    this.completed = completed;
  }

  async save() {
    const params = {
      TableName: DYNAMODB_TABLE_NAME,
      Item: {
        ...this,
      },
      ConditionExpression:
        'attribute_not_exists(pk) AND attribute_not_exists(sk)',
    };

    return dynamodb.put(params).promise();
  }

  static async findOne(sk) {
    const params = {
      TableName: DYNAMODB_TABLE_NAME,
      Key: {
        pk: TODO_APP_PK,
        sk,
      },
    };

    return dynamodb.get(params).promise();
  }

  static async updateOne(sk, { content, completed }) {
    const updateAttributes = [];
    const expressionAttributeNames = {};
    const expressionAttributeValues = {};

    if (content !== undefined) {
      updateAttributes.push('#content = :content');
      expressionAttributeNames['#content'] = 'content';
      expressionAttributeValues[':content'] = content;
    }
    if (completed !== undefined) {
      updateAttributes.push('#completed = :completed');
      expressionAttributeNames['#completed'] = 'completed';
      expressionAttributeValues[':completed'] = completed;
    }

    const updateExpression = 'SET ' + updateAttributes.join(',');

    const params = {
      TableName: DYNAMODB_TABLE_NAME,
      Key: {
        pk: TODO_APP_PK,
        sk,
      },
      ConditionExpression: 'attribute_exists(pk) AND attribute_exists(sk)',
      UpdateExpression: updateExpression,
      ExpressionAttributeNames: expressionAttributeNames,
      ExpressionAttributeValues: expressionAttributeValues,
      ReturnValues: 'ALL_NEW',
    };

    return dynamodb.update(params).promise();
  }

  static async deleteOne(sk) {
    const params = {
      TableName: DYNAMODB_TABLE_NAME,
      Key: {
        pk: TODO_APP_PK,
        sk,
      },
      ConditionExpression: 'attribute_exists(pk) AND attribute_exists(sk)',
      ReturnValues: 'ALL_OLD',
    };

    return dynamodb.delete(params).promise();
  }

  static async findAll() {
    const params = {
      TableName: DYNAMODB_TABLE_NAME,
      KeyConditionExpression: `pk = :pk`,
      ExpressionAttributeValues: {
        ':pk': TODO_APP_PK,
      },
    };

    return dynamodb.query(params).promise();
  }

  static async deleteAll() {
    const res = await Todo.findAll();
    const todos = res.Items;
    for (const todo of todos) {
      await Todo.deleteOne(todo.sk);
    }
  }
}

module.exports = Todo;
