// @ts-ignore
import * as THREE from 'three';

import RawShader from './modules/RawShader';
import Fx from './modules/Fx';

import 'imports-loader?THREE=three!three/examples/js/controls/OrbitControls.js';
// import 'imports-loader?THREE=three!three/examples/js/controls/OrbitControls.js';
// const OrbitControls = require('imports-loader?THREE=three!three/examples/js/controls/OrbitControls.js');

const dat = require('dat.gui');

// import Stats 'stats-js';
const Stats = require('stats-js');

export default class Stage {

    private is_rendering = true;

    private camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 1000);

    private scene = {
        base: new THREE.Scene(),
        fx: new THREE.Scene(),
    };

    private renderer = new THREE.WebGLRenderer( {
        antialias: true,
        alpha: true
    });

    private renderer_target_elm = new THREE.WebGLRenderTarget(
        window.innerWidth,
        window.innerHeight,
        {
            magFilter: THREE.NearestFilter,
            minFilter: THREE.NearestFilter,
            wrapS: THREE.ClampToEdgeWrapping,
            wrapT: THREE.ClampToEdgeWrapping,
        }
    );

    private renderer_target = {
        base: this.renderer_target_elm.clone(),
    }

    private controls = null;
    
    private cnt = 0;

    private speed = 1;

    private mouse = {
        x: 0,
        y: 0
    };

    private mouse_pos = {
        x: 0,
        y: 0
    };

    private mouse_ratio = {
        x: .1,
        y: .1
    };

    private raw_shader: any | null = new RawShader();

    private fx: any | null = new Fx(this.renderer_target.base.texture);

    private stats = new Stats();

    private dat = new dat.GUI();

    private window_inner_width = window.innerWidth;
    private window_inner_height = window.innerHeight;
    private SWITCH_WIDTH = 768;
    private dpr = window.devicePixelRatio || 1;

    private stage: HTMLElement | null = <HTMLElement>document!.getElementById('stage');
    
    constructor(init?: Partial<Stage>) {

        Object.assign(this, init);

    }

    public setup(): void {

        if(!this.stage) return;

        this.camera.position.z = 2;
        this.camera.lookAt(0, 0, 0);

        this.renderer.setClearColor(0x000000, 0.);
        this.renderer.setPixelRatio(window.devicePixelRatio || 1);

        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer_target.base.setSize(window.innerWidth * this.dpr, window.innerHeight * this.dpr);

        this.controls = new THREE.OrbitControls(this.camera, this.renderer.domElement);

        this.raw_shader.setup();
        this.scene.base.add(this.raw_shader.mesh);

        this.fx.setup();
        this.scene.fx.add(this.fx.mesh);

        this.stage.appendChild(this.renderer.domElement);

        window.addEventListener('resize', this.resize.bind(this));

        this.stage.addEventListener('mousemove', e => {
            this.mouse = {
                x: (2 * e.clientX - window.innerWidth) / window.innerWidth,
                y: (-1 * (2 * e.clientY - window.innerHeight) / window.innerHeight)
            };
        });

        // this.stats.setup();
        this.datSetup();

    }

    public update(): void {

        this.cnt += this.speed;
        this.cnt = this.cnt % 360;

        this.mouse_pos.x += (this.mouse.x - this.mouse_pos.x) * this.mouse_ratio.x;
        this.mouse_pos.y += (this.mouse.y - this.mouse_pos.y) * this.mouse_ratio.y;

        this.raw_shader.update(this.cnt);
        this.fx.update(this.cnt);

        this.raw_shader.mouseMoved(this.mouse_pos.x, this.mouse_pos.y);

        // this.stats.update();

    }

    public render(): void {

        this.update();

        this.renderer.render(this.scene.base, this.camera, this.renderer_target.base);
        this.renderer.render(this.scene.fx, this.camera);

        window.addEventListener('keydown', (e) => {
            this.is_rendering = e.keyCode !== 27;
        }, false);
        if (this.is_rendering) requestAnimationFrame(this.render.bind(this));

    }

    public resize(): void {

        this.window_inner_width = window.innerWidth;
        this.window_inner_height = window.innerHeight;

        this.camera.aspect = this.window_inner_width / this.window_inner_height;
        this.camera.updateProjectionMatrix();

        this.renderer.setSize(this.window_inner_width, this.window_inner_height);
        this.renderer_target.base.setSize(window.innerWidth * this.dpr, window.innerHeight * this.dpr);

        this.raw_shader.resize(this.window_inner_width, this.window_inner_height);

    }

    public scroll(st: number): void {
    }

    public destroy(): void {
    }

    private datSetup(): void {
        
        /**
         *
         * @type {color}
         */
        const color = {
            // @ts-ignore
            controls: new function() {
                // @ts-ignore
                this.R = 1;
                // @ts-ignore
                this.G = 1;
                // @ts-ignore
                this.B = 1;
            },
            folder: this.dat.addFolder('color')
        }

        color.folder.add(color.controls, 'R', 0, 1, 0.01).onChange((value: number) => {
            this.raw_shader.uniforms.color_r.value = value;
        });

        color.folder.add(color.controls, 'G', 0, 1, 0.01).onChange((value: number) => {
            this.raw_shader.uniforms.color_g.value = value;
        });

        color.folder.add(color.controls, 'B', 0, 1, 0.01).onChange((value: number) => {
            this.raw_shader.uniforms.color_b.value = value;
        });

        color.folder.open();

        /**
         *
         * @type {noise}
         */
        const noise = {
            // @ts-ignore
            controls: new function() {
                // @ts-ignore
                this.range = 1;
            },
            folder: this.dat.addFolder('noise')
        }

        noise.folder.add(noise.controls, 'range', 1, 10, 0.01).onChange((value: number) => {
            this.raw_shader.uniforms.noise_range.value = value;
        });

        noise.folder.open();

    }

}

// @ts-ignore
window.Stage = Stage;