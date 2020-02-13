import React, { useState, useEffect } from "react";
import ReactMapGL, { Marker, Popup } from "react-map-gl";

import { logEntry } from "./Api";
import LogEntryForm from "./LogEntryForm";
function Map() {
  const [data, setData] = useState([]);
  const [showPopup, setShowPopup] = useState({});
  const [addEntryLocation, setAddEntryLocation] = useState(null);
  const [viewport, setViewport] = useState({
    width: "1200px",
    height: "600px",

    latitude: 61.9241,
    longitude: 25.7482,
    zoom: 5
  });

  const getEntries = async () => {
    const logEntries = await logEntry();
    //console.log(logEntries.entries);
    setData(logEntries.entries);
  };

  useEffect(() => {
    getEntries();
  }, []);

  const showAddMarkerPopup = event => {
    const [longitude, latitude] = event.lngLat;
    setAddEntryLocation({
      latitude,
      longitude
    });
  };
  return (
    <React.Fragment>
      <div className="map-body">
        <ReactMapGL
          {...viewport}
          mapStyle="mapbox://styles/alakdam/ck6g7ryy635cg1io4ftrq2t1a"
          mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
          onViewportChange={setViewport}
          onDblClick={showAddMarkerPopup}
        >
          {data.map(entry => {
            return (
              <React.Fragment>
                <Marker
                  key={entry._id}
                  latitude={entry.latitude}
                  longitude={entry.longitude}
                  offsetLeft={-20}
                  offsetTop={-10}
                >
                  <div
                    onClick={() =>
                      setShowPopup({
                        // ...showPopup,
                        [entry._id]: true
                      })
                    }
                  >
                    <svg
                      className="marker yellow"
                      style={{
                        height: `${6 * viewport.zoom}px`,
                        width: `${6 * viewport.zoom}px`
                      }}
                      version="1.1"
                      id="Layer_1"
                      x="0px"
                      y="0px"
                      viewBox="0 0 512 512"
                    >
                      <g>
                        <g>
                          <path
                            d="M256,0C153.755,0,70.573,83.182,70.573,185.426c0,126.888,165.939,313.167,173.004,321.035
                        c6.636,7.391,18.222,7.378,24.846,0c7.065-7.868,173.004-194.147,173.004-321.035C441.425,83.182,358.244,0,256,0z M256,278.719
                        c-51.442,0-93.292-41.851-93.292-93.293S204.559,92.134,256,92.134s93.291,41.851,93.291,93.293S307.441,278.719,256,278.719z"
                          />
                        </g>
                      </g>
                    </svg>
                  </div>
                  {/* {entry.title} */}
                </Marker>
                {showPopup[entry._id] ? (
                  <Popup
                    latitude={entry.latitude}
                    longitude={entry.longitude}
                    closeButton={true}
                    closeOnClick={false}
                    dynamicPosition={true}
                    onClose={() => setShowPopup({})}
                    anchor="top"
                  >
                    <div className="popup">
                      <h4>Name: {entry.name}</h4>
                      <p>Title: {entry.title}</p>
                      <p>Rating: {entry.rating}</p>
                      <p>Comment: {entry.comments}</p>
                      <small>
                        Visited on:{" "}
                        {new Date(entry.visitDate).toLocaleDateString()}
                      </small>
                      {entry.image && (
                        <img src={entry.image} alt={entry.title} />
                      )}
                    </div>
                  </Popup>
                ) : null}
              </React.Fragment>
            );
          })}
          {addEntryLocation ? (
            <>
              <Marker
                latitude={addEntryLocation.latitude}
                longitude={addEntryLocation.longitude}
              >
                <div>
                  <svg
                    className="marker red"
                    style={{
                      height: `${6 * viewport.zoom}px`,
                      width: `${6 * viewport.zoom}px`
                    }}
                    version="1.1"
                    id="Layer_1"
                    x="0px"
                    y="0px"
                    viewBox="0 0 512 512"
                  >
                    <g>
                      <g>
                        <path
                          d="M256,0C153.755,0,70.573,83.182,70.573,185.426c0,126.888,165.939,313.167,173.004,321.035
                        c6.636,7.391,18.222,7.378,24.846,0c7.065-7.868,173.004-194.147,173.004-321.035C441.425,83.182,358.244,0,256,0z M256,278.719
                        c-51.442,0-93.292-41.851-93.292-93.293S204.559,92.134,256,92.134s93.291,41.851,93.291,93.293S307.441,278.719,256,278.719z"
                        />
                      </g>
                    </g>
                  </svg>
                </div>
              </Marker>
              <Popup
                latitude={addEntryLocation.latitude}
                longitude={addEntryLocation.longitude}
                closeButton={true}
                closeOnClick={false}
                dynamicPosition={true}
                onClose={() => setAddEntryLocation(null)}
                anchor="top"
              >
                <div className="popup">
                  <LogEntryForm
                    onClose={() => {
                      setAddEntryLocation(null);
                      getEntries();
                    }}
                    location={addEntryLocation}
                  />
                </div>
              </Popup>
            </>
          ) : null}
        </ReactMapGL>
      </div>
    </React.Fragment>
  );
}

export default Map;
