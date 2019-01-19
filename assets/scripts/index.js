let scene = new THREE.Scene();
let renderer = new THREE.WebGLRenderer();
let raycaster = new THREE.Raycaster();
let mouse = new THREE.Vector2();
let sceneWidth = 400;
let sceneHeight = 500;
let camera = new THREE.OrthographicCamera(sceneWidth / -2, sceneWidth / 2, sceneHeight / 2, sceneHeight / -2, .1, 99999);

let shapes= [];
let shape_name;
let shape_id;
let shape_color;
let red = '0xff0000';

initializeScene(scene);

let button = document.querySelector('button');
button.addEventListener('click', getData);

// GET request on button click. Finds shape's NAME associated with ID and loads shape on canvas.
function getData(e) {
    e.preventDefault();
    let query = document.querySelector('input').value;

    $.ajax({
        type: 'GET',
        url: '/id',
        data: {
            'shape_id': query,
        },
        success: function(msg){
            if(msg.length === 0) {
                alert('ID not found');
            } else {
                let data = msg.split(' ');
                shape_name = data[0];
                shape_color = data[1];
                shape_id = data[2];
                loadShape(shape_name, shape_color);
            }
        }
    });
}

// Loads shape based on NAME
// Figure - shape's NAME, Color - shape's COLOR
function loadShape(figure, color) {
    clearScene(scene);

    switch(figure) {
        case 'cube':
            loadCube(color);
            break;
        case 'sphere':
            loadSphere(color);
            break;
        case 'lathe' :
            loadLathe(color);
            break;
        default:
            break;
    }
}

// Removes all shapes from canvas
function clearScene(scene) {
    shapes.forEach(function(item) {
        scene.remove(item);
    });
}

// Prepares scene
function initializeScene(scene) {
    // Setup camera
    camera.position.set(250, 250, 250);
    camera.lookAt(scene.position);

    let container = document.getElementById('canvas');

    // Setup renderer
    renderer.setClearColor(0xdddddd);
    renderer.setSize(sceneWidth, sceneHeight);
    container.appendChild(renderer.domElement);

    // Camera controls
    let controls = new THREE.OrbitControls(camera, container);

    // Axis
    let axesHelper = new THREE.AxesHelper(50);
    scene.add(axesHelper);

    // color
    let color = new THREE.Color('rgb(255, 0, 0)');

    // grid
    let grid = new THREE.GridHelper(100, 5, color, 0x000000);
    scene.add(grid);

    // plane
    let planeGeo = new THREE.PlaneGeometry(100, 100, 100);
    let planeMaterial = new THREE.MeshLambertMaterial();
    let plane = new THREE.Mesh(planeGeo, planeMaterial);
    plane.rotation.x = -.5*Math.PI;
    scene.add(plane);

    // spot light
    let spotLight = new THREE.SpotLight(0xffffff);
    spotLight.position.set(70, 50, 20);
    scene.add(spotLight);

    let canvas = document.querySelector('canvas');
    canvas.addEventListener('click', clickOnShape);

    animate(sceneWidth, sceneHeight, container);
    canvas.addEventListener('mousemove', onMouseMove, false);
}

// Loads Cube shape on canvas
function loadCube(color) {
    let cubeGeo = new THREE.BoxGeometry(15, 15, 15);
    let cubeMaterial = new THREE.MeshLambertMaterial({ color: parseInt(color) });
    let cube = new THREE.Mesh(cubeGeo,cubeMaterial);
    cube.position.set(0, 7.5, 0);
    cube.castShadow = true;
    cube.receiveShadow = false;
    scene.add(cube);
    shapes.push(cube);
}

// Loads Sphere shape on canvas
function loadSphere(color) {
    let geometry = new THREE.SphereGeometry(15, 15, 15);
    let material = new THREE.MeshBasicMaterial( {color: parseInt(color)} );
    let sphere = new THREE.Mesh(geometry, material);
    sphere.position.set(0, 15, 0);
    scene.add(sphere);
    shapes.push(sphere);
}

// Loads Lathe shape on canvas
function loadLathe(color) {
    let points = [];
    for (let i = 0; i < 10; i ++) {
        points.push(new THREE.Vector2(Math.sin(i * 0.2) * 10 + 5, (i - 5) * 2));
    }
    let geometry = new THREE.LatheGeometry(points);
    let material = new THREE.MeshBasicMaterial({ color: parseInt(color) });
    let lathe = new THREE.Mesh(geometry, material);
    scene.add(lathe);
    lathe.position.set(0, 10, 0);
    shapes.push(lathe);
}

// Calculates mouse position (needed for raycasting)
function onMouseMove(event) {
    mouse.x = ((event.clientX - renderer.domElement.offsetLeft) / renderer.domElement.clientWidth) * 2 - 1;
    mouse.y = - ((event.clientY - renderer.domElement.offsetTop) / renderer.domElement.clientHeight) * 2 + 1;
}

// When clicked on shape change shape's COLOR, send PATCH request to server
function clickOnShape() {
    raycaster.setFromCamera(mouse, camera);
    let intersects = raycaster.intersectObjects(scene.children);

    if (intersects[0].object.geometry.type === 'BoxGeometry'
        || intersects[0].object.geometry.type === 'LatheGeometry'
        || intersects[0].object.geometry.type === 'SphereGeometry')
    {
        intersects[0].object.material.color.set(parseInt(red));

        if(shape_color !== red)
            sendPatchRequest(red);
    }
}

// PATCH request, updates shape's COLOR
function sendPatchRequest(color) {
    $.ajax({
        type: 'PATCH',
        url: '/id',
        data: {
            'shape_id': shape_id,
            'color': color,
        },
        success: function(msg){
            shape_color = color;
        }
    });
}

// Render scene
function animate(container) {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}