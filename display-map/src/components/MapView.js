import React, { useRef, useEffect} from 'react'
import { loadModules} from 'esri-loader'

function MapView() {

    const MapElement = useRef(null)

    useEffect (
        () => {
            let view;
            loadModules(["esri/views/MapView", "esri/WebMap"],
            {css: true}
            ).then(([MapView, WebMap]) => {
                const webMap = new WebMap({
                    basemap: 'topo-vector'
                })

                view = new MapView({
                    map:webMap,
                    // center:[],
                    zoom:4,
                    container:MapElement.current
                })
            })

            return() => {
                // close the map view
                if(!!view) {
                    view.destroy()
                    view=null
                }
            }
        })
    return (
        <div 
            style={{ height:800, padding: 20}} ref={MapElement}>

        </div>
    )
}

export default MapView
