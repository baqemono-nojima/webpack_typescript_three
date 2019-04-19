import Utility from '../../utility/Utility';

export default class UIFooter {

    private footer = document!.querySelector<HTMLElement>('.l-footer');

    constructor(init?: Partial<UIFooter>) {

        Object.assign(this, init);

    }

    public run(): void {
    }

    public resize(): void {
    }

    public destroy(): void {
    }

}