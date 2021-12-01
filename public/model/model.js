import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import Stats from 'three/examples/jsm/libs/stats.module'
import { GUI } from 'three/examples/jsm/libs/lil.gui.module'

let scene, camera, renderer;

main();


function main() {   //mandatory
    renderer = new THREE.WebGLRenderer({alpha:true});
    const fov = 75;
    const aspect = window.innerWidth/window.innerHeight;  // the canvas default
    const near = 0.1;
    const far = 100;
    camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    camera.position.z = 2;
    camera.position.y = 2;

    scene = new THREE.Scene();
    scene.background = new THREE.Color('#FBFFFF');
    var controls = new OrbitControls( camera, renderer.domElement );
    controls.enablePan = false;
    var blockedAngle = 0.25;
    controls.minPolarAngle = blockedAngle;
    controls.maxPolarAngle = Math.PI - blockedAngle;
    controls.minDistance = 1.2;
    controls.maxDistance = 4;
    camera.position.set(1.1, 1.1, 1.3);
    camera.lookAt(new THREE.Vector3(0, 0, 0));
    controls.update();    

    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( window.innerWidth, window.innerHeight );
    renderer.setClearColor( 0x000000, 1 );
    document.body.appendChild(renderer.domElement);

    let ambientLight = new THREE.AmbientLight(new THREE.Color('hsl(0, 0%, 100%)'), 3);
    scene.add(ambientLight);

    let directionalLightBack = new THREE.DirectionalLight(new THREE.Color('hsl(0, 0%, 100%)'), 2);
    directionalLightBack.position.set(30, 100, 100);
    scene.add(directionalLightBack);

    let directionalLightFront = new THREE.DirectionalLight(new THREE.Color('hsl(0, 0%, 100%)'), 2);
    directionalLightFront.position.set(-30, 100, -100);
    scene.add(directionalLightFront);
    scene.translateY(-1);

}

function animate() {    //mandatory
    requestAnimationFrame(animate);
    // sphere.rotation.x += 0.01;
    // sphere.rotation.y += 0.02;
    
    renderer.render(scene, camera);
}

const loader = new GLTFLoader();

loader.load( './objects/Biomech_Mutant_Skin_1.glb', function ( gltf ) {
 
    scene.add( gltf.scene );

}, undefined, function ( error ) {

    console.error( error );

} );


function onWindowResize() {     //mandatory
    // Camera frustum aspect ratio
    camera.aspect = window.innerWidth / window.innerHeight;
    // After making changes to aspect
    camera.updateProjectionMatrix();
    // Reset size
    renderer.setSize(window.innerWidth, window.innerHeight);
}


window.addEventListener('resize', onWindowResize, false);
animate();