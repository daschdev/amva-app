import React from 'react';
import { INITIAL_STATE } from './states';
import Loader from './components/Loader';
import DeckGL from '@deck.gl/react';
import ReactMapGL from 'react-map-gl';
import Header from './components/Header';
import GL from '@luma.gl/constants';

// A.M.V.A. Layers
import LayerAMVAPoints from './layers/LayerAMVAPoints';
import LayerDEM from './layers/LayerDEM';
import LayerAMVAArcs from './layers/LayerAMVAArcs';

// Capsule Layers
import LayerCapsule from './layers/LayerCapsule';
//import LayerPlants from './layers/LayerPlants';

const INITIAL_MAP_STYLE = 'https://basemaps.cartocdn.com/gl/positron-gl-style/style.json';

function App() {
    const [viewState, setViewState] = React.useState(INITIAL_STATE.view_state);
    const [layers, setLayers] = React.useState(INITIAL_STATE.layers);
    const [mapLoaded, setMapLoaded] = React.useState(false);

    return (
        <>
            <Loader isActive={!mapLoaded} />
            <div style={{ opacity: mapLoaded ? 1 : 0 }}>
                <DeckGL 
                    initialViewState={viewState}
                    layers={[
                        LayerAMVAArcs,
                        LayerDEM,
                        // LayerDelanauyAMVA,
                        LayerCapsule,
                        // LayerPlants,
                    ]}
                    layerFilter={({ layer }) => {
                        for (const layer_id of layers) {
                            console.log(layer_id)
                            if (layer.id.toLowerCase().startsWith(layer_id)) {
                                return true;
                            }
                        }

                        return false;
                    }}
                    controller={true}
                    parameters={{
                        blendFunc: [GL.SRC_ALPHA, GL.ONE, GL.ONE_MINUS_DST_ALPHA, GL.ONE],
                        blendEquation: GL.FUNC_ADD
                      }}
                >
                    <ReactMapGL
                        reuseMaps
                        mapStyle={INITIAL_MAP_STYLE}
                        preventStyleDiffing={true}
                        onLoad={() => setMapLoaded(true)}
                    />
                </DeckGL>
            </div>
            {mapLoaded && <Header setViewState={setViewState} setLayers={setLayers} />}
        </>
    );
}

export default App;
