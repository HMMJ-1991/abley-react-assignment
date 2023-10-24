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
                    //basemap: 'topo-vector'
                    basemap: 'streets-vector'
                })

                view = new MapView({
                    map:webMap,
                    // center: [ -181.24354, -42.05389 ],
                    zoom:2,
                    container:MapElement.current,
                    center: [100, -30],
                    extent: {
                        // autocasts as new Extent()
                        xmin: -9177811,
                        ymin: 4247000,
                        xmax: -9176791,
                        ymax: 4247784,
                        spatialReference: 102100
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


                // Carbon storage of trees in Warren Wilson College.
                const featureLayer = new FeatureLayer({
                    url: "https://services.arcgis.com/V6ZHFr6zdgNZuVG0/arcgis/rest/services/Landscape_Trees/FeatureServer/0"
                });
        
                webMap.add(featureLayer);  



                // view.when(() => {
                //     const layerList = new LayerList({
                //       view: view
                //     });
                // // Add layer list to the top right corner of the view
                // view.ui.add(layerList, "top-right");  
                // });
                
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
