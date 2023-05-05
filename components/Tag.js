import React from "react";
import styles from "../styles/tag.module.css";

function Tag({ tag, addToTemperamentFilter }) {
  return (
    <div className={styles.tag} onClick={() => addToTemperamentFilter(tag)}>
      {tag}
    </div>
  );
}

export default Tag;
