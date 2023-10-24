import React, { useRef, useEffect} from 'react'
import { loadModules} from 'esri-loader'

function MapView() {

    const MapElement = useRef(null)

    useEffect (
        () => {
            let view;
            loadModules(["esri/views/MapView", "esri/WebMap", "esri/widgets/Home", "esri/widgets/ScaleBar",
             "esri/widgets/Compass", "esri/widgets/LayerList"],
            {css: true}
            ).then(([MapView, WebMap, Home, ScaleBar, Compass, LayerList]) => {
                const webMap = new WebMap({
                    //basemap: 'topo-vector'
                    basemap: 'streets-vector'
                })

                view = new MapView({
                    map:webMap,
                    // center:[],
                    zoom:4,
                    container:MapElement.current
                })

                const homeBtn = new Home({
                    view: view
                });

                const scaleBar = new ScaleBar({
                    view: view,
                    unit: "single" // The scale bar displays both metric and non-metric units.
                  });

                const compassWidget = new Compass({
                    view: view
                });

                view.when(() => {
                    const layerList = new LayerList({
                      view: view
                    });
                // Add layer list to the top right corner of the view
                view.ui.add(layerList, "top-right");  
                });
                // Add widgets to the map
                // Add the widget to the bottom left corner of the view
                view.ui.add(scaleBar, {
                    position: "bottom-left"
                  });

                // Add the home button to the top left corner of the view
                view.ui.add(homeBtn, "top-left");

                 
                // Add the Compass widget to the top left corner of the view
                view.ui.add(compassWidget, "top-left");


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
            style={{ height: '75vh', padding: 20}} ref={MapElement}>

        </div>
    )
}

export default MapView
