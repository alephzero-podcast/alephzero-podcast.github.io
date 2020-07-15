const fs = require('fs');
const path = require('path');
const mp3Duration = require('mp3-duration');

const BASE = path.resolve(__dirname, '../data');

fs.readdir(BASE, (err, items) => {
  items.forEach((item) => {
    if (!item.startsWith('.')) {
      let dirCont = fs.readdirSync(path.resolve(BASE, item));
      let files = dirCont.filter((elm) => {
        return elm.match(/.*\.(mp3)/ig);
      });

      if (files.length > 0) {
        const filePath = path.resolve(BASE, item, files[0]);
        const stats = fs.statSync(filePath);
        mp3Duration(filePath, (err, duration) => {
          if (err) return console.log(err.message);
          console.log('File: ' + files[0]);
          console.log('Size: ' + stats.size);
          console.log('Duration: ' + durationToHHMMSSMS(duration));
        });
      }
    }
  });
});

function durationToHHMMSSMS(durms) {
  if (!durms) return '??';

  const HHMMSSMS = new Date(durms * 1000).toISOString().substr(11, 12);
  if (!HHMMSSMS) return '??';

  const HHMMSS = HHMMSSMS.split('.')[0];
  if (!HHMMSS) return '??';

  const split = HHMMSS.split(':');
  const SS = parseInt(split[2], 10);
  const MM = parseInt(split[1], 10);
  const HH = parseInt(split[0], 10);

  let string = '';
  string += HH ? `${HH}` : '00';
  string += MM ? `:${MM}` : '00';
  string += MM ? `:${SS}` : '00';

  return string;
}
