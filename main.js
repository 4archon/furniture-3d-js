import * as three from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

var container = document.getElementById("canvas");

const camera = new three.PerspectiveCamera( 45,
	container.clientWidth / container.clientHeight,1, 500 );
camera.position.set(7, 6, 4);
camera.lookAt(0, 0, 0);

const renderer = new three.WebGLRenderer({ antialias: true, logarithmicDepthBuffer: true });
renderer.setSize( container.clientWidth, container.clientHeight );
container.appendChild( renderer.domElement );

const scene = new three.Scene();
scene.background = new three.Color( 0xD3D3D3 );

var chair1;
var chair2;
var chair3;
var chair4;

var loader = new GLTFLoader();
loader.load( '/chair.glb', function ( gltf ) {

	var model = gltf.scene;
	var model2 = gltf.scene.clone();
	var model3 = gltf.scene.clone();
	var model4 = gltf.scene.clone();

	chair1 = model;
	chair2 = model2;
	chair3 = model3;
	chair4 = model4;

	model.position.x = 1;
	model.position.y = 1.013;
	model.position.z = -1.5;
	scene.add( model );
	model2.position.x = -1;
	model2.position.y = 1.013;
	model2.position.z = -1.05;
	scene.add( model2 );
	model3.position.x = -1;
	model3.position.y = 1.013;
	model3.position.z = 1.05;
	model3.rotation.y = Math.PI;
	scene.add( model3 );
	model4.position.x = 1;
	model4.position.y = 1.013;
	model4.position.z = 1.05;
	model4.rotation.y = Math.PI;
	scene.add( model4 );

}, undefined, function ( error ) {

	console.error( error );

} );

var table_met;

loader.load( '/table1.glb', function ( gltf ) {

	const model = gltf.scene;
	table_met = model;
	model.scale.set(0.6, 0.6, 0.6);
	model.position.y = 1.741;
	scene.add( model );

}, undefined, function ( error ) {

	console.error( error );

} );

var table_wood;

loader.load( '/table2.glb', function ( gltf ) {

	const model = gltf.scene;
	table_wood = model;
	model.scale.set(0.6, 0.6, 0.6);
	model.position.y = 1.741;
	scene.add( model );
	model.visible = false;

}, undefined, function ( error ) {

	console.error( error );

} );

var wall;

loader.load( '/wall.glb', function ( gltf ) {

	const model = gltf.scene;
	wall = model;
	model.scale.set(0.8, 0.8, 0.8);
	scene.add( model );

}, undefined, function ( error ) {

	console.error( error );

} );


var directionalLight = new three.DirectionalLight( 0xffffff, 0.5 );
directionalLight.position.x = 10;
scene.add( directionalLight );

// var directionalLight = new three.DirectionalLight( 0xffffff, 0.5 );
// directionalLight.position.x = -10;
// scene.add( directionalLight );

var directionalLight = new three.DirectionalLight( 0xffffff, 0.5 );
directionalLight.position.z = 10;
scene.add( directionalLight );

var directionalLight = new three.DirectionalLight( 0xffffff, 0.5 );
directionalLight.position.z = -10;
scene.add( directionalLight );

var directionalLight = new three.DirectionalLight( 0xffffff, 0.5 );
directionalLight.position.y = 10;
scene.add( directionalLight );

var directionalLight = new three.DirectionalLight( 0xffffff, 0.5 );
directionalLight.position.y = -10;
scene.add( directionalLight );


const controls = new OrbitControls( camera, renderer.domElement );

renderer.setAnimationLoop(animate);
function animate() {
	controls.update();
	renderer.render( scene, camera );
}

function change_table() {
	if (table_switch.value == '1') {
		if (table_met && table_wood) {
			table_met.visible = false;
			table_wood.visible = true;
		}
	}
	else {
		if (table_met && table_wood) {
			table_wood.visible = false;
			table_met.visible = true;
		}
	}
}

var table_switch = document.getElementById("table");
table_switch.onchange = change_table;

function hide_chairs() {
	chair2.visible = false;
	chair3.visible = false;
	chair4.visible = false;
}

function change_chair() {
	if (chair_switch.value == '1') {
		if (chair1 && chair2 && chair3 && chair4) {
			hide_chairs();
		}
	}
	else if (chair_switch.value == '2') {
		if (chair1 && chair2 && chair3 && chair4) {
			hide_chairs();
			chair2.visible = true;
		}
	}
	else if (chair_switch.value == '3') {
		if (chair1 && chair2 && chair3 && chair4) {
			hide_chairs();
			chair2.visible = true;
			chair3.visible = true;
		}
	}
	else {
		if (chair1 && chair2 && chair3 && chair4) {
			hide_chairs();
			chair2.visible = true;
			chair3.visible = true;
			chair4.visible = true;
		}
	}
}

var chair_switch = document.getElementById("chairs");
chair_switch.onchange = change_chair;
