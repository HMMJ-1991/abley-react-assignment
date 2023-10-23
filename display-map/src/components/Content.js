import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
// Default import
import WebMap from "@arcgis/core/WebMap.js";

// Namespace import
import * as projection from "@arcgis/core/geometry/projection.js";

import MapView from "@arcgis/core/views/MapView.js";

export default function Content() {
  return (
    
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="m">
        <Box sx={{ bgcolor: '#cfe8fc', height: '80vh' }}>
            <div id="map"></div>
        </Box>
      </Container>
    </React.Fragment>
  );
}