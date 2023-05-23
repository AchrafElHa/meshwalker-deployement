import { useLocation } from "react-router-dom";
import React, { useState, useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';


function OBJViewer() {
  const { state } = useLocation();
  const file = state.file;

  const [objUrl, setObjUrl] = useState(null);
  const [showObjViewer, setShowObjViewer] = useState(false);

  const containerRef = useRef(null);
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  const renderer = new THREE.WebGLRenderer();

  useEffect(() => {
    const handleWindowResize = () => {
      const { current: container } = containerRef;
      const width = container.clientWidth;
      const height = container.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener('resize', handleWindowResize);

    return () => window.removeEventListener('resize', handleWindowResize);
  }, []);

  useEffect(() => {
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function (event) {
      const url = URL.createObjectURL(new Blob([event.target.result], { type: 'text/plain' }));
      setObjUrl(url);
      setShowObjViewer(true);
    };
    reader.readAsText(file);
  }, [file]);

  useEffect(() => {
    if (!showObjViewer || !objUrl) return;

    const { current: container } = containerRef;

    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);

    const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
    camera.position.z = 5;

    const controls = new OrbitControls(camera, renderer.domElement);

    const scene = new THREE.Scene();
    scene.background = new THREE.Color( 0xffffff );
    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(1, 1, 1).normalize();
    scene.add(light);

    const loader = new OBJLoader();
    loader.load("https://4a48-34-126-139-41.ngrok-free.app/models/"+file.name, (object) => {
      console.log(object);
      scene.add(object);
    });

    function animate() {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    }
    animate();

    return () => {
      renderer.dispose();
      container.removeChild(renderer.domElement);
      scene.remove(...scene.children);
    };
  }, [showObjViewer, objUrl]);

  return <><main><div className="aboutus-holder"><br /><h1>file :</h1><br /><div ref={containerRef} className='description-holder'/></div></main></>;
}

export default OBJViewer;