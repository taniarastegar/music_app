const AWS = require('aws-sdk');
const fs = require('fs');

// Configure AWS credentials
AWS.config.update({
  accessKeyId: 'AKIA5CRWOTUX7K6CLH7U',
  secretAccessKey: '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',
  region: 'us-east-1',
});

// Create a DynamoDB client
const dynamodb = new AWS.DynamoDB.DocumentClient();

// Read the data from a1.json file
const data = fs.readFileSync('a1.json', 'utf8');

// Parse the JSON data
const jsonData = JSON.parse(data);

// Loop through the songs and upload them to the DynamoDB table
jsonData.songs.forEach((song) => {
  const params = {
    TableName: 'musicTable',
    Item: {
      title: song.title,
      artist: song.artist,
      year: song.year,
      web_url: song.web_url,
      img_url: song.img_url,
    },
  };

  // Upload the item to the DynamoDB table
  dynamodb.put(params, (err, data) => {
    if (err) {
      console.error(`Unable to add song ${song.title}`, err);
    } else {
      console.log(`Song ${song.title} added to DynamoDB table`);
    }
  });
});
