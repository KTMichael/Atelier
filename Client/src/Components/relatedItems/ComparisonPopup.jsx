import React from 'react';
import Popup from 'reactjs-popup';

function ComparisonPopup({mainProduct, related, onClick}) {
  console.log('main', mainProduct);
  console.log('related', related);
  return (
    <Popup >
      <div id='comparison-popup'>Popup</div>
    </Popup>
  );
}

export default ComparisonPopup;