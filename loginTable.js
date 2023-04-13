const {
    DynamoDBClient,
    CreateTableCommand,
    waitForTableExists,
    DescribeTableCommand,
  } = require('@aws-sdk/client-dynamodb');
  const { DynamoDBDocumentClient, PutCommand } = require('@aws-sdk/lib-dynamodb');
  
  const REGION = 'us-east-1'; // Replace with your actual AWS region
  const client = new DynamoDBClient({ region: REGION });
  const documentClient = DynamoDBDocumentClient.from(client);
  
  const createTableParams = {
    TableName: 'loginUser',
    KeySchema: [
      {
        AttributeName: 'email',
        KeyType: 'HASH',
      },
    ],
    AttributeDefinitions: [
      {
        AttributeName: 'email',
        AttributeType: 'S',
      },
    ],
    ProvisionedThroughput: {
      ReadCapacityUnits: 1,
      WriteCapacityUnits: 1,
    },
  };
  
  async function tableExists(tableName) {
    try {
      const describeTableCommand = new DescribeTableCommand({ TableName: tableName });
      await client.send(describeTableCommand);
      return true;
    } catch (error) {
      if (error.name === 'ResourceNotFoundException') {
        return false;
      } else {
        throw error;
      }
    }
  }
  
  async function main() {
    try {
      if (!(await tableExists('loginUser'))) {
        await client.send(new CreateTableCommand(createTableParams));
        await waitForTableExists({ client, TableName: 'login' });
      } else {
        console.log('Table login already exists');
      }
  
      for (let i = 0; i < 10; i++) {
        const email = `s3821922${i}@student.rmit.edu.au`;
        const user_name = `Firstname Lastname${i}`;
        const password = `${(i * 111111) % 1000000}`.padStart(6, '0');
  
        const putParams = {
          TableName: 'loginUser',
          Item: {
            email: email,
            user_name: user_name,
            password: password,
          },
        };
  
        await documentClient.send(new PutCommand(putParams));
        console.log(`Item ${i} inserted successfully`);
      }
    } catch (err) {
      console.error('Error:', err);
    }
  }
  
  main();
  