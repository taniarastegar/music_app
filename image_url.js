const fs = require('fs');
const https = require('https');
const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');

// Load the JSON file containing the image URLs
const jsonData = fs.readFileSync('a1.json');
const data = JSON.parse(jsonData);

// Configure the S3 client
const s3Client = new S3Client({ region: 'us-east-1' });
const bucketName = 'taniarastegarbucket';

// Loop through each song in the JSON data
for (const song of data.songs) {
  // Extract the artist name from the image URL
  const urlParts = song.img_url.split('/');
  const artistName = urlParts[urlParts.length - 2];

  // Download the image from the URL
  https.get(song.img_url, (response) => {
    let data = '';
    response.setEncoding('binary');
    response.on('data', (chunk) => {
      data += chunk;
    });
    response.on('end', () => {
      // Upload the image to S3
      const params = {
        Bucket: bucketName,
        Key: `artists/${artistName}.jpg`,
        Body: Buffer.from(data, 'binary'),
        ContentType: 'image/jpeg'
      };
      s3Client.send(new PutObjectCommand(params)).then(() => {
        console.log(`Uploaded image for ${artistName}`);
      }).catch((err) => {
        console.error(`Error uploading image for ${artistName}: ${err}`);
      });
    });
  }).on('error', (err) => {
    console.error(`Error downloading image for ${artistName}: ${err}`);
  });
}
