import { ScenegraphLayer } from '@deck.gl/mesh-layers';
import { registerLoaders } from '@loaders.gl/core';
import { GLTFLoader } from '@loaders.gl/gltf';
import terraingltf from '../assets/models/layer_dem_amva.glb';

registerLoaders(GLTFLoader);

const LayerDEM = new ScenegraphLayer({
    id: 'layer_dem',
    data: [
        { coordinates: [-75.6104, 6.337] }
    ],
    scenegraph: terraingltf,
    getPosition: d => d.coordinates,
    getOrientation: d => [0, 0, 90],
    getColor: d => [0, 0, 0, 175],
    _animations: {
        '*': { speed: 5 }
    },
    sizeScale: 1,
    _lighting: 'pbr',
});

export default LayerDEM;
