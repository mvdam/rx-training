const Rx = require('rxjs')
const fs = require('fs')

function fromArray(arr) {
    const obs = Rx.Observable.create(function subscribe(observer) {
        arr.forEach(val => observer.next(val))
    })

    return obs
}

const obs = fromArray([10,20,30])

//obs.subscribe(console.log)


// operators
// * .do => like .map but without transform - debug
// .take(x) -> take first x items and stop after that
// .skip(x) -> skip first x items                           -> skip undefined
// .concat(obs) -> concat another observable into the pipeline
// .startWith(x) -> place value in front of
// .merge() -> subscribe to all observables
// .combineLatest -> gets the last released values of the given observables and combines them into a new observable
// .switch() -> flatten child observers // or switchMap
// .concatAll() -> 

// no logic into subscribers only use rx operators -- keep as small as possible


// buffer --> pronto websocket updates
// observable.catch((error, currentObs) => currentObs) -> continue on current observable as retry --OR-- .retry(2)


// replaySubject(1) instead of behavioursubject in pronto? should solve the undefined problem
// see:
function share(inputObservable) {
    var subject = new Rx.Subject();
    inputObservable.subscribe(subject);
    return Rx.Observable.create(function subscribe(observer) {
        subject.subscribe(observer);
    });
}
// ...




const readOBs = Rx.Observable.bindNodeCallback(fs.readFile)
const fileSub = readOBs('./index.js', 'utf-8')

fileSub
    .map(JSON.stringify)
    .do(console.log)
    .subscribe({
        next: d => console.log(d),
        error: err => console.error('got: ', err.name)
    })