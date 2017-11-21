
import { Scene, PerspectiveCamera, WebGLRenderer, CanvasRenderer, Vector3, LineBasicMaterial, Geometry, Line, BoxBufferGeometry, Mesh, MeshBasicMaterial } from 'three';
import OrbitControls from "./OrbitControls";

function webglAvailable() {
    try {
        var canvas = document.createElement( 'canvas' );
        return !!( window.WebGLRenderingContext && (
            canvas.getContext( 'webgl' ) ||
            canvas.getContext( 'experimental-webgl' ) )
        );
    } catch ( e ) {
        return false;
    }
}

var scene = new Scene();
var camera = new PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 500);
camera.position.set(0, -300, 300);
camera.lookAt(new Vector3(0, 0, 0));

var renderer;
if ( webglAvailable() ) {
    renderer = new WebGLRenderer();
} else {
    renderer = new CanvasRenderer();
}

renderer.setSize( window.innerWidth, window.innerHeight );
document.getElementById("container").appendChild( renderer.domElement );

let geometry = new BoxBufferGeometry( 60, 60, 60 );
let material = new MeshBasicMaterial( { color: 0xff0000, wireframe: true } );
let mesh = new Mesh( geometry, material );

scene.add( mesh );

let controls = new OrbitControls( camera, renderer.domElement );
controls.addEventListener( 'change', render ); // remove when using animation loop
// enable animation loop when using damping or autorotation
//controls.enableDamping = true;
//controls.dampingFactor = 0.25;
controls.enableZoom = false;

//controls.update() must be called after any manual changes to the camera's transform
camera.position.set( 0, 100, 300 );
controls.update();
controls.addEventListener( 'change', render ); // remove when using animation loop

function render() {
    renderer.render( scene, camera );
}

var ang = 0;
var toRad = Math.PI / 180;
function animate() {
    requestAnimationFrame( animate );

    ang += 0.3;
    ang = (ang > 360) ? 0 : ang;

    let x = Math.cos(ang * toRad) * 300;
    let z = Math.sin(ang * toRad) * 300;

    camera.position.set(x, 200, z);
    controls.update(); // required if controls.enableDamping = true, or if controls.autoRotate = true
    render();
}

render();
animate();
