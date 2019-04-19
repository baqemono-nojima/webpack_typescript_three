export default class UIResize {

    public resize_handler: any[] = [];
    public resize = true;

    constructor(init?: Partial<UIResize>) {

        Object.assign(this, init);

    }

    public run(): void {

        window.addEventListener('resize',e => {
            this.resize_handler.map(elm => {
                if(!this.resize) return;
                elm(e);
            });
        }, false);

    }

    public destroy(): void {

        this.resize_handler = [];
        this.resize = true;

    }

}