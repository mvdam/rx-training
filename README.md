## Welcome!

WiFi: **Code.Star**
Pass: **rxjsworkshop**

If you see this message, everything should be now set up and ready to start the training. This app is a simple social network in our LAN / Wi-Fi.

### Important links for today:

https://github.com/staltz/toy-rx (simpler source code that teaches how RxJS works)
https://github.com/ReactiveX/RxJS (official and the actual source code on GitHub)
http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html (official docs for Observable & operators)
Keep this app open because more links and content will appear as we go.

## Schedule

Motivation
Main concepts
Categories of operators
Most common operators
(lunch)
Subjects and multicasting
flatMap etc
Common mistakes
Scheduling

## Operators

- Creation
  - `create`
  - `from`
  - `of`
  - `fromEvent`
  - `interval`
  - `bindNodeCallback`
- Transformation
  - `map`
  - `scan`
  - `buffer` + `window`
- Filtering
  - `filter`
  - `take`
  - `skip`
- Combination
  - `concat`
  - `startWith`
  - `merge` (OR)
  - `combineLatest` (AND)
- Utility
  - `do` (almost like `map`)
- Error handling
  - `catch` 
  - `retry`
- Multicasting
  - `multicast`
  - `refCount`
  - Shortcuts: `publish*` and `share`
- Flattening
  - `switch`
  - `mergeAll`
  - `concatAll`

- - -

https://github.com/staltz/toy-rx/blob/master/index.js

- - -
WiFi: **Code.Star**
Pass: **rxjsworkshop**

- - -

## Exercise 1

```js
const Rx = require("rxjs");

/**
 * Exercise: use Observable.create to deliver to the observer all the items
 * in an array, essentially implementing Observable.from(array)
 */

function fromArray(arr) {
  // ... return an observable
}
```

**When you are done, write your name:**

- Bjorn Schijff
- Wemko Dijkhuis
- Werner de Groot
- David Hoepelman
- Anoniempje
- Eddy Bertoluzzo
- Joost
- Martin v Es
- Pavels Smirnovs
- Ishan Sital
- Piet Groot Kormelink
- Nick ten Veen

## Exercise 2

```js
const express = require('express');
const bodyParser = require('body-parser');
const mongo = require('mongodb');
const Rx = require('rxjs');

const app = express();
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true }));
app.set('port', (process.env.PORT || 3000));
app.set('views', __dirname + '/templates');
app.set('view engine', 'ejs');

const MC = mongo.MongoClient
const connectAsObservable = Rx.Observable.bindNodeCallback(MC.connect.bind(MC))

/**
 * Exercise: convert this snippet below from callbacks to Observables.
 * It's okay to use only methods that you have learned so far.
 */
app.get('/', (req, res) => {
  const dbObs = connectAsObservable('mongodb://localhost:27017/dbhere')

  dbObs.switchMap(db => {
    const cursor = db.collection('tasks').find().toArray
    const getDataAsObservable = Rx.Observable.bindNodeCallback(cursor.bind(cursor))
    const dataObs = getDataAsObservable()
    return dataObs
  })
  .subscribe({
    next: data => {
      res.render('root', {tasks: data});
    },
    error: e => {
      console.error('Server crashed because:', err2);
      process.exit(1);
    },
  })
});

app.listen(app.get('port'), () => {
  console.log('Node app is running on port', app.get('port'));
});

/**
 * If you want to run this in node.js, here is the package.json as well:
 *
{
  "main": "index.js",
  "scripts": {
    "start": "mongod --dbpath=~/talented-rx-workshop-mongodb & node index.js"
  },
  "dependencies": {
    "body-parser": "^1.16.0",
    "ejs": "^2.5.5",
    "express": "^4.14.1",
    "mongodb": "^2.2.22",
    "rxjs": "^5.0.3"
  }
}
 */
```

## Exercise 3

```html
<!DOCTYPE html>
<html>

<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width">
  <title>RxJS exercise</title>
</head>

<body>
  <script src="https://unpkg.com/rxjs@5.4.0/bundles/Rx.min.js"></script>
  <script>
    /**
     * Exercise: make an Observable that emits the first 3 clicks as "CLICK",
     * then the next 3 clicks as "click", then completes.
     */

    var clicks = Rx.Observable.fromEvent(document, "click");

    // ...
  </script>
</body>

</html>
```

**Write your name once you are done:**

- Bjorn Schijff
- David Hoepelman
- Werner de Groot
- Pavels Smirnovs
- Eddy Bertoluzzo
- Martin van Dam
- Mozart Diniz
- Ishan Sital

## Exercise 4

```html
<!DOCTYPE html>
<html>

<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width">
  <title>RxJS exercise</title>
</head>

<body>
  <div>
    <div>
      <label id="weight-text" style="display:inline-block; width:100px"></label>
      <input id="weight-slider" type="range" min="20" max="200" value="110" />
      <input id="weight-field" type="text" style="width: 40px;" value="110" />
    </div>
    <div>
      <label id="height-text" style="display:inline-block; width:100px"></label>
      <input id="height-slider" type="range" min="100" max="300" value="200" />
      <input id="height-field" type="text" style="width: 40px;" value="200" />
    </div>
    <h2 id="bmi"></h2>
  </div>
  <script src="https://unpkg.com/rxjs@5.4.0/bundles/Rx.min.js"></script>
  <script>
    // Get DOM elements
    var weightSliderElem = document.querySelector('#weight-slider')
    var weightFieldElem = document.querySelector('#weight-field')
    var weightTextElem = document.querySelector('#weight-text')

    var heightSliderElem = document.querySelector('#height-slider')
    var heightFieldElem = document.querySelector('#height-field')
    var heightTextElem = document.querySelector('#height-text')

    var bmiElem = document.querySelector('#bmi')

    /**
     * Exercise: create the `weight` observable which initially emits the current
     * value on the weightSliderElem, then will emit new values coming from either
     * weightSliderElem or weightFieldElem.
     *
     * Do similarly for `height` too.
     */
    // var weight = Rx.Observable.never() // replace with your solution

    var height = Rx.Observable.never() // replace with your solution

    /**
     * Exercise: create the `bmi` observable which emits a calculated value from
     * `weight` and `height`, using the formula:
     *     bmi = w / ((h * 0.01) * (h * 0.01))
     */
    var bmi = Rx.Observable.never() // replace with your solution

    weight.subscribe(val => weightTextElem.textContent = 'Weight: ' + val + 'kg')
    height.subscribe(val => heightTextElem.textContent = 'Height: ' + val + 'cm')
    bmi.subscribe(val => bmiElem.textContent = String(val))
  </script>
</body>

</html>
```

**Write your name once you are done:**

- Nick ten Veen
- Werner de Groot
- Pavels Smirnovs
- Bjorn Schijff
- Mozart Diniz
- David Hoepelman
- Mikel Arnaiz
- Martin van Es
- Eddy Bertoluzzo
- Daniel Piedrw
- Piet Groot Kormelinkr

- - -

```js
function share(inputObservable) {
  var subject = new Rx.Subject();
  inputObservable.subscribe(subject);
  return Rx.Observable.create(function subscribe(observer) {
    subject.subscribe(observer);
  });
}
```

## Exercise 5

```html 
<!DOCTYPE html>
<html>

<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width">
  <title>RxJS exercise</title>
</head>

<body>
  <h1 class="number"></h1>
  <h2 class="text"></h2>
  <script src="https://unpkg.com/rxjs@5.4.0/bundles/Rx.min.js"></script>
  <script>
    // Get DOM elements
    var numberElement = document.querySelector(".number");
    var textElement = document.querySelector(".text");

    /**
     * Exercise: fix the mismatch, the number should match the text.
     */

    var randomNumber = Rx.Observable
      .interval(2000)
      .startWith(null)
      .map(() => 1 + Math.round(Math.random() * 5));

    var text = randomNumber.map(num => {
      switch (num) {
        case 1:
          return "one";
        case 2:
          return "two";
        case 3:
          return "three";
        case 4:
          return "four";
        case 5:
          return "five";
        case 6:
          return "six";
      }
    });

    randomNumber.subscribe({
      next: x => {
        numberElement.textContent = x;
      },
      error: err => {
        console.log("error " + err);
      },
      complete: () => {
        console.log("done");
      }
    });

    text.subscribe({
      next: x => {
        textElement.textContent = x;
      },
      error: err => {
        console.log("error " + err);
      },
      complete: () => {
        console.log("done");
      }
    });
  </script>
</body>

</html>
```

**Write your name once you are done:**

- David Hoepelman
- Piet Groot Kormelink
- Pavels Smirnovs

## Exercise 6

Hint: use either `fetch` and `Observable.from(promise)` or `Observable.ajax`.

```html
<!DOCTYPE html>
<html>

<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width">
  <title>RxJS exercise</title>
</head>

<body>
  <script src="https://unpkg.com/rxjs@5.4.0/bundles/Rx.min.js"></script>
  <script>
    /**
     * Exercise: on every click, make a request to a random user in
     * JSONPlaceholder servers and deliver the response in the `responses`
     * observable.
     *
     * Example: for a random number NUM (from 1 to 10) in
     *    https://jsonplaceholder.typicode.com/users/NUM
     */

    var clicks = Rx.Observable.fromEvent(document, 'click')

    // ...

    var responses = Rx.Observable.never() // replace with your solution

    responses.subscribe({
      next: (data) => { console.log(data) },
      error: (err) => { console.log('error ' + err) },
      complete: () => { console.log('done') },
    })
  </script>
</body>

</html>
```

Done:
- Werner de Groot
- Nick ten Veen
- David Hoepelman
- Wemko Dijkhuis
- Piet Groot Kormelink
- Martin v Dam
- Pavels Smirnovs
- Joost
- Asif
- Ishan Sital

## Common mistakes

- Using Subjects too much. Use Observable.create!
- Using Observable.create too much. Use Creation operators
- Subscribing too much and unsubscribing too much
- Subject.next inside subscribe
- Subscribe inside subscribe

## Exercise 7

```html 
const Rx = require("rxjs");

/**
 * Exercise: refactor the following code so it doesn't have any use of Subjects.
 */

const subject = new Rx.Subject();

document.addEventListener("click", function(ev) {
  subject.next(1);
});

fetch("https://jsonplaceholder.typicode.com/users/0")
  .then(res => res.json())
  .then(data => {
    subject.next(1);
  });

const count$ = subject.scan((acc, x) => acc + x, 0);

count$.subscribe(function(x) {
  console.log(x);
});
```