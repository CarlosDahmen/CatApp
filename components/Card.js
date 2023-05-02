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
  handleHeartClick,
}) {
  return (
    <div className={styles.card}>
      <div>
        <div className={styles.cover}>
          <img
            className={styles.cover_image}
            src={imageUrl}
            alt="Breed Image"
          />
          <div className={styles.text}>
            <div className={styles.title_container}>
              <p className={styles.title}>{name}</p>
              <Image
                src={favorite ? liked : heart}
                alt="heart icon"
                onClick={() => handleHeartClick(id)}
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
}

export default Card;
