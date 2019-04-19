const Promise = require('es6-promise').Promise;

export default class Schedule {

    private _list: any[] = [];
    private _promiseList: any[] = [];
    
    constructor(init?: Partial<Schedule>) {

        Object.assign(this, init);

    }

    static wait(time: number) {
        return new Promise((resolve: () => void) => {
            setTimeout(function() {
                resolve();
            }, time);
        });
    }

    public add(task = (resolve: () => void) => {}) {
        this._list.push(() => {
            let promise = new Promise((resolve: () => void) => {
                task(resolve);
            });
            this._promiseList.push(promise);
            return promise
        });
    }

    public done(callback = () => {}) {
        this._list.reduce((prev, current) => {
            return prev.then(current);
        }, Promise.resolve()).then(() => {
            Promise.all(this._promiseList).then(callback);
        });
    }

}