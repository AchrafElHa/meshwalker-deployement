import React, { useRef, useState, useEffect} from 'react';
import * as THREE from 'three';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

function OBJViewer(props){
    useEffect(()=>{
    const scene = new THREE.Scene();
    //const ambientLight = new THREE.AmbientLight( 0xcccccc, 0.4 );
		//scene.add( ambientLight );

    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;
    const pointLight = new THREE.PointLight( 0xffffff, 0.8 );
		camera.add( pointLight );
		scene.add( camera );

    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(500, 500);
    document.getElementById("objViewerDiv").appendChild(renderer.domElement);
    const controls = new OrbitControls(camera, renderer.domElement);
    renderer.render(scene, camera);
    console.log('Component mounted!');

  const loader = new OBJLoader();

  loader.load(props.url, function(obj) {
    let geometry = obj.children[0].geometry;
    scene.add(obj);
    console.log(geometry.attributes.position.array,"obj object");
  if (props.segmentation != null){
    let colors_ = [[255,0,0,1],[0,255,0,1],[0,0,255,1],[255,255,0,1],[255,0,255,1],[0,255,255,1],[0,0,0,1],[255,255,255,1]]
    let colorisation = []
    console.log(props.segmentation,geometry.attributes.position.count/3,"segmentation");
    for (let i=0;i<geometry.attributes.position.count/3;i++){
      try{
        let tmp = colors_[props.segmentation[i]-1]
        colorisation.push(tmp[0],tmp[1],tmp[2],tmp[3]);
        colorisation.push(tmp[0],tmp[1],tmp[2],tmp[3]);
        colorisation.push(tmp[0],tmp[1],tmp[2],tmp[3]);

        }
      catch {console.log("error",props.segmentation[i]-1);}
    }
    const material = new THREE.MeshBasicMaterial({
      vertexColors: true
  });
  geometry.setAttribute( 'color', new THREE.Float32BufferAttribute( colorisation, 4 ));
    let mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);
    render();
    
  }


  });
  function render() {

    window.requestAnimationFrame( render );
    controls.update();
    renderer.render( scene, camera );

  }

  render();
  return () => {
    renderer.dispose();
    document.getElementById("objViewerDiv").removeChild(renderer.domElement);
    scene.remove(...scene.children);
  };
}, [props.url]);

}

export default OBJViewer;
