import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
// import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import Stats from 'three/examples/jsm/libs/stats.module'
import { GUI } from 'three/examples/jsm/libs/lil.gui.module'


let scene, camera, renderer, cube;

main();
texturedcube(scene);
animate();

function main() {   //mandatory
    renderer = new THREE.WebGLRenderer();
    const fov = 75;
    const aspect = window.innerWidth/window.innerHeight;  // the canvas default
    const near = 0.1;
    const far = 100;
    camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    camera.position.z = 2;

    scene = new THREE.Scene();

    renderer.setSize(window.innerWidth,window.innerHeight)
    document.body.appendChild(renderer.domElement);
}
function texturedcube(scene){
    const boxWidth = 1;
    const boxHeight = 1;
    const boxDepth = 1;
    const geometry = new THREE.BoxGeometry(boxWidth, boxHeight, boxDepth);
    
    // const material = new THREE.MeshBasicMaterial({color:'grey'});
    const texture = new THREE.TextureLoader().load('textures/crate.gif');
    const material = new THREE.MeshPhongMaterial({map: texture});

    cube = new THREE.Mesh(geometry, material);
    // cube.position(5,5,0)
    scene.add(cube);
    // add light on the scene
    const color = 0xFFFFFF;
    const intensity = 1;
    const light = new THREE.AmbientLight(color, intensity);
    light.position.set(3,1,2); // (left-right, up-down,front-behind) 
    scene.add(light);
}



function animate() {    //mandatory
    requestAnimationFrame(animate);
    cube.rotation.x += 0.01
    cube.rotation.y += 0.02
    
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
