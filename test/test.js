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

function fileExists(filename) {
    return fs.existsSync(filename);
}

function processCss(match) {
    return new Promise(function(resolve, reject) {
        var mqExtractParams = {
            match: match, 
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

test.afterEach(t => {
    if (fileExists(generatedFile)) fs.unlinkSync(generatedFile);
})

test('does not create a file if media query not matched', t => {
  return processCss('(max-width: 767px)').then(function() {
    t.is(fileExists(generatedFile), false);
  }).catch(function(err){
      throw err;
  });
})

test('generated css equals mock css', t => {
  return processCss('(min-width: 768px)').then(function() {
    var processedData = readFile(generatedFile);
    var mockData = readFile(mockFile);
    t.is(processedData, mockData);
  }).catch(function(err){
      throw err;
  });
})
