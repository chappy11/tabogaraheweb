import React,{useState,useMemo,useRef,useCallback} from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import markerIconPng from "leaflet/dist/images/marker-icon.png"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faMapMarkedAlt} from "@fortawesome/free-solid-svg-icons";
import {Icon} from 'leaflet'
// icon={new Icon({iconUrl: markerIconPng})>

function DraggableMarker({getposition,post}) {
  const [draggable, setDraggable] = useState(false)
  const [position, setPosition] = useState(post);
  const markerRef = useRef(null)
  const eventHandlers = useMemo(
    () => ({
      dragend() {
        const marker = markerRef.current
        if (marker != null) {
          setPosition(marker.getLatLng());
          getposition(marker.getLatLng());
        }
      },
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  )
  const toggleDraggable = useCallback(() => {
    setDraggable((d) => !d)
  }, [])
  
  return (
    <Marker
      draggable={draggable}
      eventHandlers={eventHandlers}
      position={position}
      icon={new Icon({iconUrl: markerIconPng})}
      ref={markerRef}>
      <Popup minWidth={90}>
        <span onClick={toggleDraggable}>
          {draggable
            ? 'Marker is draggable'
            : 'Click here to make marker draggable'}
        </span>
      </Popup>
    </Marker>
  )
}

function Updatemap({setmarker,post}) {
   const [position, setposition] = useState(post);
  const handleclick = e =>{
    e.preventDefault();
    setmarker({lat:position.lat,lng:position.lng});
    
  }
  const getposition =(post)=>{
    setposition(post);
  }

  return (
    <div>
      <div className="d-flex flex-row">
        <div className="p-2">
        <button  className="btn btn-primary" onClick={handleclick} ><FontAwesomeIcon icon={faMapMarkedAlt}/> Get Location</button>
        </div>
        <div className="p-2">
          <p>Click the marker and click the text click here</p>
        </div>
      </div>
         
    <MapContainer style={{ height: "100vh", width: "100%",zIndex:"1" }} center={post} zoom={13} scrollWheelZoom={true}>

    <TileLayer
      attribution="&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />
    <DraggableMarker getposition={getposition} post={post}/>
  </MapContainer>
  </div>
  );
}

export default Updatemap;
