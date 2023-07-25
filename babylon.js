const canvas = document.getElementById('canvasId');

const engine = new BABYLON.Engine(canvas);

const createScene = function () {
    const scene = new BABYLON.Scene(engine);

    scene.createDefaultLight(true, false, true);


    var camera = new BABYLON.ArcRotateCamera("camera1", 11, 1.5, 100, new BABYLON.Vector3(0, 0, 0), scene);
    // var camera = new BABYLON.UniversalCamera("camera", new BABYLON.Vector3(0, 1, -15), scene);

    camera.attachControl(canvas, true);

    var square = BABYLON.MeshBuilder.CreatePlane("square", { size: 20 }, scene);
    colour(square, scene);

    // var gridSize = 2;
    // var squareSize = 1;
    // var gridSpacing = 0.1;

    // for (var i = 0; i < gridSize; i++) {
    //     for (var j = 0; j < gridSize; j++) {
    //         var square = BABYLON.MeshBuilder.CreatePlane("square", { size: squareSize }, scene);
    //         square.position.x = (i - gridSize / 2) * (squareSize + gridSpacing);
    //         square.position.y = (j - gridSize / 2) * (squareSize + gridSpacing);
    //         colour(square, scene);
    //     }
    // }

    return scene;
}

// function deconstructMesh(mesh) {
//     if (mesh.subMeshes.length > 1) {
//         var otherVertexData = BABYLON.VertexData.ExtractFromMesh(mesh, true, true);
//         var indices = otherVertexData.indices;
//         var normals = otherVertexData.normals;
//         var positions = otherVertexData.positions;
//         var uvs = otherVertexData.uvs;
//         var newMeshArray = [];
//         for (let index = 0; index < mesh.subMeshes.length; index++) {
//             var newVertexData = new BABYLON.VertexData();

//             var newI = indices.slice(mesh.subMeshes[index].indexStart, mesh.subMeshes[index].indexStart + mesh.subMeshes[index].indexCount);
//             var newN = normals.slice(mesh.subMeshes[index].verticesStart * 3, mesh.subMeshes[index].verticesStart * 3 + mesh.subMeshes[index].verticesCount * 3);
//             var newP = positions.slice(mesh.subMeshes[index].verticesStart * 3, mesh.subMeshes[index].verticesStart * 3 + mesh.subMeshes[index].verticesCount * 3);
//             var newU = uvs.slice(mesh.subMeshes[index].verticesStart * 2, mesh.subMeshes[index].verticesStart * 2 + mesh.subMeshes[index].verticesCount * 2);
//             for (let subIndex = 0; subIndex < newI.length; subIndex++) {
//                 newI[subIndex] = newI[subIndex] - mesh.subMeshes[index].verticesStart;
//             }

//             newVertexData.indices = newI;
//             newVertexData.normals = newN;
//             newVertexData.positions = newP;
//             newVertexData.uvs = newU;

//             var meshSubclass = new BABYLON.Mesh(mesh.name + '-' + index, scene);

//             newVertexData.applyToMesh(meshSubclass);

//             newMeshArray.push(meshSubclass);
//         }
//         return newMeshArray;
//     } else {
//         return [mesh];
//     }
// }

// function matrix(ratio, frequency, scene) {
//     var grid = new BABYLON.GridMaterial("grid", scene);
//     grid.gridRatio = ratio;
//     grid.majorUnitFrequency = frequency;
//     grid.minorUnitVisibility = 0.1;
//     return grid;
// }

function colour(square, scene) {
    var materials = [];
    var material1 = new BABYLON.StandardMaterial("material1", scene);
    material1.backFaceCulling = false;
    var material2 = new BABYLON.StandardMaterial("material1", scene);
    material2.backFaceCulling = false;
    materials.push(material1);
    materials.push(material2);


    square.material = new BABYLON.MultiMaterial("multiMaterial", scene);
    square.subMeshes = [];

    for (var i = 0; i < materials.length; i++) {
        square.subMeshes.push(new BABYLON.SubMesh(i, 0, 6, 0, 6, square));
        square.material.subMaterials.push(materials[i]);
    }

    scene.registerBeforeRender(function () {
        for (var i = 0; i < materials.length; i++) {
            var randomColor = new BABYLON.Color3(Math.random(), Math.random(), Math.random());
            materials[i].diffuseColor = randomColor;

            setTimeout(function () {
                scene.render();
            }, 100);
        }
    });
}

const scene = createScene();

engine.runRenderLoop(function () {
    scene.render();
});

window.addEventListener('resize', function () {
    engine.resize();
});