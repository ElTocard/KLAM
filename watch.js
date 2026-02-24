const { exec } = require('child_process');
const chokidar = require('chokidar');

chokidar.watch('.', {
  ignored: /(node_modules|\.git)/,
  ignoreInitial: true
}).on('change', (path) => {
  console.log(`Modif détectée : ${path}`);
  exec('git add . && git commit -m "auto-save" && git push', (err, stdout) => {
    if (err) console.error(err);
    else console.log(stdout);
  });
});