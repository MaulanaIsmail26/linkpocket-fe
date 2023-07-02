import React from 'react'
import Image from 'next/image';
import style from "@/styles/pages/profile.module.scss";

export default function Navbar() {
  return (
    <div>
      <div className={`col`}>
        <div className="d-flex justify-content-between">
          <Image
            src={require("/public/images/Icon-app-nooutline.png")}
            className={` ${style.iconApp}`}
            // width={500}
            // height={65}
            alt="Icon-Linkpocket"
          />
          <div className={` ${style.btnLoginRegister}`}>
            <button
              type="button"
              className={`btn btn-outline-primary ${style.btnLogin}`}
            >
              Login
            </button>
            <button
              type="button"
              className={`btn btn-primary ${style.btnRegister}`}
            >
              Register
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
