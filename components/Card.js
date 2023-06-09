import React, { useState } from "react";
import Image from "next/image";
import styles from "../styles/card.module.css";
import Tag from "./Tag";
import heart from "../public/heart.png";
import liked from "../public/liked.png";

function Card({
  id,
  name,
  imageUrl,
  temperament,
  description,
  lifespan,
  origin,
  favorite,
  addCatToFavorites,
  removeCatFromFavorites,
}) {
  const [src, setSrc] = useState(imageUrl);

  const heartClickhandler = (id) => {
    if (favorite) {
      removeCatFromFavorites(id);
    } else {
      addCatToFavorites(id);
    }
  };

  // const setImage = () => {
  //   if (imageUrl && imageUrl.length) {
  //     return imageUrl;
  //   }

  //   if (!(imageUrl && imageUrl.length)) {
  //     return "https://media.istockphoto.com/id/1097490360/vector/vector-illustration-of-cute-black-cat.jpg?s=612x612&w=0&k=20&c=Ef0qYl79aZJ6NJXJVbJ0onjXVNnSyqrN_TKPjieAIGE=";
  //   }

  //   if (src) {
  //     return src;
  //   }
  // };

  if (temperament) {
    return (
      <div className={styles.card}>
        <div>
          <div className={styles.cover}>
            <Image
              className={styles.cover_image}
              src={src}
              width={300}
              height={300}
              alt="Breed Image"
              onError={() =>
                setSrc(
                  "https://media.istockphoto.com/id/1097490360/vector/vector-illustration-of-cute-black-cat.jpg?s=612x612&w=0&k=20&c=Ef0qYl79aZJ6NJXJVbJ0onjXVNnSyqrN_TKPjieAIGE="
                )
              }
            />
            <div className={styles.text}>
              <div className={styles.title_container}>
                <p className={styles.title}>{name}</p>
                <Image
                  src={favorite ? liked : heart}
                  alt="heart icon"
                  onClick={() => heartClickhandler(id)}
                ></Image>
              </div>
              <p>Country of Origin: {origin}</p>
              <p>Life Span: {lifespan} years</p>
            </div>
          </div>
          <div className={styles.tags_container}>
            <label>Temperament:</label>
            <div className={styles.tags}>
              {temperament.map((tag) => {
                return <Tag key={tag} tag={tag} />;
              })}
            </div>
          </div>
        </div>
        <div className={styles.descriptions}>{description}</div>
      </div>
    );
  } else {
    return <div>No Temperament! so no cards!</div>;
  }
}

export default Card;
