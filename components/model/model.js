import React, { Component } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { THREE } from "expo-three";
import { GLView } from "expo-gl";
import * as dat from 'dat.gui';
import { Renderer } from "expo-three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { Asset } from 'expo-asset';

let glData;
let model;

let RENDERER = new THREE.WebGLRenderer();

RENDERER.setSize(window.innerWidth, window.innerHeight);
RENDERER.physicallyCorrectLights = true;

let scene = new THREE.Scene();
let light = new THREE.DirectionalLight(0xffffff, 1.0);

let camera = new THREE.PerspectiveCamera(
	70,
	window.innerWidth / window.innerHeight,
	0.1,
	1000
);

let group = new THREE.Object3D();

let INTERSECTED = null;
let raycaster = new THREE.Raycaster();
let mouse = new THREE.Vector2( Infinity, Infinity );

class Model extends Component {

  constructor(props) {
    super(props);

    this.state = {
      Responses: [{
		label: "52TheparadewithSpaces.ifc",
		value: "7abf64d1-0fa8-4485-930f-b174eb814dd4",
	  }],
      language: '',
      content: '',
      cam: ''
    }
  }

  UNSAFE_componentWillMount() {
    // fetch('https://bim.constology.com/api/model/', {
    //     method: 'GET',
    //     headers: {
    //         Accept: 'application/json',
    //         'Content-Type': 'application/json'
    //     },
    // })
    // .then((res) => {
    //     res.json().then(json => {
    //         let editedArray = [];
    //         json.data.map((item, index) => {
    //             let newArray = {};
    //             newArray.value = item.public_id;
    //             newArray.label = (index+1) +". " + item.name;
    //             editedArray[index] = newArray;
    //         });
    //         this.setState({Responses: editedArray});
    //     });
    // })
    // .catch((error) => {
    //     console.error(error);
    // });

	// window.addEventListener( 'mousemove', this.onMouseMove );
	// window.addEventListener( 'click', this.onMouseClick );
	// window.addEventListener( 'resize', this.onWindowResize );
  }

	// onMouseMove = ( event ) => {
	// 	// console.log("move")
		
	// 	event.preventDefault();
	
	// 	mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
	// 	mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

	// }

	// onMouseClick = ( event ) => {
	// 	// console.log("click: ", event);
	// 	this.raycast();

	// }

	// onWindowResize = () => {
	// 	camera.aspect = window.innerWidth / window.innerHeight;
	// 	camera.updateProjectionMatrix();
	// 	RENDERER.setSize( window.innerWidth, window.innerHeight );

	// }

	// raycast = () => {

	// 	raycaster.setFromCamera( mouse, camera );
	// 	var intersects = raycaster.intersectObjects( scene.children, true );
	// 	// console.log(intersects, "raycast", scene.children)

	// 	if ( intersects.length > 0 ) {

	// 		if ( INTERSECTED != intersects[ 0 ].object ) {

	// 			if ( INTERSECTED ) INTERSECTED.material.color.setHex( INTERSECTED.currentHex );
	
	// 			INTERSECTED = intersects[ 0 ].object;
	// 			INTERSECTED.currentHex = INTERSECTED.material.color.getHex();
	// 			INTERSECTED.material.color.setHex( 0xef0d0d );
	
	// 		}

	// 	} else {
	// 		// console.log("INTERSECTED", INTERSECTED)
	// 		if ( INTERSECTED ) INTERSECTED.material.color.setHex( INTERSECTED.currentHex );

	// 		INTERSECTED = null;

	// 	}

	// }

  	displayModelContent = (value, id) => {
		if(window.cam){
			window.cam.hide();
		}
		this.setState({language: value});
		this.state.Responses.map((item) => {
			if(item.value == value) {
				this.setState({content: item.value});
			}
			else {
				return false
			}
		});
		this._onGLContextCreate(glData, id);
  	};

	_onGLContextCreate = async (gl, id) => {
		glData = gl;

		// if(id){
		// 	window.gui = new dat.GUI();
		// 	window.cam = window.gui.addFolder('Camera Position');
		// 	window.cam.add(camera.position, 'z', -200, 500).listen();
		// 	window.cam.add(camera.position, 'x', -200, 500).listen();
		// 	window.cam.add(camera.position, 'y', -200, 500).listen();
		// 	window.cam.open();
		// }

		const renderer = new Renderer({ gl });

		// renderer.setSize(gl.drawingBufferWidth, gl.drawingBufferHeight);

		const asset = Asset.fromModule(require('../../assets/house.glb'));
		await asset.downloadAsync();

		const loader = new GLTFLoader();
		window.condition = '';
		if(id) {
			loader.load(
				asset.localUri,
				function (gltf) {
					window.condition = gltf;
					model = gltf.scene;
					model.rotation.y = 3.7;
					group.add(model);
					console.log(group);
					scene.add(group);
				},
				function (xhr) {},
				function (error) {if(!window.condition && id) {alert("This file is not exist!")}}
			);
			light.position.set(0, 1, 1);
			scene.add(light);
		}
		
		
		const animate = () => {
			requestAnimationFrame(animate);
			renderer.render(scene, camera);
			gl.endFrameEXP();
		}
		animate();
	};

	

  	render() {
    	return (
      		<GLView style={{ flex: 1 }} onContextCreate={(e)=>{this._onGLContextCreate(e, this.state.content)}}>
        		<View>
          			<TouchableOpacity>
              			{this.state.Responses === []?"":
              			<RNPickerSelect
						placeholder={{
							value: 'Dropdown',
							label: 'Please Select 3D Model',
						}}
						items={this.state.Responses}
                  		onValueChange={(label) => {
                    		this.displayModelContent(label, this.state.content)}
                  		}
                  		value={this.state.language}
              			/>}
					</TouchableOpacity>
					<View>
						<Text>{this.state.content}</Text>
					</View>
				</View>
			</GLView>
    	);
  	}
}

export default Model;