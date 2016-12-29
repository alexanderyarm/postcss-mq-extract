import test from 'ava';
import Promise from 'bluebird';
import fs from 'fs';
import postcss from 'postcss';
import mqExtract from '../index';

var sourceFile = './test/source.css';
var mockFile = './test/mock.css';
var generatedFile = './test/generated-tablet.css';

function readFile(filename) {
    return fs.readFileSync(filename, { encoding: 'utf8' });
}

function processCss() {
    return new Promise(function(resolve, reject) {
        var mqExtractParams = {
            match: '(min-width: 768px)', 
            postfix: '-tablet' 
        } 
        var sourceData = readFile(sourceFile);

        postcss()
            .use(mqExtract(mqExtractParams))
            .process(sourceData, {to: './test/generated.css' })
            .then(function() {
                resolve();
            }).catch(function(err){
                reject(err)
            });
    });
}

test('generated css equals mock css', t => {
  return processCss().then(function() {
    var processedData = readFile(generatedFile);
    var mockData = readFile(mockFile);
    t.is(processedData, mockData);
  }).catch(function(err){
      throw err;
  });
})
