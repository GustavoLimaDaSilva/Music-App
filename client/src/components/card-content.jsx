import React from "react";
import { Link } from "react-router";

export default function CardContent({ name, imageUrl, type, artistName, followers, id }) {

    return (<>
    <Link to={`/${type}s/${id}`}>
        <img src={imageUrl} className={type === 'artist' ? 'profile card-img' : 'card-img'} />
        <p className="card-title">{name}</p>
        <p className="card-subtitle">{type === 'artist' ? followers : artistName}</p>
    </Link>
    </>);
}

