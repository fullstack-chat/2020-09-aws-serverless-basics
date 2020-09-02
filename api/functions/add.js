const AWS = require('aws-sdk')

const docClient = new AWS.DynamoDB.DocumentClient();

const createRecord = async function (data) {
  return new Promise((resolve, reject) => {
    const params = {
      TableName: 'TodoDbTable',
      Item: {
        appId: 'todoapp',
        entityId: data.id,
        document: data
      }
    };

    docClient.put(params, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
}

exports.handler = async (event) => {
  let response = {
    headers: {
      'Access-Control-Allow-Origin': '*'
    }
  }
  try {
    let data = JSON.parse(event.body)
    await createRecord(data)
    response.statusCode = 201
  } catch (err) {
    console.error(err)
    response.statusCode = 500
    response.body = err
  }
  return response
}