import React from "react";
import styles from "../styles/tag.module.css";

function Tag({ tag, addToTemperamentFilter, selected }) {
  return (
    <div
      className={selected ? styles.selected_tag : styles.tag}
      onClick={() => {
        addToTemperamentFilter(tag);
      }}
    >
      {tag}
    </div>
  );
}

export default Tag;
