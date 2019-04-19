import ViewController from './ViewController';

import Schedule from '../../utility/Schedule';
import { TweenLite } from 'gsap';
import Utility from '../../utility/Utility';

export default class TopViewController extends ViewController {

    // @ts-ignore
    private stage: any | null = new window.Stage();

    constructor(init?: Partial<TopViewController>) {

        super();
        Object.assign(this, init);
        
    }

    public viewWillLoad(): void {

        super.viewWillLoad();

        this.stage.setup();
        this.stage.render();
        
    }

    public viewDidLoad(): void {

        super.viewDidLoad();

    }

    public viewWillAppear(): void {

        super.viewWillAppear();

    }

    public viewDidAppear(): void {

        super.viewDidAppear();

    }

    public viewWillDisappear(): void {
        
        super.viewWillDisappear();

    }

    public viewDidDisappear(): void {

        super.viewDidDisappear();

    }

}