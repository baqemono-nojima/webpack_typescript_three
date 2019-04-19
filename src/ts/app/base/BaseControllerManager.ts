export default class BaseControllerManager {

    public _VC: any[string];

    private _controllers: any[] = [];

    constructor(ViewControllers: any, init?: Partial<BaseControllerManager>) {

        Object.assign(this, init);
        
        this._VC = ViewControllers;

    }

    public add(ID: string | null = null, content: any | null = null): void {

        if (typeof ID === 'string' && ID === 'null') {
            ID = null;
        }

        this._controllers.unshift(this.getController(ID, content));

    }

    public pop(): void {
        this._controllers.pop();
    }

    public shift(): void {
        this._controllers.shift();
    }

    public use(type: any): any {

        if ('prev' === type) {
            return this._controllers[1];
        }

        if ('current' === type) {
            return this._controllers[0];
        }

        return false;
    }

    public getController(ID: string | null = null, content: any | null = null): object {

        let controller: any | null = null;

        if (ID !== null && (this._VC[ID] !== null && this._VC[ID] !== undefined)) {

            controller = new this._VC[ID](content);

        } else if (content !== null && this._VC[content.getAttribute('data-use-controller')]) {

            controller = new this._VC[content.getAttribute('data-use-controller')](content);

        } else if (content !== null && this._VC[content.getAttribute('id')]) {

            controller = new this._VC[content.getAttribute('id')](content);

        } else {

            controller = new this._VC['default'](content);

        }

        // if ( ID !== null && ( this._VC[ ID ] !== null && this._VC[ ID ] !== undefined ) ) {
        //     controller = new this._VC[ ID ]( content );
        // } else if ( content !== null && isSet( this._VC[ content.attr( 'data-use-controller' ) ] ) ) {
        //     controller = new this._VC[ content.attr( 'data-use-controller' ) ]( content );
        // } else if ( content !== null && isSet( this._VC[ content.attr( 'id' ) ] ) ) {
        //     controller = new this._VC[ content.attr( 'id' ) ]( content );
        // } else {
        //     controller = new this._VC[ 'default' ]( content );
        // }

        return controller;
        
    }

}