const https = require('https');
const fs = require('fs');
const path = require('path');

function download(url, dest) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    https.get(url, (response) => {
      if (response.statusCode === 301 || response.statusCode === 302) {
        return download(response.headers.location, dest).then(resolve).catch(reject);
      }
      response.pipe(file);
      file.on('finish', () => {
        file.close(resolve);
      });
    }).on('error', (err) => {
      fs.unlink(dest, () => reject(err));
    });
  });
}

async function main() {
  console.log('Creating directories...');
  fs.mkdirSync('/Users/apple/Qasim/Tarzan/public/audio/ambient', { recursive: true });
  fs.mkdirSync('/Users/apple/Qasim/Tarzan/public/audio/score', { recursive: true });
  fs.mkdirSync('/Users/apple/Qasim/Tarzan/public/images', { recursive: true });

  console.log('Downloading audio...');
  await download('https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3', '/Users/apple/Qasim/Tarzan/public/audio/score/score-placeholder.mp3');
  await download('https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3', '/Users/apple/Qasim/Tarzan/public/audio/ambient/night-room.mp3');

  console.log('Downloading images...');
  const images = [
    'https://images.unsplash.com/photo-1518599904199-0ca897819ddb?w=600&q=80', // green dress vibe
    'https://images.unsplash.com/photo-1512413914594-814d483b8d1b?w=600&q=80', // eye
    'https://images.unsplash.com/photo-1515515291263-9509df659e51?w=600&q=80', // lips/smile
    'https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?w=600&q=80', // silhouette
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&q=80', // chin
    'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=600&q=80', // extra 1
    'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=600&q=80', // extra 2
    'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=600&q=80'  // extra 3
  ];

  for (let i = 0; i < images.length; i++) {
    await download(images[i], `/Users/apple/Qasim/Tarzan/public/images/razane-${i+1}.jpg`);
  }

  console.log('Done downloading everything.');
}

main().catch(console.error);
