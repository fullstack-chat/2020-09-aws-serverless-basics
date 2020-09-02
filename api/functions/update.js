const AWS = require('aws-sdk')

const docClient = new AWS.DynamoDB.DocumentClient();

const updateRecord = async function (id, document) {
  return new Promise((resolve, reject) => {
    const params = {
      TableName: 'TodoDbTable',
      Key: {
        appId: 'todoapp',
        entityId: id
      },
      UpdateExpression: 'set document = :document',
      ExpressionAttributeValues: {
        ':document': document
      },
      ReturnValues: 'UPDATED_NEW'
    };

    docClient.update(params, function (err, data) {
      if (err) {
        reject(err);
      } else {
        const updatedEntity = data.Attributes.document
        updatedEntity.id = entityId
        resolve(updatedEntity);
      }
    });
  });
};

exports.handler = async (event) => {
  let response = {
    headers: {
      'Access-Control-Allow-Origin': '*'
    }
  }
  try {
    let data = JSON.parse(event.body)
    await updateRecord(data.id, data)
    response.statusCode = 200
  } catch (err) {
    console.error(err)
    response.statusCode = 500
    response.body = err
  }
  return response
}