import React, { useRef, useEffect} from 'react'
import { loadModules} from 'esri-loader'

function MapView() {

    const MapElement = useRef(null)

    useEffect (
        () => {
            let view;
            loadModules([
                        "esri/views/MapView", 
                        "esri/WebMap", 
                        "esri/widgets/Home", 
                        "esri/widgets/ScaleBar",
                        "esri/widgets/Compass", 
                        "esri/widgets/LayerList",  
                        "esri/widgets/BasemapLayerList", 
                        "esri/widgets/BasemapGallery", 
                        "esri/widgets/Expand",
                        "esri/layers/FeatureLayer",
                        "esri/geometry/geometryEngine",
                        "esri/core/reactiveUtils"
                    ],
            {css: true}
            ).then(([
                    MapView, 
                    WebMap, 
                    Home, 
                    ScaleBar, 
                    Compass, 
                    LayerList, 
                    BasemapLayerList, 
                    BasemapGallery, 
                    Expand, 
                    FeatureLayer,
                    geometryEngine,
                    reactiveUtils 
                ]) => {
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

                /** Create popup actions */
                // Add this action to the popup so it is always available in this view
                const measureThisAction = {
                    title: "Measure Length",
                    id: "measure-this",
                    image:
                    "https://developers.arcgis.com/javascript/latest/sample-code/popup-actions/live/Measure_Distance16.png"
                };

                const template = {
                    // autocasts as new PopupTemplate()
                    title: "Trail run",
                    content: "{name}",
                    actions: [measureThisAction]
                };
                
                // Add feature layers
                const parksLayer = new FeatureLayer({
                    url: "https://gis.ecan.govt.nz/arcgis/rest/services/Public/Canterbury_Maps/MapServer/26"
                });

                const bickLayer = new FeatureLayer({
                    url: "https://gis.ecan.govt.nz/arcgis/rest/services/Public/Canterbury_Maps/MapServer/24",
                    popupTemplate: template
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
            style={{ height: '80vh', padding: 20}} ref={MapElement}>

        </div>
    )
}

export default MapView
