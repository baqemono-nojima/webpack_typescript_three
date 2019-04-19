// @ts-ignore
import * as THREE from 'three';

const vertexShader = require('../shaders/fx.vs');
const fragmentShader = require('../shaders/fx.fs');

export default class Fx {

    private uniforms = {
        time: {
            type: 'f',
            value: 0.
        },
        resolution: {
            type: 'v2',
            value: new THREE.Vector2()
        },
        alpha: {
            type: 'f',
            value: 1,
        },
        dpr: {
            type: 'f',
            value: window.devicePixelRatio || 1
        },
        texture: {
            type: 't',
            value: null
        },
    };

    private geometry: any | null = null;

    private material: any | null = null;

    private mesh: any | null = null;

    constructor(texture: any, init?: Partial<Fx>) {

        Object.assign(this, init);
        this.uniforms.texture.value = texture;

    }

    public setup(): void {

        this.geometry = new THREE.PlaneBufferGeometry(2, 2);

        this.material = new THREE.RawShaderMaterial( {
            vertexShader: vertexShader,
            fragmentShader: fragmentShader,
            uniforms: this.uniforms,
            transparent: true,
            side: THREE.DoubleSide,
        });

        this.mesh = new THREE.Mesh(this.geometry, this.material);
        this.mesh.material.dispose();
        this.mesh.geometry.dispose();

        this.uniforms.resolution.value.x = window.innerWidth;
        this.uniforms.resolution.value.y = window.innerHeight;

    }

    public update(cnt: number): void {

        this.uniforms.time.value = THREE.Math.degToRad(cnt);

    }

    public resize(width: number, height: number): void {

        this.uniforms.resolution.value.x = width;
        this.uniforms.resolution.value.y = height;

    }

    public mouseMoved(x: number, y: number): void {

        this.mesh.position.x = x * .1;
        this.mesh.position.y = y * .1;

    }

}