const read = require('mz/fs').readFile;
const { task } = require('..');
const test = require('tape');

test('co() recursion should aggregate arrays within arrays', (t) => {
  t.plan(5);

  task(function *(){
    const a = read('index.js', 'utf8');
    const b = read('LICENSE', 'utf8');
    const c = read('package.json', 'utf8');

    const res = yield [a, [b, c]];
    t.equal(2, res.length);
    t.ok(~res[0].indexOf('exports'));
    t.equal(2, res[1].length);
    t.ok(~res[1][0].indexOf('MIT'));
    t.ok(~res[1][1].indexOf('devDependencies'));
  });
});

test('co() recursion should aggregate objects within objects', (t) => {
  t.plan(3);

  task(function *(){
    const a = read('index.js', 'utf8');
    const b = read('LICENSE', 'utf8');
    const c = read('package.json', 'utf8');

    const res = yield {
      0: a,
      1: {
        0: b,
        1: c
      }
    };

    t.ok(~res[0].indexOf('exports'));
    t.ok(~res[1][0].indexOf('MIT'));
    t.ok(~res[1][1].indexOf('devDependencies'));
  });
})
