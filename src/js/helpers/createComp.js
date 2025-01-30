

// node script to create new section component

// include node fs module
var fs = require('fs');
var argv = require('minimist')(process.argv.slice(2));

var formattedName = argv._[0] + 'Comp';

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
  fs.mkdirSync('../../components/' + formattedName);

  // liquid content
  const liquidContent = ${ liquidContent };

  // scss content
  const scssContent = ${ scssContent };

  // typescript content
  const jsContent = ${ tsContent };


  // create ts file
  fs.appendFileSync('../../components/' + formattedName + '/' + formattedName + '.ts', jsContent);
  log('[ADDED] - ' + formattedName + '.ts' + ' created successfully', 'success');

  // create liquid file
  fs.appendFileSync('../../components/' + formattedName + '/' + formattedName + '.liquid', liquidContent);
  log('[ADDED] - ' + formattedName + '.liquid' + ' created successfully', 'success');

  // create scss file
  fs.appendFileSync('../../components/' + formattedName + '/' + formattedName + '.scss', scssContent);
  log('[ADDED] - ' + formattedName + '.scss' + ' created successfully', 'success');

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
  exec(getCommandLine() + '../../components/' + formattedName + '/' + formattedName + '.liquid');

  // component files ready
  log('[CREATED] - ' + formattedName + ' section' + ' files successfully created', 'info');

};

init();