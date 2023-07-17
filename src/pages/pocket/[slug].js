/* eslint-disable @next/next/no-img-element */
import Head from "next/head";
import Image from "next/image";
import style from "@/styles/pages/pocketSpace.module.scss";
import React from "react";
import axios from "axios";
import Link from "next/link";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";

// ICON
import FacebookIcon from "@mui/icons-material/Facebook";
import GitHubIcon from "@mui/icons-material/GitHub";
import YouTubeIcon from "@mui/icons-material/YouTube";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";

// ICON
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import DoneIcon from "@mui/icons-material/Done";
import MenuIcon from "@mui/icons-material/Menu";

const styleIconCopy = {
  "& label": {
    color: "white",
  },
  "& label.Mui-focused": {
    color: "#03e9f4",
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "#03e9f4",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "white",
    },
    "&:hover fieldset": {
      borderColor: "white",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#03e9f4",
    },
  },
};

export default function Home() {
  const [socmed, setSocmed] = React.useState([]);
  const [title, setTitle] = React.useState("");
  const [photo, setPhoto] = React.useState([]);
  const [desc, setDesc] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [dataNull, setDataNull] = React.useState(false);

  // STATE FOR MODAL
  const [link, setLink] = React.useState(``);
  const [CheckCopy, setCheckCopy] = React.useState(false);

  // STATE USER LOGIN
  const [fullname, setFullname] = React.useState([]);
  const [titleLogin, setTitleLogin] = React.useState([]);
  const [photoLogin, setPhotoLogin] = React.useState([]);

  // STATE FOR CHECK LOGIN
  const [checkIsLogin, setCheckIsLogin] = React.useState(false);
  React.useEffect(() => {
    if (!localStorage.getItem("token")) {
      // navigate("/login");
      setCheckIsLogin(false);
    }

    if (!localStorage.getItem("profile")) {
      setCheckIsLogin(false);
    }

    if (localStorage.getItem("profile")) {
      setCheckIsLogin(true);
    }

    if (localStorage.getItem("token")) {
      // navigate("/login");
      setCheckIsLogin(true);
    }
  }, []);

  // GET USER DATA
  React.useEffect(() => {
    const id = location.pathname.split("/")[2];

    axios
      .get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/v1/space/${id}`, {
        headers: {
          // "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then(({ data }) => {
        console.log(data?.data);
        const test = JSON.parse(data?.data?.social_media);
        setSocmed(test);
        setTitle(data?.data?.title);
        setPhoto(data?.data?.photo_profile);
        setDesc(data?.data?.desc);
        setLink(`linkpocket.vercel.app/pocket/${data?.data?.slug}`);

        setDataNull(false);
      })
      .catch(() => setDataNull(true))
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  // USER LOGIN DATA
  React.useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/v1/space`, {
        headers: {
          // "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then(({ data }) => {
        // console.log(data?.data[0]?.title);
        setTitleLogin(data?.data[0]?.title);
        setPhotoLogin(data?.data[0]?.photo_profile);
      })
      .catch(() => setTitleLogin([]));
  }, []);

  // const checkProfile = localStorage.getItem("profile")
  //   ? JSON.parse(localStorage.getItem("profile"))
  //   : null;
  // const [titleLogin, setTitleLogin] = React.useState(checkProfile);

  React.useEffect(() => {
    const checkProfile = localStorage?.getItem("profile")
      ? JSON.parse(localStorage?.getItem("profile"))
      : null;

    setFullname(checkProfile?.fullname);
  }, []);

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={style.main}>
        <section className={`container-fluid ${style.homePage}`}>
          <div className={`container`}>
            <div className={`row`}>
              <div className={`col-12 position-relative ${style.cardHolder}`}>
                {/* CARD FORM REGISTER */}
                <div
                  className={`position-absolute top-50 start-50 translate-middle px-sm-4 px-3 ${style.cardLinkPocket}`}
                >
                  {isLoading ? (
                    <div className="position-absolute top-50 start-50 translate-middle">
                      <div className="d-flex justify-content-center">
                        <Image
                          src={require("/public/images/Icon-app-nooutline.webp")}
                          className={` ${style.iconApp}`}
                          width={200}
                          // height={65}
                          alt="Icon-Linkpocket"
                        />
                      </div>
                      <div className="d-flex justify-content-center">
                        <div
                          class="spinner-border text-info "
                          style={{
                            width: "5rem",
                            height: "5rem",
                            margin: "auto",
                          }}
                          role="status"
                        >
                          <span class="visually-hidden ">Loading...</span>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <>
                      {/* NAVBAR */}
                      {dataNull ? null : (
                        <div className={`row ${style.titleCard}`}>
                          <div className={`col`}>
                            <div className="d-flex justify-content-between">
                              <Image
                                src={require("/public/images/Icon-app-nooutline.webp")}
                                className={` ${style.iconApp}`}
                                // width={500}
                                // height={65}
                                alt="Icon-Linkpocket"
                              />
                              {/* BUTTON MENU */}
                              <div>
                                {/* <!-- Button trigger modal --> */}
                                <MenuIcon
                                  className={`${style.btnMenu}`}
                                  style={{ color: "white" }}
                                  data-bs-toggle="modal"
                                  data-bs-target="#exampleModal"
                                />

                                {/* <!-- Modal --> */}
                                <div
                                  className={`modal fade`}
                                  id="exampleModal"
                                  tabindex="-1"
                                  aria-labelledby="exampleModalLabel"
                                  aria-hidden="true"
                                >
                                  <div
                                    className={`modal-dialog modal-dialog-centered modal-dialog-scrollable ${style.modalMenu}`}
                                  >
                                    <div
                                      className="modal-content"
                                      style={{ backgroundColor: "#323334" }}
                                    >
                                      {/* HEADER MODAL */}
                                      <div
                                        className={`modal-header ${style.modalHeader}`}
                                      >
                                        <h1
                                          className="modal-title fs-5"
                                          id="exampleModalLabel"
                                        >
                                          LinkPocket
                                        </h1>
                                        <button
                                          type="button"
                                          className="btn-close"
                                          data-bs-dismiss="modal"
                                          aria-label="Close"
                                        ></button>
                                      </div>
                                      <div
                                        className={`modal-body pt-3 pb-4 ${style.modalBody}`}
                                      >
                                        {/* PHOTO, FULLNAME AND LINKPOCKET TITLE */}
                                        {checkIsLogin ? (
                                          <>
                                            {/* PHOTO PROFILE SECTION */}
                                            <div className="row">
                                              <div
                                                className={`col-12 pb-2 ${style.profile}`}
                                              >
                                                <img
                                                  src={photoLogin}
                                                  className={`rounded mx-auto d-block rounded-circle ${style.profilePicture}`}
                                                  alt="photo-profile"
                                                ></img>
                                              </div>
                                            </div>

                                            {/* FULLNAME AND LINKPOCKET TITLE */}
                                            <div className="row">
                                              <div
                                                className={`col-12 px-4 ${style.username}`}
                                              >
                                                <p
                                                  className={`${style.titleLogin}`}
                                                >
                                                  {titleLogin}
                                                </p>
                                                <p
                                                  className={`${style.fullname}`}
                                                >
                                                  {fullname}
                                                </p>
                                              </div>
                                            </div>
                                          </>
                                        ) : null}

                                        {/* COPY LINK SECTION */}
                                        <div className="row">
                                          <div
                                            className={`col-12 px-4 ${style.CopyLink}`}
                                          >
                                            <p>
                                              Share {title}&#39;s LinkPocket
                                            </p>
                                            <TextField
                                              id="outlined-basic"
                                              className={style.link}
                                              sx={styleIconCopy}
                                              label="Click to copy link"
                                              variant="outlined"
                                              fullWidth
                                              defaultValue={link}
                                              inputProps={{
                                                readOnly: true,
                                                style: {
                                                  color: "white",
                                                },
                                              }}
                                              InputProps={{
                                                startAdornment: (
                                                  <InputAdornment position="start">
                                                    {CheckCopy ? (
                                                      <DoneIcon
                                                        style={{
                                                          color: "white",
                                                        }}
                                                      />
                                                    ) : (
                                                      <ContentCopyIcon
                                                        style={{
                                                          color: "white",
                                                        }}
                                                      />
                                                    )}
                                                  </InputAdornment>
                                                ),
                                              }}
                                              onClick={() => {
                                                navigator.clipboard.writeText(
                                                  link
                                                );

                                                setCheckCopy(true);
                                              }}
                                            />
                                          </div>
                                        </div>

                                          {/* BUTTON REGISTER AND LOGIN */}
                                        {!checkIsLogin ? (
                                          <>
                                            {/* REGISTER SECTION */}
                                            <div className="row">
                                              <div
                                                className={`col-12 px-4 ${style.registerSection}`}
                                              >
                                                <p>
                                                  Register and create your own
                                                  LinkPocket
                                                </p>
                                                <div className="d-grid gap-2">
                                                  <Link
                                                    className={`btn btn-primary ${style.btnRegister}`}
                                                    type="button"
                                                    href={"/auth/register"}
                                                  >
                                                    Register Free
                                                  </Link>
                                                </div>
                                              </div>
                                            </div>

                                            {/* LOGIN SECTION */}
                                            <div className="row">
                                              <div
                                                className={`col-12 px-4 ${style.loginSection}`}
                                              >
                                                <p>Already have an account?</p>
                                                <div className="d-grid gap-2">
                                                  <Link
                                                    className={`btn btn-primary ${style.btnLogin}`}
                                                    type="button"
                                                    href={"/auth/login"}
                                                  >
                                                    Login
                                                  </Link>
                                                </div>
                                              </div>
                                            </div>
                                          </>
                                        ) : null}
                                      </div>
                                    </div>
                                    <style>
                                      {`
                                        ::-webkit-scrollbar {
                                          width: 0em;
                                          height: 0.5em;
                                        }
                                        ::-webkit-scrollbar-thumb {
                                          background-color: rgba(0, 0, 0, 0.2);
                                        }
                                      `}
                                    </style>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                      {/* PROFILE SECTION */}
                      {/* IF THE SLUG IS NOT FOUND */}
                      {dataNull ? (
                        <div className="position-absolute top-50 start-50 translate-middle">
                          <div className="d-flex justify-content-center">
                            <Image
                              src={require("/public/images/Icon-app-nooutline.webp")}
                              className={` ${style.iconApp}`}
                              width={200}
                              // height={65}
                              alt="Icon-Linkpocket"
                            />
                          </div>
                          <div className="d-flex justify-content-center">
                            <h5
                              className="text-center"
                              style={{ color: "white" }}
                            >
                              The user LinkPocket card link is missing.
                            </h5>
                          </div>
                        </div>
                      ) : (
                        <>
                          <div className={`row ${style.profileCard}`}>
                            <div className="col-sm-4 col-5 p-sm-0 ps-sm-3 ps-3 pe-0 d-flex justify-content-center">
                              <Image
                                src={photo}
                                className={` ${style.photoProfile}`}
                                width={120}
                                height={120}
                                alt="Icon-Linkpocket"
                              />
                            </div>
                            <div className="col-sm-8 col-7">
                              {title.length <= 14 ? (
                                <h3 className={`${style.username14}`}>
                                  {title}
                                </h3>
                              ) : (
                                <h3 className={`${style.username16}`}>
                                  {title}
                                </h3>
                              )}
                              <p className={`${style.desc}`}>{desc}</p>
                              <div className="d-grid gap-2">
                                <Link
                                  type="button"
                                  href={"/auth/register"}
                                  className={`btn btn-primary ${style.btnShare}`}
                                >
                                  Create your LinkPocket
                                </Link>
                              </div>
                            </div>
                          </div>

                          {/* LINKS SECTION */}
                          <div className={`row ${style.linkSection}`}>
                            <div className="col-12">
                              <div className="d-grid gap-2 ">
                                {/* FACEBOOK */}
                                {socmed.facebook ? (
                                  <button
                                    className={`btn ${style.linkStick}`}
                                    type="button"
                                    onClick={() =>
                                      window.open(
                                        `${socmed.facebook}`,
                                        "_blank"
                                      )
                                    }
                                  >
                                    <FacebookIcon
                                      className={`${style.iconSocmed}`}
                                      style={{
                                        color: "#4267B2",
                                        fontSize: "30px",
                                        marginRight: "5px",
                                      }}
                                    />
                                    Facebook
                                  </button>
                                ) : null}

                                {/* INSTAGRAM */}
                                {socmed.instagram ? (
                                  <button
                                    className={`btn ${style.linkStick}`}
                                    type="button"
                                    onClick={() =>
                                      window.open(
                                        `${socmed.instagram}`,
                                        "_blank"
                                      )
                                    }
                                  >
                                    <InstagramIcon
                                      className={`${style.iconSocmed}`}
                                      style={{
                                        color: "#E1306C",
                                        fontSize: "30px",
                                        marginRight: "5px",
                                      }}
                                    />
                                    Instagram
                                  </button>
                                ) : null}

                                {/* TIKTOK */}
                                {socmed.tiktok ? (
                                  <button
                                    className={`btn ${style.linkStick}`}
                                    type="button"
                                    onClick={() =>
                                      window.open(`${socmed.tiktok}`, "_blank")
                                    }
                                  >
                                    <Image
                                      src={require("../../../public/images/icon-tiktok.webp")}
                                      className={`${style.iconSocmed}`}
                                      // width={500}
                                      height={28}
                                      alt="Icon-Linkpocket"
                                      style={{
                                        marginRight: "6px",
                                      }}
                                    />
                                    Tiktok
                                  </button>
                                ) : null}

                                {/* WHATSAPP */}
                                {socmed.whatsapp ? (
                                  <button
                                    className={`btn ${style.linkStick}`}
                                    type="button"
                                    onClick={() =>
                                      window.open(
                                        `${socmed.whatsapp}`,
                                        "_blank"
                                      )
                                    }
                                  >
                                    <WhatsAppIcon
                                      className={`${style.iconSocmed}`}
                                      style={{
                                        color: "#25D366",
                                        fontSize: "30px",
                                        marginRight: "5px",
                                      }}
                                    />
                                    WhatsApp
                                  </button>
                                ) : null}

                                {/* YOUTUBE */}
                                {socmed.youtube ? (
                                  <button
                                    className={`btn ${style.linkStick}`}
                                    type="button"
                                    onClick={() =>
                                      window.open(`${socmed.youtube}`, "_blank")
                                    }
                                  >
                                    <YouTubeIcon
                                      className={`${style.iconSocmed}`}
                                      style={{
                                        color: "#FF0000",
                                        fontSize: "31px",
                                        marginRight: "5px",
                                      }}
                                    />
                                    YouTube
                                  </button>
                                ) : null}

                                {/* TWITTER */}
                                {socmed.twitter ? (
                                  <button
                                    className={`btn ${style.linkStick}`}
                                    type="button"
                                    onClick={() =>
                                      window.open(`${socmed.twitter}`, "_blank")
                                    }
                                  >
                                    <TwitterIcon
                                      className={`${style.iconSocmed}`}
                                      style={{
                                        color: "#1DA1F2",
                                        fontSize: "30px",
                                        marginRight: "5px",
                                      }}
                                    />
                                    Twitter
                                  </button>
                                ) : null}

                                {/* GITHUB */}
                                {socmed.github ? (
                                  <button
                                    className={`btn ${style.linkStick}`}
                                    type="button"
                                    onClick={() =>
                                      window.open(`${socmed.github}`, "_blank")
                                    }
                                  >
                                    <GitHubIcon
                                      className={`${style.iconSocmed}`}
                                      style={{
                                        color: "#333",
                                        fontSize: "30px",
                                        marginRight: "5px",
                                      }}
                                    />
                                    GitHub
                                  </button>
                                ) : null}

                                {/* LINKEDIN */}
                                {socmed.linkedin ? (
                                  <button
                                    className={`btn ${style.linkStick}`}
                                    type="button"
                                    onClick={() =>
                                      window.open(
                                        `${socmed.linkedin}`,
                                        "_blank"
                                      )
                                    }
                                  >
                                    <LinkedInIcon
                                      className={`${style.iconSocmed}`}
                                      style={{
                                        color: "#0072b1",
                                        fontSize: "30px",
                                        marginRight: "5px",
                                      }}
                                    />
                                    LinkedIn
                                  </button>
                                ) : null}

                                {/* SHOPEE */}
                                {socmed.shopee ? (
                                  <button
                                    className={`btn ${style.linkStick}`}
                                    type="button"
                                    onClick={() =>
                                      window.open(`${socmed.shopee}`, "_blank")
                                    }
                                  >
                                    <Image
                                      src={require("../../../public/images/icon-sp.webp")}
                                      className={`${style.iconSocmed}`}
                                      style={{
                                        marginRight: "5px",
                                      }}
                                      // width={500}
                                      height={28}
                                      alt="Icon-Linkpocket"
                                    />
                                    Shopee
                                  </button>
                                ) : null}
                                <style>
                                  {`
                                    ::-webkit-scrollbar {
                                      width: 0em;
                                      height: 0.5em;
                                    }
                                    ::-webkit-scrollbar-thumb {
                                      background-color: rgba(0, 0, 0, 0.2);
                                    }
                                  `}
                                </style>
                              </div>
                            </div>
                          </div>
                        </>
                      )}
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
