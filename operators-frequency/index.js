const fs = require("fs");
const path = require("path");
const esprima = require('esprima');
const esquery = require('esquery');
const { format } = require('@fast-csv/format');

const DIR_PATH = './solutions';
const RESULTS_PATH = './results';
const apiResults = new Map();

try {
  let apisFolders = fs.readdirSync(DIR_PATH);

  apisFolders
  .filter(apiFolder => fs.statSync(path.join(DIR_PATH, apiFolder)).isDirectory())
    .forEach(apiFolder => { //rxjs, baconjs

      let apiFolderPath = path.join(DIR_PATH, apiFolder);
      let tasksFolders = fs.readdirSync(apiFolderPath); //1, 2, 3, ...
      let taskResults = new Map(tasksFolders.reduce((prev, curr) => {
        prev.push([curr, new Map()]);
        return prev;
      }, []));

      tasksFolders
      .filter(tasksFolder => fs.statSync(path.join(apiFolderPath, tasksFolder)).isDirectory())
        .forEach(tasksFolder => { //1, 2, 3, ...
          let tasks = fs.readdirSync(path.join(apiFolderPath, tasksFolder))
          .filter(task => fs.statSync(path.join(apiFolderPath, tasksFolder, task)).isFile());
          let taskResult = taskResults.get(tasksFolder);
          tasks.forEach(task => {
            let taskContent = fs.readFileSync(path.join(apiFolderPath, tasksFolder, task), { encoding: 'utf-8' });

            let queryResult = esquery(esprima.parse(taskContent), "[type='CallExpression']");

            queryResult
              .filter(result => //result.callee?.object.name //findObjectByLabel(result.callee.object, 'name')
                result.callee.type === 'MemberExpression' ?
                !['Promise', 'Object', 'Number', 'Math', 'console', 'axios', 'fetch', 'response', 'res', 'resp', 'Array',
                  'prices', 'val', 'Exception', 'https', 'JSON', 'productPrices', 'x', 'acc', 'latestProducts',
                  'val', 'prices', 'lastThreeProductsPrices', 'then', 'subject_request']
                .includes(result.callee?.object.name) : true)
              .forEach(result => {
                // if it is true, then it is a method, otherwise, it is a function
                let name = result.callee.type === 'MemberExpression' ? result.callee.property.name : result.callee.name;
                if (
                  !['fetch', 'then', 'switchProd', 'getRandomProductId', 'getUsers', 'pipe',
                    'require', 'push', 'fetchProductById', 'generateRandomNumber', 'getUrlResource',
                    'getProduct', 'getProducts', 'getId', 'getRandomInt', 'toFixed', 'fetchByIdStream',
                    'meanThreeLastPrices', 'fetchUserDataStream', 'clearInterval', 'setInterval', 'setTimeout',
                    'clearTimeout', 'fetchData', 'fetchRandomProductsStream', 'getRandomProductId', 'fetchRandomProduct',
                    'resolve', 'reject', 'getUserData', 'getData', 'randomInt', 'request','makeRequest', 'getUrl',
                    'idProduto', 'unsubscribe', 'requestWithRetry']
                    .includes(name) /* && (tasksFolder === '3' && task ==='rm.js' && name !== 'sort') */) {

                  if ((tasksFolder === '2' && task === 'P18.js' && name === 'catch') ||
                    (tasksFolder === '3' && task === 'P8.js' && name === 'sort') ||
                    (['1','2','3'].includes(tasksFolder) && task === 'P16.js')
                    ((tasksFolder === '4' || tasksFolder === '5') && task === 'P16.js' && name === 'on') ||
                    (tasksFolder === '4' && task === 'P14.js' && name === 'add') ||
                    (tasksFolder === '5' && task === 'P10.js' &&
                      (name === 'shift' || name === 'push' || name === 'forEach')) ||
                    (['P17.js', 'P13.js', 'P4.js', 'P6.js', 'P11.js', 'P16.js'].includes(task) && ['catch', 'finally'].includes(name))) return;

                  // store operator frequency
                    if (!taskResult.has(name)) {
                      taskResult.set(name, 1);
                    } else {
                      let frequency = taskResult.get(name);
                      taskResult.set(name, ++frequency);
                    }
                  }
                });
            });
        });

        apiResults.set(apiFolder, taskResults);
      });
  } catch (e) {
    console.error(e);
  }

  if (!fs.existsSync(RESULTS_PATH)) {
    fs.mkdirSync(RESULTS_PATH);
  }

  for (let [API, taskOpFrequencies] of apiResults) {
    if (!fs.existsSync(path.join(RESULTS_PATH, API))) {
      fs.mkdirSync(path.join(RESULTS_PATH, API));
    }
    let generalAPIResult = new Map;

    for (let [task, operatorsFrequencies] of taskOpFrequencies) {
      const csvStream = format({ writeBOM: true, delimiter: ';' });
      csvStream.pipe(fs.createWriteStream(`${path.join(RESULTS_PATH, API)}/frequencies_${task}.csv`, { encoding: 'utf8' }));
      csvStream.on('finish', () => {
        console.log(`Data writen succesfully for ${path.join(RESULTS_PATH, API, task)}`);
      });
      csvStream.write(['Operator', 'Frequency']);
      [...operatorsFrequencies]
      .sort((a, b) => b[1] - a[1]) // sorts descendingly
      .forEach(operatorFrequency => {
        csvStream.write(operatorFrequency);
        let frequency = generalAPIResult.get(operatorFrequency[0]) || 0;
        frequency += operatorFrequency[1];
        generalAPIResult.set(operatorFrequency[0], frequency);
      });
      csvStream.end();
    }
    let csvStream = format({ writeBOM: true, delimiter: ';' });
    csvStream.pipe(fs.createWriteStream(`${path.join(RESULTS_PATH)}/frequencies_${API}.csv`, { encoding: 'utf8' }));
    csvStream.on('finish', () => {
      console.log(`Data writen succesfully for ${path.join(RESULTS_PATH)}`);
    });
    csvStream.write(['Operator', 'Frequency']);
    [...generalAPIResult]
    .sort((a, b) => b[1] - a[1]) // sorts descendingly
    .forEach(apiResultFrequency => {
      csvStream.write(apiResultFrequency);
    });
    csvStream.end();
  }
