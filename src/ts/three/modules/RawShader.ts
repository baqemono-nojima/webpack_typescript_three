// @ts-ignore
import * as THREE from 'three';

const vertexShader = require('../shaders/rawshadermesh.vs');
const fragmentShader = require('../shaders/rawshadermesh.fs');

export default class RawShader {

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
        color_r: {
            type: 'f',
            value: 1,
        },
        color_g: {
            type: 'f',
            value: 1,
        },
        color_b: {
            type: 'f',
            value: 1,
        },
        noise_range: {
            type: 'f',
            value: 1,
        },
    };

    private geometry: any | null = null;

    private material: any | null = null;

    private mesh: any | null = null;

    constructor(init?: Partial<RawShader>) {

        Object.assign(this, init);

    }

    public setup(): void {

        // this.geometry = new THREE.PlaneBufferGeometry(1, 1, 1);
        this.geometry = new THREE.SphereBufferGeometry(.65, 64, 64);

        this.material = new THREE.RawShaderMaterial( {
            vertexShader: vertexShader,
            fragmentShader: fragmentShader,
            uniforms: this.uniforms,
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