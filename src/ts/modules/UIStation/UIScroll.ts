import { TweenLite } from 'gsap';
const ScrollToPlugin = require('gsap/ScrollToPlugin');
const plugins = [ScrollToPlugin];

export default class UIScroll {

    public scroll_handler: any[] = [];
        
    public st = 0;
    public before_st = 0;

    public direction: string | null = null;

    public scroll = true;
    public use_smooth_scroll = false;

    private trigger_anchor = document!.querySelectorAll<HTMLElement>('.js-anchor-trigger');
    private anchor_fn: any[] = [];

    constructor(init?: Partial<UIScroll>) {

        Object.assign(this, init);

    }

    public run(): void {

        if(!this.trigger_anchor) return;
        
        window.addEventListener('scroll', e => {
            this.scroll_handler.map(elm => {
                if(!this.scroll) return;

                this.st = window.pageYOffset || document.documentElement.scrollTop;

                if(this.before_st < this.st) {
                    this.direction = 'down';
                } else if(this.before_st > this.st) {
                    this.direction = 'up';
                }
                
                this.before_st = this.st;

                elm(this.st, this.direction);

            });
        }, false);

        for (let i = 0; i < this.trigger_anchor.length; i++) {
            const href: string | null = this.trigger_anchor[i]!.getAttribute('href');
            const offset: number = (window.innerWidth > 768) ? Number(this.trigger_anchor[i].dataset['offset']) : 80;
            this.anchor_fn[i] = this.clickAnchor.bind(this, href, offset);
            this.trigger_anchor[i].addEventListener('click', this.anchor_fn[i], false);
        }

    }

    public destroy(): void {

        if(!this.trigger_anchor) return;

        this.scroll_handler = [];
        this.st = 0;
        this.scroll = true;

        for (let i = 0; i < this.trigger_anchor.length; i++) {
            this.trigger_anchor[i].removeEventListener('click', this.anchor_fn[i], false);
        }

        // this.anchor_fn = [];

    }
    
    private clickAnchor(href: string | null, offset: number, e: any): void {

        e.preventDefault();

        TweenLite.to(window, 1, {
            scrollTo: {
                y: href,
                offsetY: offset,
                autoKill: false
            },
            ease: window.ease_pack[0].expo.inOut
        });

    }

}