import UIResize from '../../modules/UIStation/UIResize';
import UIScroll from '../../modules/UIStation/UIScroll';
import UIHeader from '../../modules/UIStation/UIHeader';
import UIFooter from '../../modules/UIStation/UIFooter';

import Schedule from '../../utility/Schedule';
import { TweenLite } from 'gsap';
import Utility from '../../utility/Utility';

export default class ViewController {

    public SWITCH_WIDTH = 768;
    public window_inner_width = window.innerWidth;
    public window_inner_height = window.innerHeight;

    private resize_handler: any[] = [];
    private uiResize = new UIResize();

    private scroll_handler: any[] = [];
    private uiScroll = new UIScroll();

    private uiHeader = new UIHeader();
    private uiFooter = new UIFooter();

    constructor(init?: Partial<ViewController>) {

        Object.assign(this, init);

        this.uiResize.resize_handler = this.resize_handler;
        this.uiScroll.scroll_handler = this.scroll_handler;

    }

    public viewWillLoad(): void {

        this.uiResize.run();
        this.uiScroll.run();
        this.uiHeader.run();
        this.uiFooter.run();
        
    }

    public viewDidLoad(): void {}

    public viewWillAppear(): void {

        this.resize_handler.push(() => {

            this.window_inner_width = window.innerWidth;
            this.window_inner_height = window.innerHeight;
            
        });

        this.scroll_handler.push((st: number, direction: string) => {
        });

    }

    public viewDidAppear(): void {}

    public viewWillDisappear(): void {}

    public viewDidDisappear(): void {}

}