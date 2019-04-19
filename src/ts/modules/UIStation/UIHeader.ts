import Utility from '../../utility/Utility';
import { TweenLite } from 'gsap';

export default class UIHeader {

    private SWITCH_HEIGHT = window.innerHeight / 2;
    private save_scroll_top = 0;

    private body = document.body;
    private header = document!.querySelector<HTMLElement>('.l-header');
    private header_nav = document!.querySelector<HTMLElement>('.l-header__nav');
    private section_logo = document!.querySelector<HTMLElement>('.p-section__logo');
    private trigger_nav = document!.querySelector<HTMLElement>('.js-trigger__nav');

    private is_click = false;

    constructor(init?: Partial<UIHeader>) {

        Object.assign(this, init);

    }

    public run(): void {

        if(!this.header || !this.header_nav || !this.trigger_nav) return;

        const st: number = window.pageYOffset || document.documentElement.scrollTop;
        const direction: string = 'down';
        this.save_scroll_top = st;
        this.scroll(st, direction);

        this.trigger_nav.addEventListener('click', this.clickNav.bind(this), false);
        
        this.setCurrentNav();
        this.hideHeader();
        
        if(window.innerWidth > 768) {

            this.header.style.transition = 'padding .6s cubic-bezier(1, 0, 0, 1), transform .6s cubic-bezier(1, 0, 0, 1)';
            
        } else {

            this.header_nav.style.height = '100vh';
            this.header_nav.style.transition = 'opacity 0s linear .7s, transform .6s cubic-bezier(1, 0, 0, 1)';
            
        }

        this.header.style.opacity = '1';

    }

    public scroll(st: number, direction: string): void {
        
        if(!this.header) return;
        
        if(st > this.SWITCH_HEIGHT) {

            if(direction == 'up') {
                this.header.classList.remove('is-scrolled');
                this.header.classList.add('is-back');
            } else if(direction == 'down') {
                this.header.classList.add('is-scrolled');
                this.header.classList.remove('is-back');
            }

        } else {
            this.header.classList.remove('is-scrolled');
            this.header.classList.remove('is-back');
        }

    }

    public destroy(): void {

        if(!this.trigger_nav) return;

        this.trigger_nav.removeEventListener('click', this.clickNav.bind(this), false);

    }

    private clickNav(): void {

        if(!this.header || this.is_click) return;

        this.is_click = true;

        if(!this.header.classList.contains('is-nav-open')) {
            this.open();
        } else {
            this.close();
        }

    }

    private open(): void {

        if(!this.header) return;

        const st: number = window.pageYOffset || document.documentElement.scrollTop;
        this.save_scroll_top = st;

        this.header.classList.add('is-nav-open');

        setTimeout(() => {
            this.set(this.save_scroll_top);
            this.is_click = false;
        }, 600);

    }

    private close(): void {

        if(!this.header) return;

        this.header.classList.remove('is-nav-open');

        this.clear(this.save_scroll_top);

        setTimeout(() => {
            this.is_click = false;
        }, 600);
        
    }

    private set(st: number): void {

        if(!this.body) return;
        
        this.body.style.position = 'fixed';
        this.body.style.width = '100%';
        this.body.style.height = window.outerHeight+'px';
        this.body.style.overflow = 'hidden';

        setTimeout(() => {
            window.scrollTo(0, st);
        }, 500);

    }

    private clear(st: number): void {
        
        if(!this.body) return;

        this.body.style.position = '';
        this.body.style.width = '';
        this.body.style.height = '';
        this.body.style.overflow = '';
        window.scrollTo(0, st);

    }
    
    private setCurrentNav(): void {

        const page_content: HTMLElement | null = document!.querySelector<HTMLElement>('.page-content');
        const page_id: string | null = page_content ? page_content.getAttribute('id') : null;
        const header_list_main: NodeListOf<HTMLElement> | null= document!.querySelectorAll<HTMLElement>('.l-header__nav--main > li > a');
        const header_list_sub: NodeListOf<HTMLElement> | null = document!.querySelectorAll<HTMLElement>('.l-header__nav--sub > li > a');

        if(!header_list_main || !header_list_sub) return;

        for (let i = 0; i < header_list_main.length; i++) {

            const data_current: string | null = header_list_main[i] ? header_list_main[i].getAttribute('data-current') : null;

            if(data_current == page_id) {
                header_list_main[i].classList.add('is-current');
            }

            setTimeout(() => {
                header_list_main[i].style.transition = 'color .2s linear';
            }, 500);
            
        }

        for (let i = 0; i < header_list_sub.length; i++) {

            const data_current: string | null = header_list_sub[i] ? header_list_sub[i].getAttribute('data-current') : null;

            if(data_current == page_id) {
                header_list_sub[i].classList.add('is-current');
            }

            setTimeout(() => {
                header_list_sub[i].style.transition = 'color .2s linear';
            }, 500);
            
        }

    }

    private hideHeader(): void {

        if(!this.header || !this.section_logo) return;

        if(window.innerWidth > 768 && this.section_logo) {

            this.header.style.display = 'none';
            
        }
        
        if(window.innerWidth <= 768 && this.section_logo) {

            this.header.classList.add('is-hide');
            this.section_logo.classList.add('is-hide');

        }

    }

}