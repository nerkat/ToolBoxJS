// node script to create new section component

// include node fs module
var fs = require('fs');

// name var
var name = process.argv[2].replace('-', '_');

// color console func
log = async function (text, mode) {
  switch (mode) {
    case 'success':
    mode = '[32m'; // green
      break;
    case 'error':
      mode = '[31m'; // red
      break;
    case 'info':
      mode = '[35m'; // purple
      break;
    case 'warning':
      mode = '[33m'; // yellow
      break;
    default:
      mode = '';
      break;
  }

  console.log(mode + text + '[0m');
}

// create component files
createComponent = async function () {
  // create 'components' folder if does not exist
  if (!fs.existsSync('../../components')) {
    fs.mkdirSync('../../components');
  }

  // create the COMP folder inside 'components' folder
  fs.mkdirSync('../../components/' + name);

  // liquid content
  const liquidContent = ${ liquidContent };

  // scss content
  const scssContent = ${ scssContent };

  // typescript content
  const tsContent = ${ tsContent };

  // schema content
  const schemeContent = ${ schemeContent };

  // create liquid file
  fs.appendFileSync('../../components/' + name + '/' + name + '.liquid', liquidContent)
  log('[ADDED] - ' + name + '.liquid' + ' created successfully', 'success');

  // create scss file
  fs.appendFileSync('../../components/' + name + '/' + name + '.scss', scssContent)
  log('[ADDED] - ' + name + '.scss' + ' created successfully', 'success');

  // create ts file
  fs.appendFileSync('../../components/' + name + '/' + name + '.ts', tsContent);
  log('[ADDED] - ' + name + '.ts' + ' created successfully', 'success');

  // create json file
  fs.appendFileSync('../../components/' + name + '/' + name + '.json', schemeContent);
  log('[ADDED] - ' + name + '.json' + ' created successfully', 'success');
}

// and translation keys
addTranslationKeys = async function () {

  const fileName = '../../theme/locales/en.default.schema.json';
  const file = require(fileName);

  file.sections[name] = {
    "name": name,
    "settings": {
      "title": name + " Title",
      "fontsize_title": name + " Title Font-Size",
      "lineheight_title": name + " Line-Height",
      "image": name + " Image"
    }
  };

  await fs.writeFileSync(fileName, JSON.stringify(file, null, 2));
  log('[ADDED] - ' + name + ' section' + ' translation keys added successfully', 'success');

}

// get OS specific command path 
function getCommandLine() {
  switch (process.platform) {
    case 'darwin': return 'open';
    case 'win32': return 'start';
    case 'win64': return 'start';
    default: return 'xdg-open';
  }
}

init = async function () {

  await createComponent();

  // open liquid file in vscode
  var exec = require('child_process').exec;
  exec(getCommandLine() + '../../components/' + name + '/' + name + '.liquid');

  // component files ready
  log('[CREATED] - ' + name + ' section' + ' files successfully created', 'info');

  // npm run watch
  var npmLog = exec('npm run watch');

  await new Promise(resolve => {
    npmLog.stdout.on('data', function (data) {
      // log 'npm run watch' output to console
      if (data.length > 4) {
        console.log(data);

        // wait for theme watch to be ready before updating translation keys
        data.includes('[dev]') ? resolve() : null;
      }
    });
  });

  await addTranslationKeys();

  // component uploaded to shopify - and ready to use in customizer
  log('[UPLOADED] - ' + name + ' section' + ' was successfully uploaded to Shopify', 'info');

};

init();