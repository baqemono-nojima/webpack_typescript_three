export default class UserAgent {

    private tablet = false;
    private mobile = false;
    private android = false;
    private iphone = false;

    constructor(init?: Partial<UserAgent>) {

        Object.assign(this, init);

        this.init();
        this.addDevice();

    }

    private init(): void {
        const u: string | null= window.navigator.userAgent.toLowerCase();
        if(u) {
            this.tablet = (u.indexOf( "windows" ) !== -1 && u.indexOf( "touch" ) !== -1 && u.indexOf( "tablet pc" ) === -1)
                || u.indexOf( "ipad" ) !== -1
                || (u.indexOf( "android" ) !== -1 && u.indexOf( "mobile" ) === -1)
                || (u.indexOf( "firefox" ) !== -1 && u.indexOf( "tablet" ) !== -1)
                || u.indexOf( "kindle" ) !== -1
                || u.indexOf( "silk" ) !== -1
                || u.indexOf( "playbook" ) !== -1;
            this.mobile = (u.indexOf( "windows" ) !== -1 && u.indexOf( "phone" ) !== -1)
                || u.indexOf( "iphone" ) !== -1
                || u.indexOf( "ipod" ) !== -1
                || (u.indexOf( "android" ) !== -1 && u.indexOf( "mobile" ) !== -1)
                || (u.indexOf( "firefox" ) !== -1 && u.indexOf( "mobile" ) !== -1)
                || u.indexOf( "blackberry" ) !== -1;
            this.android = (u.indexOf( "android" ) !== -1 && u.indexOf( "mobile" ) !== -1);
            this.iphone = (u.indexOf( "iphone" ) !== -1) || u.indexOf( "ipod" ) !== -1;
        }
    }

    private addDevice(): void {
        const html: HTMLElement | null = document!.querySelector<HTMLElement>('html');
        if(html) {
            if (this.tablet) {
                html.setAttribute('class', 'is-tablet');
            } else if (this.mobile) {
                html.setAttribute('class', 'is-mobile');
            } else if (this.android) {
                html.setAttribute('class', 'is-android');
            } else if (this.iphone) {
                html.setAttribute('class', 'is-iphone');
            } else {
                html.setAttribute('class', 'is-others');
            }
        }
    }

    /**
     * https://qiita.com/Evolutor_web/items/162bfcf83695c83f1077
     */
    public getBrowser(): string {
        // const userAgent: string = window.navigator.userAgent.toLowerCase();
        // const ver: string = window.navigator.appVersion.toLowerCase();
        const ua: string = window.navigator.userAgent.toLowerCase();
        let name: string = 'unknown';
        let isIE: boolean | null = null;
        let ieVersion: any | null = null;

        if(ua.match(/(msie|MSIE)/) || ua.match(/(T|t)rident/) || ua.indexOf("edge") !== -1) {
            isIE = true;
            if(ua.match(/(msie|MSIE)/) || ua.match(/(T|t)rident/)) {
                // ieVersion = ua.match(/((msie|MSIE)\s|rv:)([\d\.]+)/)[3];
                ieVersion = parseInt(ieVersion);
            } else {
                ieVersion = 'edge';
            }
        } else {
            isIE = false;
        }

        if(isIE){
            name = 'ie' + ieVersion
        } else {
            if (ua.indexOf('chrome') !== -1) {
                name = 'chrome';
            } else if (ua.indexOf('safari') !== -1) {
                name = 'safari';
            } else if (ua.indexOf('opera') !== -1) {
                name = 'opera';
            } else if (ua.indexOf('firefox') !== -1) {
                name = 'firefox';
            }
        }

        return name;

    }

    /**
     * https://qiita.com/Evolutor_web/items/162bfcf83695c83f1077
     */
    public isSupported(browsers: any): boolean {
        const thusBrowser = this.getBrowser();
        for (let i = 0; i < browsers.length; i++) {
            if (browsers[i] === thusBrowser) {
                return true;
            }
        }
        return false;
    }

    /**
     * https://hacknote.jp/archives/6631/
     */
    public androidVersion(): number | null {
        const ua = window.navigator.userAgent.toLowerCase();
        if (ua.indexOf('android') > 0) {
            return parseFloat(ua.slice(ua.indexOf('android') + 8));
        }
        return null;
    }

    public isMajor(): boolean {
        return !(window.navigator.userAgent.indexOf('DoCoMo') === -1 && window.navigator.userAgent.indexOf("KDDI") === -1 && window.navigator.userAgent.indexOf('Vodafone') === -1 && window.navigator.userAgent.indexOf('SoftBank') === -1);
    }

    /**
     * https://hacknote.jp/archives/22633/
     */
    public iphoneVersion(): any {
        const u = window.navigator.userAgent.toLowerCase();
        let version = u.match(/iphone os ([\d]+)_([\d]+)_([\d]+)/);
        if (!version) {
            version = u.match(/iphone os ([\d]+)_([\d]+)/);
        }
        return version;
    }

    /**
     * https://qiita.com/narikei/items/ada44891cb0902efc165
     */
    public isAndroidBrowser(): boolean {
        const ua = window.navigator.userAgent.toLowerCase();
        return /android/.test(ua) && /linux; u;/.test(ua) && !/chrome/.test(ua);
    }

    public viewPort(device: any, width: any): void {
        // if (this[device]) {
            const viewPort: HTMLElement | null = document!.querySelector<HTMLElement>('meta[name="viewport"]');
            if(viewPort) {
                viewPort.setAttribute('content', 'width=' + width + ',user-scalable=no');
            }
        // }
    }

}