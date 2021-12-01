
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
// import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import Stats from 'three/examples/jsm/libs/stats.module'
import { GUI } from 'three/examples/jsm/libs/lil.gui.module'

let scene, camera, renderer, sphere;
var controls;

main();
sphereGeo();
animate();

function main() {   //mandatory
    renderer = new THREE.WebGLRenderer({alpha:true});
    const fov = 75;
    const aspect = window.innerWidth/window.innerHeight;  // the canvas default
    const near = 0.1;
    const far = 100;
    camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    camera.position.z = 2;

    scene = new THREE.Scene();
    controls = new OrbitControls(camera, renderer.domElement)
    controls.enableZoom = true;

    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( window.innerWidth, window.innerHeight );
    renderer.setClearColor( 0x000000, 1 );
    document.body.appendChild(renderer.domElement);

    controls = new OrbitControls(camera, renderer.domElement)

}
function sphereGeo(){
    const geometry = new THREE.SphereBufferGeometry();
    
    // const material = new THREE.MeshPhongMaterial({color:'grey'});
    const texture = new THREE.TextureLoader().load('layout/test.png');
    const material = new THREE.MeshPhongMaterial({map: texture});

    sphere = new THREE.Mesh(geometry, material);

    scene.add(sphere);
    // add light on the scene
    const color = 0xFFFFFF;
    const intensity = 2;
    const light = new THREE.DirectionalLight(color, intensity);
    light.position.set(1,2,2); // (left-right, up-down,front-behind) 
    scene.add(light);
}



function animate() {    //mandatory
    requestAnimationFrame(animate);
    sphere.rotation.x += 0.00;
    sphere.rotation.y += 0.01;
    controls.update()
    renderer.render(scene, camera);
}

function onWindowResize() {     //mandatory
    // Camera frustum aspect ratio
    camera.aspect = window.innerWidth / window.innerHeight;
    // After making changes to aspect
    camera.updateProjectionMatrix();
    // Reset size
    renderer.setSize(window.innerWidth, window.innerHeight);
}


window.addEventListener('resize', onWindowResize, false);
