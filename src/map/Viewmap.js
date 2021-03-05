import { Icon } from 'leaflet';
import {useParams,useHistory} from "react-router";
import React from 'react'
import markerIconPng from "leaflet/dist/images/marker-icon.png"
import { MapContainer,TileLayer, Marker, Popup } from "react-leaflet";
function Viewmap() {
    const {lat,lng} = useParams();
    const position = [lat,lng];
    const history = useHistory();
    return (
        <div>
        <button className="btn btn-danger m-3 float-right" onClick={()=>history.goBack()}>Back</button>
           <MapContainer style={{ height: "100vh", width: "100%",zIndex:"1" }} center={position} zoom={13} scrollWheelZoom={true}>

        <TileLayer
         attribution="&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

                 <Marker position={position} icon={new Icon({iconUrl: markerIconPng})}>
                    <Popup>
                        <span>this is your location</span>
                    </Popup>
                 </Marker>
            </MapContainer>
        </div>
    )
}

export default Viewmap
