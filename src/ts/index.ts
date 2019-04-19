import VcRouter from './app/routers/VcRouter';
import BaseControllerManager from './app/base/BaseControllerManager';

import Utility from './utility/Utility';
import UserAgent from './utility/UserAgent';

require('./_dev');
// require('waypoints/lib/noframework.waypoints.min.js');


/**
 *
 * @type {GlobalVariable}
 * @public
 */

declare global {
    interface Window {

        ua: any;
        uaName: string;
        MOBILE: boolean;
        TABLET: boolean;
        OTHER: boolean;
        IE: boolean;

        WHEEL_RATIO: number;
        page_initialized: boolean;

        ease_pack: any[];

        // WAYPOINT: any[];

    }
}

window.ua = new UserAgent();
window.uaName = window.ua.getBrowser();
window.MOBILE = window.ua.mobile;
window.TABLET = window.ua.tablet;
window.OTHER = !window.MOBILE && !window.TABLET;
window.IE = window.uaName.match(/ie/) ? true : false;
window.WHEEL_RATIO = 'firefox' === window.uaName ? 100 : 1;
window.page_initialized = false;
window.ease_pack = [{
    expo: {
        in: Utility.getCubicCurve(0.95, 0.05, 0.795, 0.035),
        out: Utility.getCubicCurve(0.19, 1, 0.22, 1),
        inOut: Utility.getCubicCurve(1, 0, 0, 1),
    },
    quint: {
        in: Utility.getCubicCurve(0.755, 0.05, 0.855, 0.06),
        out: Utility.getCubicCurve(0.23, 1, 0.32, 1),
        inOut: Utility.getCubicCurve(0.86, 0, 0.07, 1),
    },
    circ: {
        in: Utility.getCubicCurve(0.6, 0.04, 0.98, 0.335),
        out: Utility.getCubicCurve(0.075, 0.82, 0.165, 1),
        inOut: Utility.getCubicCurve(0.785, 0.135, 0.15, 0.86),
    }
}];

/**
 * @type {ViewController}
 */
const page_content: HTMLElement | null = document!.querySelector<HTMLElement>('.page-content');
const viewController: any = page_content ? new BaseControllerManager(VcRouter).getController(null, page_content) : null;

window.addEventListener('DOMContentLoaded', () => {

    viewController.viewWillLoad();

    setTimeout( () => {
        viewController.viewDidLoad();
    }, 500);

}, false);

window.addEventListener('load', () => {

    viewController.viewWillAppear();

    setTimeout( () => {
        viewController.viewDidAppear();
    }, 500);

}, false);


/**
 *
 * @type {Resize}
 * @public
 */
const INIT_WIDTH: number = window.innerWidth;

window.addEventListener('resize', () => {
    if(INIT_WIDTH > 768) {
        if (window.innerWidth <= 768) {
            location.reload();
        }
    } else {
        if (window.innerWidth > 768) {
            location.reload();
        }
    }
}, false);


/**
 *
 * @type {Waypoint}
 * @public
 */
// window.WAYPOINT =[];

// let triger_fix = document.querySelectorAll<HTMLElement>('.js-waypoint__fix');
// for (let i = 0; i < triger_fix.length; i++) {

//     let waypoint = new Waypoint({
//         element: triger_fix[i],
//         handler: function(direction) {

//             this.element.classList.add('is-start');

//             setTimeout(() => {
//                 this.element.classList.add('is-end');
//             }, 750);

//         },
//         offset: '75%'
//     });

//     window.WAYPOINT.push(waypoint);

// }