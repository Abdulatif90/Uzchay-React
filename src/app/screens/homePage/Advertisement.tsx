import React from "react";

export default function Advertisement() {
return (
    <div className="ads-restaurant-frame">
        <video 
        className="ads-video"
        autoPlay = {true}
        loop
        muted
        playsInline
        data-video-media = ""
        
        >
            <source type="video/mov" src="video/46.mov"/>
        </video>
    </div>
);
}