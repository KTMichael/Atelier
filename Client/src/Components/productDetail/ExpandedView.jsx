import React from 'react';
import ReactDOM from 'react-dom';
import ReactImageZoom from 'react-image-zoom';

const props = {width: 400, height: 250, zoomWidth: 500, img: "1.jpg"};
ReactDOM.render(<ReactImageZoom {...props} />, document.getElementById('react-app'));