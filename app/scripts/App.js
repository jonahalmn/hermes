// example import asset
// import imgPath from './assets/img.jpg';

import OBJLoader from 'three-obj-loader';
import OrbitControl from 'three-orbit-controls';
import sceneOBJ from '../objs/scene.obj'

import PointerLockControls from 'three-pointerlock';

import logoHermes from '../img/Logo_Hermes.png';
import logoSound from '../img/sound.svg';

// TODO : add Dat.GUI
// TODO : add Stats

let OrbitControls = OrbitControl(THREE);

export default class App {

    constructor() {

        this.curloadElt = document.querySelector('.curload');
        this.loaderElt = document.querySelector('.loader');
        this.uiElt = document.querySelector(".ui");
        this.logoImageElt = document.querySelector('.logohermes');
        this.soundImgElt = document.querySelector('.soundlogo');
        this.buttonEtl = document.querySelector('.go');

        this.buttonEtl.addEventListener('click', this.startExp.bind(this));

        this.logoImageElt.src = logoHermes;
        this.soundImgElt.src = logoSound;

        this.time = 0;

        this.container = document.querySelector( '#main' );
        document.body.appendChild( this.container );
        OBJLoader(THREE);
        this.loader = new THREE.OBJLoader();
        //console.log( THREE.OBJLoader());
        

        //this.pitchCam = new THREE.Object3D();

        this.camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 0.1, 1000 );

        //this.camera.y = 0.9;
        //this.camera.z = 0.3;

        this.controls = new PointerLockControls(this.camera);
        this.controls.enabled =false;
        //this.controls.getObject().position.z = -10;
        //this.controls = new OrbitControls(this.camera);


        this.scene = new THREE.Scene();

        this.scene.add(this.controls.getObject());

        this.setLights();

        // var axesHelper = new THREE.AxesHelper( 5 );
        // scene.add( axesHelper );

        var gridHelper = new THREE.GridHelper( 10, 10 );
        this.scene.add( gridHelper );

    	this.renderer = new THREE.WebGLRenderer( { antialias: true } );
    	this.renderer.setPixelRatio( window.devicePixelRatio );
        this.renderer.setSize( window.innerWidth, window.innerHeight );
        this.renderer.setClearColor(0xffffff, 1);
    	this.container.appendChild( this.renderer.domElement );

    	window.addEventListener('resize', this.onWindowResize.bind(this), false);
        this.onWindowResize();

        this.loadScene();

        this.controls.getObject().position.x = 25.47716;
        this.controls.getObject().position.z = 57.27199;

        this.renderer.animate( this.render.bind(this) );
    }

    setLights(){
        let light = new THREE.DirectionalLight( 0xffffff, 0.4 );
        light.position.z = -10;
        light.position.y = 10;
        this.scene.add( light );

        let light2 = new THREE.DirectionalLight( 0xffffff, 0.4 );
        light2.position.z = 10;
        light2.position.y = 10;
        this.scene.add( light2 );

        let light3 = new THREE.DirectionalLight( 0xffffff, 0.4 );
        light3.position.x = 2;
        light3.position.y = 10;
        this.scene.add( light3 );

        //let helper = new THREE.DirectionalLightHelper( light, 5 );

        //this.scene.add( helper );

        let ambient = new THREE.AmbientLight(0xffffff, 0.3);
        this.scene.add( ambient );
    }

    loadScene(){
        let material = new THREE.MeshPhongMaterial({color: 0x383838});
        this.loader.load(
            // resource URL
            sceneOBJ,
            // called when resource is loaded
            ( object ) => {
                object.scale.set(0.05, 0.05, 0.05);
                object.material = material;
                this.scene.add( object );
                this.loaderElt.style.opacity = 0;
                this.container.style.opacity = 1;
                setTimeout(()=>{
                    this.uiElt.style.opacity = 1;
                }, 2000);
        
            },
            // called when loading is in progresses
             ( xhr )=> {
        
                console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
                this.curloadElt.innerHTML = Math.floor(xhr.loaded / xhr.total * 100);
        
            },
            // called when loading has errors
            function ( error ) {
        
                console.log( 'An error happened' );
        
            }
        );
    }

    startExp(){
        this.uiElt.style.opacity =0;
        setTimeout(()=>{
            this.uiElt.style.display = "none";
        }, 2000);
        this.controls.enabled = true;
    }

    render() {

        //this.heading.y = Math.cos(this.time * 0.1);

        //this.updateCameraRotation();
        this.controls.update();
        //this.time++;
    	this.renderer.render( this.scene, this.camera );
    }

    updateCameraPosition(){

    }

    updateCameraRotation(){
        this.camera.rotation.x = this.heading.x;
        this.camera.rotation.y = this.heading.y;
    }

    onWindowResize() {

    	this.camera.aspect = window.innerWidth / window.innerHeight;
    	this.camera.updateProjectionMatrix();
    	this.renderer.setSize( window.innerWidth, window.innerHeight );
    }
}
