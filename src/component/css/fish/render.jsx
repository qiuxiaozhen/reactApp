import React from 'react';
import "./index.less";

function App() {
  return (
    <div className="sea">
      <div className="circle-wrapper">
        <div className="bubble" />
        <div className="submarine-wrapper">
          <div className="submarine-body">
            <div className="window" />
            <div className="engine" />
            <div className="light" />
          </div>
          <div className="helix" />
          <div className="hat">
            <div className="leds-wrapper">
              <div className="periscope" />
              <div className="leds" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
