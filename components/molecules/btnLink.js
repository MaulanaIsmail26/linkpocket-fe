import React from "react";
import style from "@/styles/pages/profile.module.scss";

export default function btnLink(props) {
  const { socmed } = props;
  return (
    <div className="d-grid gap-2 ">
      <button className={`btn ${style.linkStick}`} type="button">
        {socmed}
      </button>
      {/* {socmed.map((_item) => {
        return (
          <button
            className={`btn ${style.linkStick}`}
            type="button"
            key={_item}
          >
            {_item}
          </button>
        );
      })} */}
    </div>
  );
}
