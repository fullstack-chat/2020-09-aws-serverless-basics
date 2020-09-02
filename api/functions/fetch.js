const AWS = require('aws-sdk')

const docClient = new AWS.DynamoDB.DocumentClient();

const fetchRecords = async function () {
  return new Promise((resolve, reject) => {
    const params = {
      TableName: 'TodoDbTable'
    };

    docClient.scan(params, function (err, data) {
      if (err) {
        reject(err);
      } else {
        const mappedItems = data.Items.map(el => el.document)
        resolve(mappedItems);
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
    let todos = await fetchRecords()
    response.statusCode = 200
    response.body = JSON.stringify(todos)
  } catch (err) {
    console.error(err)
    response.statusCode = 500
    response.body = err
  }
  return response
}