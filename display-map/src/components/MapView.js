import React, { useRef, useEffect} from 'react'
import { loadModules} from 'esri-loader'

function MapView() {

    const MapElement = useRef(null)

    useEffect (
        () => {
            let view;
            loadModules(["esri/views/MapView", 
                        "esri/WebMap", 
                        "esri/widgets/Home", 
                        "esri/widgets/ScaleBar",
                        "esri/widgets/Compass", 
                        "esri/widgets/LayerList",  
                        "esri/widgets/BasemapLayerList", 
                        "esri/widgets/BasemapGallery", 
                        "esri/widgets/Expand",
                        "esri/layers/FeatureLayer"],
            {css: true}
            ).then(([MapView, 
                    WebMap, 
                    Home, 
                    ScaleBar, 
                    Compass, 
                    LayerList, 
                    BasemapLayerList, 
                    BasemapGallery, 
                    Expand, 
                    FeatureLayer]) => {
                const webMap = new WebMap({
                    basemap: 'streets-vector'
                })

                view = new MapView({
                    map:webMap,
                    zoom:5,
                    container:MapElement.current,
                    // center: [100, -30],
                    extent: {
                        xmin: 1245903.1332998276,
                        ymin: 4560372.931300163,
                        xmax: 1983031.1332001686,
                        ymax: 6049658.087100029,
                        spatialReference: 2193
                    }
                });

                let basemapLayerList = new BasemapLayerList({
                    view: view
                  });
                  // Adds the widget below other elements in the top left corner of the view
                  view.ui.add(basemapLayerList, {
                    position: "top-right"
                  });

                  // Specify the widget while adding to the view's UI
                const basemapGallery = new BasemapGallery({
                    view: view
                });

                const bgExpand = new Expand({
                    view,
                    content: basemapGallery,
                    expandIcon: "basemap"
                  });

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

                const layerList = new LayerList({
                    view: view
                  });

                
                // Add feature layers
                const parksLayer = new FeatureLayer({
                    url: "https://gis.ecan.govt.nz/arcgis/rest/services/Public/Canterbury_Maps/MapServer/26"
                });

                const bickLayer = new FeatureLayer({
                    url: "https://gis.ecan.govt.nz/arcgis/rest/services/Public/Canterbury_Maps/MapServer/24"
                });
                
                webMap.add(bickLayer);
                webMap.add(parksLayer);
                
                // Add widgets to the map
                // Add the widget to the bottom left corner of the view
                view.ui.add(scaleBar, {
                    position: "bottom-left"
                  });

                view.ui.add(layerList, "top-right");  

                // Add the home button to the top left corner of the view
                view.ui.add(homeBtn, "top-left");

                 
                // Add the Compass widget to the top left corner of the view
                view.ui.add(compassWidget, "top-left");

                                
                // Add the widget to the top-right corner of the view
                view.ui.add(bgExpand, "top-right");
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
