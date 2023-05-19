import React from "react";
import styles from "../styles/tag.module.css";

function Tag({ tag, onClick, selected }) {
  return (
    <div
      className={selected ? styles.selected_tag : styles.tag}
      onClick={() => {
        onClick(tag);
      }}
    >
      {tag}
    </div>
  );
}

export default Tag;
