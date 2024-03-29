import React from "react";
import Head from "next/head";
import style from "@/styles/pages/createLinkpocket.module.scss";
import Image from "next/image";
import { useRouter } from "next/router";
import axios from "axios";
// import localStorage from "local-storage";

// MATERIAL UI
import Box from "@mui/material/Box";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

// ICON
import FacebookIcon from "@mui/icons-material/Facebook";
import GitHubIcon from "@mui/icons-material/GitHub";
import YouTubeIcon from "@mui/icons-material/YouTube";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";
import DriveFolderUploadIcon from "@mui/icons-material/DriveFolderUpload";

export default function UserSetup() {
  const router = useRouter();
  // const localStorage = require("local-storage");

  // SAVE DATA
  const [addName, setAddName] = React.useState(true);
  const [addDesc, setAddDesc] = React.useState(false);
  const [addListLink, setAddListLink] = React.useState(false);
  const [addPhoto, setAddPhoto] = React.useState(false);
  const [uploadImg, setUploadImg] = React.useState(null);

  // FORM LIST LINK SOCIAL MEDIA
  const [choose, setChoose] = React.useState(false);
  const [formFacebook, setFormFacebook] = React.useState(false);
  const [formInstagram, setFormInstagram] = React.useState(false);
  const [formTikTok, setFormTikTok] = React.useState(false);
  const [formWhatsApp, setFormWhatsApp] = React.useState(false);
  const [formYoutube, setFormYoutube] = React.useState(false);
  const [formTwitter, setFormTwitter] = React.useState(false);
  const [formGitHub, setFormGitHub] = React.useState(false);
  const [formLinkedIn, setFormLinkedIn] = React.useState(false);
  const [formShopee, setFormShopee] = React.useState(false);
  const [formAnother, setFormAnother] = React.useState(false);

  // STATE FOR ADD LINKPOCKET
  const [title, setTitle] = React.useState("");
  const [desc, setDesc] = React.useState("");
  const [background, setBackground] = React.useState("");
  const [picture, setPicture] = React.useState("");
  const [socmed, setSocmed] = React.useState({
    facebook: "",
    instagram: "",
    tiktok: "",
    whatsapp: "",
    youtube: "",
    twitter: "",
    github: "",
    linkedin: "",
    shopee: "",
  });
  const [link, setLink] = React.useState([
    {
      link: "",
      title: "",
    },
  ]);

  const [profile, setProfile] = React.useState([]);

  // // BUTTON CONDITION
  // const [checkActive, setCheckActive] = React.useState(false);

  // // GET PROFILE TO LOCAL STORAGE
  // const checkProfile = localStorage.get("profile")
  //   ? localStorage.get("profile")
  //   : null;
  // const [profile, setProfile] = React.useState(checkProfile);
  // console.log(profile?.fullname);
  // console.log(title)
  // console.log(checkActive)

  // const test = () => {
  //   if (checkActive == true) {
  //     setTitle(profile?.fullname);
  //   } else {
  //     setTitle("")
  //   }
  // }

  // CHECK IS LOGIN
  React.useEffect(() => {
    if (!localStorage.getItem("profile")) {
      router.push(`/auth/login`);
    }

    if (localStorage.getItem("profile")) {
      axios
        .get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/v1/space`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then(({ data }) => {
          // console.log(data?.data[0]);
          // console.log(data?.data.length);
          if (data?.data.length > 0) {
            const checkProfile = localStorage?.getItem("profile")
              ? JSON.parse(localStorage?.getItem("profile"))
              : null;

            router.push(`/profile/${checkProfile.fullname}`);
          }
        })
        .catch()
        .finally(() => {
          // setIsLoading(false);
        });
    }
  }, []);

  // ADD LINKPOCKET
  const sendData = () => {
    let bodyFormData = new FormData();
    // setLoading(true);

    bodyFormData.append("title", title);
    bodyFormData.append("desc", desc);
    bodyFormData.append("background", background);
    bodyFormData.append("social_media", JSON.stringify(socmed));
    bodyFormData.append("link", JSON.stringify(link));
    bodyFormData.append("photo_profile", picture);

    axios
      .post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/v1/space`, bodyFormData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage?.getItem("token")}`,
        },
      })
      .then(() => {
        router.push(`/profile/${title}`);
        // setUploadSuccess(true);
        // setUploadError(false);
      })
      .finally(() => {
        // setLoading(false);
      });
  };

  React.useEffect(() => {
    const checkProfile = localStorage?.getItem("profile")
      ? JSON.parse(localStorage?.getItem("profile"))
      : null;

    setProfile(checkProfile);
  }, []);

  return (
    <div>
      <Head>
        <title>SetUp | LinkPocket</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={style.main}>
        <section className={`container-fluid ${style.setup}`}>
          <div className={`container`}>
            <div className={`row`}>
              {!addListLink ? (
                <>
                  <div className={`col-12 p-0`}>
                    <div
                      className={`d-flex justify-content-center align-items-center ${style.setUpSide}`}
                    >
                      {/* CARD FORM SETUP USER */}
                      <div
                        className={`px-sm-5 px-4 py-sm-3 py-2 ${style.cardSetUp}`}
                      >
                        {/* HEAD CARD */}
                        <div className="row">
                          <div className={`col-12 ${style.headCard}`}>
                            <div className="d-flex justify-content-center align-items-center">
                              <Image
                                src={require("/public/images/Icon-app-outline.webp")}
                                className={`${style.iconApp}`}
                                // width={500}
                                height={75}
                                alt="Icon-Linkpocket"
                              />
                            </div>
                            <div className="d-flex justify-content-center align-items-center">
                              <h1 className={`${style.Title}`}>Hello,</h1>
                            </div>
                            <div className="d-flex justify-content-center align-items-center">
                              <h1 className={`${style.TitleName}`}>
                                {profile?.fullname}
                              </h1>
                            </div>
                          </div>
                        </div>
                        {/* END OF HEAD CARD */}

                        {/* FORM SETUP */}
                        {/* FORM NAME LINKPOCKET */}
                        {addName ? (
                          <div className="row">
                            <div className={`col-12 ${style.formNamePart}`}>
                              {/* INSTRUCTION */}
                              <div className="d-flex justify-content-center">
                                <p className={`${style.instruction}`}>
                                  Enter Your LinkPocket name
                                </p>
                              </div>

                              {/* FORM NAME LINKPOCKET */}
                              <TextField
                                className={`${style.form}`}
                                color="primary"
                                id="outlined-basic name"
                                label="LinkPocket Name"
                                fullWidth
                                variant="outlined"
                                inputProps={{
                                  style: {
                                    color: "white",
                                  },
                                }}
                                sx={{
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
                                }}
                                defaultValue={title}
                                // defaultValue={() => {
                                //   if (!checkActive) {
                                //     title ? title : null;
                                //   }

                                //   if (checkActive) {
                                //     profile?.fullname;
                                //   }
                                // }}
                                // defaultValue={profile?.fullname ? profile?.fullname : null}
                                onChange={(e) => {
                                  setTitle(e.target.value);
                                }}
                              />

                              {/* CHECKBOX */}
                              {/* <FormControlLabel
                                control={
                                  <Checkbox
                                    sx={{
                                      "&.Mui-checked": {
                                        color: "#03e9f4",
                                        outline: "white",
                                      },
                                      marginRight: "-5px",
                                    }}
                                  />
                                }
                                label="Same with account username"
                                sx={{
                                  "& .MuiFormControlLabel-label": {
                                    color: "white",
                                    fontSize: "12px",
                                    fontWeight: "normal",
                                  },
                                }}
                                // onClick={() => {
                                //   // setTitle(profile?.fullname);
                                //   if (!checkActive) {
                                //     setCheckActive(true);
                                //   } else {
                                //     setCheckActive(false);
                                //   }
                                //   test()
                                // }}
                              /> */}

                              {/* BUTTON NEXT */}
                              <div className="d-flex justify-content-end mt-3">
                                <button
                                  className={`btn ${style.btnNext}`}
                                  disabled={title.length == 0}
                                  onClick={() => {
                                    setAddName(false);
                                    setAddDesc(true);
                                    setAddListLink(false);
                                    setAddPhoto(false);
                                  }}
                                  // disabled={isLoading}
                                >
                                  {"Next ->"}
                                </button>
                              </div>
                            </div>
                          </div>
                        ) : null}
                        {/* FORM NAME LINKPOCKET */}

                        {/* FORM DESC LINKPOCKET */}
                        {addDesc ? (
                          <div className="row">
                            <div className={`col-12 ${style.formDescPart}`}>
                              {/* INSTRUCTION */}
                              <div className="d-flex justify-content-center">
                                <p className={`${style.instruction}`}>
                                  Enter a short description for Your Linkpocket
                                </p>
                              </div>

                              {/* FORM DESC LINKPOCKET */}
                              <TextField
                                className={style.form}
                                id="outlined-multiline-flexible"
                                label="Description"
                                fullWidth
                                multiline
                                maxRows={2}
                                inputProps={{
                                  style: {
                                    color: "white",
                                  },
                                  maxLength: 60,
                                }}
                                sx={{
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
                                }}
                                defaultValue={desc ? desc : null}
                                onChange={(e) => {
                                  setDesc(e.target.value);
                                }}
                              />
                              <style>
                                {`
                                  ::-webkit-scrollbar {
                                    width: 0.7em;
                                    height: 0.5em;
                                  }
                                  ::-webkit-scrollbar-thumb {
                                    background-color: rgba(0, 0, 0, 0.2);
                                  }
                                `}
                              </style>
                              {/* BUTTON NEXT */}
                              <div className="mt-4 d-flex justify-content-end">
                                <button
                                  className={`btn ${style.btnNext}`}
                                  onClick={() => {
                                    setAddName(true);
                                    setAddDesc(false);
                                    setAddListLink(false);
                                    setAddPhoto(false);
                                  }}
                                  // disabled={isLoading}
                                >
                                  {"<- Back"}
                                </button>
                                <button
                                  className={`btn ${style.btnNext}`}
                                  disabled={desc.length == 0}
                                  onClick={() => {
                                    setAddName(false);
                                    setAddDesc(false);
                                    setAddListLink(true);
                                    setAddPhoto(false);
                                  }}
                                  // disabled={isLoading}
                                >
                                  {"Next ->"}
                                </button>
                              </div>
                            </div>
                          </div>
                        ) : null}
                        {/* FORM DESC LINKPOCKET */}

                        {/* FORM PHOTO LINKPOCKET */}
                        {addPhoto ? (
                          <div className="row">
                            <div className={`col-12 ${style.formPhotoPart}`}>
                              {/* INSTRUCTION */}
                              <div className="d-flex justify-content-center">
                                <p className={`${style.instruction}`}>
                                  Upload an image for your LinkPocket Photo
                                  Profile
                                </p>
                              </div>

                              {/* FORM DESC LINKPOCKET */}
                              <div
                                className={`d-flex justify-content-center align-items-center mb-0 ${style.formPhoto}`}
                              >
                                <label
                                  className="form-label border border-info border-3 rounded-4"
                                  for="customFile1"
                                  style={{
                                    backgroundImage: `url(${uploadImg})`,
                                    backgroundSize: "cover",
                                  }}
                                >
                                  {uploadImg === null ? (
                                    <>
                                      <div
                                        style={{
                                          height: "100%",
                                          width: "100%",
                                        }}
                                        className="d-flex justify-content-center align-items-center"
                                      >
                                        <div>
                                          <div className="d-flex justify-content-center">
                                            <DriveFolderUploadIcon
                                              style={{
                                                color: "#03e9f4",
                                                fontSize: "50px",
                                              }}
                                            />
                                          </div>
                                          <p style={{ color: "#03e9f4" }}>
                                            Upload Image
                                          </p>
                                          <p
                                            className={`d-flex justify-content-center ${style.rulesPhoto}`}
                                          >
                                            Ratio 1/1
                                          </p>
                                        </div>
                                      </div>
                                    </>
                                  ) : null}
                                </label>
                                <input
                                  type="file"
                                  className="form-control d-none"
                                  id="customFile1"
                                  accept="image/*"
                                  onChange={(e) => {
                                    setUploadImg(
                                      URL.createObjectURL(e.target.files[0])
                                    );
                                    setPicture(e.target.files[0]);
                                  }}
                                />
                              </div>
                              {/* BUTTON NEXT */}
                              <div className="mt-4 d-flex justify-content-end">
                                <button
                                  className={`btn ${style.btnNext}`}
                                  onClick={() => {
                                    setAddName(false);
                                    setAddDesc(false);
                                    setAddListLink(true);
                                    setAddPhoto(false);
                                  }}
                                  // disabled={isLoading}
                                >
                                  {"<- Back"}
                                </button>
                                <button
                                  className={`btn ${style.btnNext}`}
                                  disabled={picture.length == 0}
                                  onClick={() => {
                                    setAddName(false);
                                    setAddDesc(false);
                                    setAddListLink(false);
                                    setAddPhoto(true);

                                    sendData();
                                  }}
                                  // disabled={isLoading}
                                >
                                  {"Save"}
                                </button>
                              </div>
                            </div>
                          </div>
                        ) : null}
                        {/* FORM PHOTO LINKPOCKET */}
                        {/* END OF FORM SETUP */}
                      </div>
                      {/* END CARD SETUP USER */}
                    </div>
                  </div>
                </>
              ) : null}

              {/* FORM LIST LINKPOCKET */}
              {addListLink ? (
                <>
                  {/* LEFT SIDE */}
                  <div className={`col-sm-6 p-0 ${style.leftSide}`}>
                    <div
                      className={`d-flex justify-content-center align-items-center ${style.setUpList}`}
                    >
                      {/* CARD FORM SETUP USER */}
                      <div
                        className={`px-sm-5 px-4 py-sm-3 py-2 pb-4 ${style.cardSetUp}`}
                      >
                        {/* HEAD CARD */}
                        <div className="row">
                          <div className={`col-12 ${style.headCard}`}>
                            <div className="d-flex justify-content-center align-items-center">
                              <Image
                                src={require("/public/images/Icon-app-outline.webp")}
                                className={`${style.iconApp}`}
                                // width={500}
                                height={75}
                                alt="Icon-Linkpocket"
                              />
                            </div>
                            <div className="d-flex justify-content-center align-items-center">
                              <h1 className={`${style.Title}`}>Hello,</h1>
                            </div>
                            <div className="d-flex justify-content-center align-items-center">
                              <h1 className={`${style.TitleName}`}>
                                {profile.fullname}
                              </h1>
                            </div>
                          </div>
                        </div>
                        {/* END OF HEAD CARD */}

                        {/* FORM SETUP */}
                        <div className="row">
                          <div className={`col-12 ${style.formListPart}`}>
                            {/* INSTRUCTION */}
                            <div className="d-flex justify-content-center">
                              <p className={`${style.instruction}`}>
                                Choose which Social Media you will add to your
                                LinkPocket
                              </p>
                            </div>

                            {/* SOCMED OPTION */}
                            <div className={`row ${style.option}`}>
                              <div className="col-12 p-0 text-center">
                                {/* FACEBOOK */}
                                <button
                                  // className={`btn btn-outline-primary ${style.btnOption}`}
                                  className={`btn btn-outline-primary ${
                                    formFacebook
                                      ? style.selected
                                      : style.btnOption
                                  }`}
                                  onClick={() => {
                                    if (formFacebook === false) {
                                      setFormFacebook(true);
                                    } else {
                                      setFormFacebook(false);
                                    }
                                  }}
                                  // disabled={isLoading}
                                >
                                  {/* <Image
                                        src={require("../../../public/images/icon-fb.png")}
                                        className={`${style.iconSocmed}`}
                                        // width={500}
                                        height={31}
                                        alt="Icon-Linkpocket"
                                      /> */}
                                  <FacebookIcon
                                    className={`${style.iconSocmed}`}
                                    style={{
                                      color: "#4267B2",
                                      fontSize: "30px",
                                    }}
                                  />{" "}
                                  Facebook
                                </button>

                                {/* GITHUB */}
                                <button
                                  className={`btn btn-outline-primary ${
                                    formGitHub
                                      ? style.selected
                                      : style.btnOption
                                  }`}
                                  onClick={() => {
                                    if (formGitHub === false) {
                                      setFormGitHub(true);
                                    } else {
                                      setFormGitHub(false);
                                    }
                                  }}
                                  // disabled={isLoading}
                                >
                                  {/* <Image
                                        src={require("../../../public/images/icon-gh.png")}
                                        className={`${style.iconSocmed}`}
                                        style={{
                                          marginRight: "3px",
                                          letterSpacing: "0",
                                        }}
                                        // width={500}
                                        height={28}
                                        alt="Icon-Linkpocket"
                                      /> */}
                                  <GitHubIcon
                                    className={`${style.iconSocmed}`}
                                    style={{
                                      color: "#333",
                                      fontSize: "29px",
                                    }}
                                  />{" "}
                                  GitHub
                                </button>

                                {/* YOUTUBE */}
                                <button
                                  className={`btn btn-outline-primary ${
                                    formYoutube
                                      ? style.selected
                                      : style.btnOption
                                  }`}
                                  onClick={() => {
                                    if (formYoutube === false) {
                                      setFormYoutube(true);
                                    } else {
                                      setFormYoutube(false);
                                    }
                                  }}
                                  // disabled={isLoading}
                                >
                                  {/* <Image
                                        src={require("../../../public/images/icon-yt.png")}
                                        className={`${style.iconSocmed}`}
                                        // width={500}
                                        height={27}
                                        alt="Icon-Linkpocket"
                                      /> */}
                                  <YouTubeIcon
                                    className={`${style.iconSocmed}`}
                                    style={{
                                      color: "#FF0000",
                                      fontSize: "31px",
                                    }}
                                  />{" "}
                                  YouTube
                                </button>

                                {/* TIKTOK */}
                                <button
                                  className={`btn btn-outline-primary ${
                                    formTikTok
                                      ? style.selected
                                      : style.btnOption
                                  }`}
                                  onClick={() => {
                                    if (formTikTok === false) {
                                      setFormTikTok(true);
                                    } else {
                                      setFormTikTok(false);
                                    }
                                  }}
                                  // disabled={isLoading}
                                >
                                  <Image
                                    src={require("../../../public/images/icon-tiktok.webp")}
                                    className={`${style.iconSocmed}`}
                                    // width={500}
                                    height={29}
                                    alt="Icon-Linkpocket"
                                    style={{
                                      marginRight: "5px",
                                      letterSpacing: "0",
                                    }}
                                  />
                                  TikTok
                                </button>

                                {/* WHATSAPP */}
                                <button
                                  className={`btn btn-outline-primary ${
                                    formWhatsApp
                                      ? style.selected
                                      : style.btnOption
                                  }`}
                                  onClick={() => {
                                    if (formWhatsApp === false) {
                                      setFormWhatsApp(true);
                                    } else {
                                      setFormWhatsApp(false);
                                    }
                                  }}
                                  // disabled={isLoading}
                                >
                                  {/* <Image
                                        src={require("../../../public/images/icon-wa.png")}
                                        className={`${style.iconSocmed}`}
                                        // width={500}
                                        height={28}
                                        alt="Icon-Linkpocket"
                                      /> */}
                                  <WhatsAppIcon
                                    className={`${style.iconSocmed}`}
                                    style={{
                                      color: "#25D366",
                                      fontSize: "29px",
                                    }}
                                  />{" "}
                                  WhatsApp
                                </button>

                                {/* TWITTER */}
                                <button
                                  className={`btn btn-outline-primary ${
                                    formTwitter
                                      ? style.selected
                                      : style.btnOption
                                  }`}
                                  onClick={() => {
                                    if (formTwitter === false) {
                                      setFormTwitter(true);
                                    } else {
                                      setFormTwitter(false);
                                    }
                                  }}
                                  // disabled={isLoading}
                                >
                                  {/* <Image
                                        src={require("../../../public/images/icon-twt.png")}
                                        className={`${style.iconSocmed}`}
                                        style={{
                                          marginRight: "7px",
                                          letterSpacing: "0",
                                        }}
                                        // width={500}
                                        height={27}
                                        alt="Icon-Linkpocket"
                                      /> */}
                                  <TwitterIcon
                                    className={`${style.iconSocmed}`}
                                    style={{
                                      color: "#1DA1F2",
                                      fontSize: "29px",
                                    }}
                                  />{" "}
                                  Twitter
                                </button>

                                {/* LINKEDIN */}
                                <button
                                  className={`btn btn-outline-primary ${
                                    formLinkedIn
                                      ? style.selected
                                      : style.btnOption
                                  }`}
                                  onClick={() => {
                                    if (formLinkedIn === false) {
                                      setFormLinkedIn(true);
                                    } else {
                                      setFormLinkedIn(false);
                                    }
                                  }}
                                  // disabled={isLoading}
                                >
                                  {/* <Image
                                        src={require("../../../public/images/icon-li.png")}
                                        className={`${style.iconSocmed}`}
                                        style={{
                                          marginRight: "3px",
                                          letterSpacing: "0",
                                        }}
                                        // width={500}
                                        height={28}
                                        alt="Icon-Linkpocket"
                                      /> */}
                                  <LinkedInIcon
                                    className={`${style.iconSocmed}`}
                                    style={{
                                      color: "#0072b1",
                                      fontSize: "29px",
                                    }}
                                  />{" "}
                                  LinkedIn
                                </button>

                                {/* INSTAGRAM */}
                                <button
                                  className={`btn btn-outline-primary ${
                                    formInstagram
                                      ? style.selected
                                      : style.btnOption
                                  }`}
                                  onClick={() => {
                                    if (formInstagram === false) {
                                      setFormInstagram(true);
                                    } else {
                                      setFormInstagram(false);
                                    }
                                  }}
                                  // disabled={isLoading}
                                >
                                  {/* <Image
                                        src={require("../../../public/images/icon-ig.png")}
                                        className={`${style.iconSocmed}`}
                                        style={{
                                          marginRight: "0",
                                          letterSpacing: "0",
                                        }}
                                        // width={500}
                                        height={27}
                                        alt="Icon-Linkpocket"
                                      /> */}
                                  <InstagramIcon
                                    className={`${style.iconSocmed}`}
                                    style={{
                                      color: "#E1306C",
                                      fontSize: "29px",
                                    }}
                                  />{" "}
                                  Instagram
                                </button>

                                {/* SHOPEE */}
                                <button
                                  className={`btn btn-outline-primary ${
                                    formShopee
                                      ? style.selected
                                      : style.btnOption
                                  }`}
                                  onClick={() => {
                                    if (formShopee === false) {
                                      setFormShopee(true);
                                    } else {
                                      setFormShopee(false);
                                    }
                                  }}
                                  // disabled={isLoading}
                                >
                                  <Image
                                    src={require("../../../public/images/icon-sp.webp")}
                                    className={`${style.iconSocmed}`}
                                    style={{
                                      marginRight: "7px",
                                      letterSpacing: "0",
                                    }}
                                    // width={500}
                                    height={27}
                                    alt="Icon-Linkpocket"
                                  />
                                  Shopee
                                </button>

                                {/* ANOTHER */}
                                {/* <button
                                      className={`btn btn-outline-primary ${
                                        formAnother
                                          ? style.selected
                                          : style.btnOption
                                      }`}
                                      style={{
                                        padding: "5px 50px",
                                      }}
                                      onClick={() => {
                                        if (formAnother === false) {
                                          setFormAnother(true);
                                        } else {
                                          setFormAnother(false);
                                        }
                                      }}
                                      // disabled={isLoading}
                                    >
                                      +
                                    </button> */}
                              </div>
                            </div>

                            {/* BUTTON NEXT */}
                            <div className="d-flex justify-content-end">
                              <button
                                className={`btn ${style.btnNext}`}
                                onClick={() => {
                                  setAddName(false);
                                  setAddDesc(true);
                                  setAddListLink(false);
                                  setAddPhoto(false);
                                }}
                                // disabled={isLoading}
                              >
                                {"<- Back"}
                              </button>
                              <button
                                className={`btn ${style.btnNext}`}
                                onClick={() => {
                                  setAddName(false);
                                  setAddDesc(false);
                                  setAddListLink(false);
                                  setAddPhoto(true);
                                }}
                                // disabled={isLoading}
                              >
                                {"Skip ->"}
                              </button>
                            </div>
                          </div>
                        </div>
                        {/* FORM NAME LINKPOCKET */}
                        {/* END OF FORM SETUP */}
                      </div>
                      {/* END CARD SETUP USER */}
                    </div>
                  </div>
                  {/* END OF LEFT SIDE */}

                  {/* RIGHT SIDE */}
                  <div className={`col-sm-6 p-0 ${style.rightSide}`}>
                    <div
                      className={`d-flex justify-content-center align-items-center ${style.setUpList}`}
                    >
                      {/* CARD FORM SETUP USER */}
                      <div
                        className={`px-sm-5 px-4 py-sm-3 py-2 ${style.cardSetUp}`}
                      >
                        {/* FORM SETUP */}
                        <div className="row">
                          <div className={`col-12 p-0 ${style.formNamePart}`}>
                            {/* INSTRUCTION */}
                            <div className="d-flex justify-content-center">
                              <p className={`${style.instruction}`}>
                                Enter Your LinkPocket name
                              </p>
                            </div>

                            {/* FORM LINK SOCMED */}
                            <div className={`${style.formLink}`}>
                              <Box
                                sx={{
                                  "& > :not(style)": { m: 1 },
                                }}
                              >
                                {/* FACEBOOK */}
                                {formFacebook ? (
                                  <>
                                    <Box
                                      sx={{
                                        display: "flex",
                                        alignItems: "flex-end",
                                        "& > :not(style)": { mb: 2 },
                                      }}
                                    >
                                      <FacebookIcon
                                        style={{
                                          color: "#4267B2",
                                          fontSize: "40px",
                                          marginRight: "5px",
                                        }}
                                      />
                                      <TextField
                                        className={style.formFb}
                                        id="outlined-search"
                                        label="Facebook"
                                        fullWidth
                                        size="small"
                                        type="Required"
                                        inputProps={{
                                          style: {
                                            color: "white",
                                          },
                                        }}
                                        sx={{
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
                                        }}
                                        defaultValue={socmed.facebook}
                                        onChange={(e) => {
                                          setSocmed({
                                            facebook: e.target.value,
                                            instagram: socmed.instagram,
                                            tiktok: socmed.tiktok,
                                            whatsapp: socmed.whatsapp,
                                            youtube: socmed.youtube,
                                            twitter: socmed.twitter,
                                            github: socmed.github,
                                            linkedin: socmed.linkedin,
                                            shopee: socmed.shopee,
                                          });
                                        }}
                                      />
                                    </Box>
                                  </>
                                ) : null}

                                {/* INSTAGRAM */}
                                {formInstagram ? (
                                  <>
                                    <Box
                                      sx={{
                                        display: "flex",
                                        alignItems: "flex-end",
                                        "& > :not(style)": { mb: 2 },
                                      }}
                                    >
                                      <InstagramIcon
                                        style={{
                                          color: "#E1306C",
                                          fontSize: "40px",
                                          marginRight: "5px",
                                        }}
                                      />
                                      <TextField
                                        id="outlined-search"
                                        label="Instagram"
                                        fullWidth
                                        size="small"
                                        type="Required"
                                        inputProps={{
                                          style: {
                                            color: "white",
                                          },
                                        }}
                                        sx={{
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
                                        }}
                                        defaultValue={socmed.instagram}
                                        onChange={(e) => {
                                          setSocmed({
                                            facebook: socmed.facebook,
                                            instagram: e.target.value,
                                            tiktok: socmed.tiktok,
                                            whatsapp: socmed.whatsapp,
                                            youtube: socmed.youtube,
                                            twitter: socmed.twitter,
                                            github: socmed.github,
                                            linkedin: socmed.linkedin,
                                            shopee: socmed.shopee,
                                          });
                                        }}
                                      />
                                    </Box>
                                  </>
                                ) : null}

                                {/* TIKTOK */}
                                {formTikTok ? (
                                  <>
                                    <Box
                                      sx={{
                                        display: "flex",
                                        alignItems: "flex-end",
                                        "& > :not(style)": { mb: 2 },
                                      }}
                                    >
                                      <Image
                                        src={require("../../../public/images/icon-tiktok.webp")}
                                        className={`${style.iconSocmed}`}
                                        style={{
                                          marginRight: "6px",
                                          marginLeft: "2px",
                                        }}
                                        // width={500}
                                        height={37}
                                        alt="Icon-Linkpocket"
                                      />
                                      <TextField
                                        id="outlined-search"
                                        label="TikTok"
                                        fullWidth
                                        size="small"
                                        type="Required"
                                        inputProps={{
                                          style: {
                                            color: "white",
                                          },
                                        }}
                                        sx={{
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
                                        }}
                                        defaultValue={socmed.tiktok}
                                        onChange={(e) => {
                                          setSocmed({
                                            facebook: socmed.facebook,
                                            instagram: socmed.instagram,
                                            tiktok: e.target.value,
                                            whatsapp: socmed.whatsapp,
                                            youtube: socmed.youtube,
                                            twitter: socmed.twitter,
                                            github: socmed.github,
                                            linkedin: socmed.linkedin,
                                            shopee: socmed.shopee,
                                          });
                                        }}
                                      />
                                    </Box>
                                  </>
                                ) : null}

                                {/* WHATSAPP */}
                                {formWhatsApp ? (
                                  <>
                                    <Box
                                      sx={{
                                        display: "flex",
                                        alignItems: "flex-end",
                                        "& > :not(style)": { mb: 2 },
                                      }}
                                    >
                                      <WhatsAppIcon
                                        style={{
                                          color: "#25D366",
                                          fontSize: "40px",
                                          marginRight: "5px",
                                        }}
                                      />
                                      <TextField
                                        id="outlined-search"
                                        label="WhatsApp"
                                        fullWidth
                                        size="small"
                                        type="Required"
                                        inputProps={{
                                          style: {
                                            color: "white",
                                          },
                                        }}
                                        sx={{
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
                                        }}
                                        defaultValue={socmed.whatsapp}
                                        onChange={(e) => {
                                          setSocmed({
                                            facebook: socmed.facebook,
                                            instagram: socmed.instagram,
                                            tiktok: socmed.tiktok,
                                            whatsapp: e.target.value,
                                            youtube: socmed.youtube,
                                            twitter: socmed.twitter,
                                            github: socmed.github,
                                            linkedin: socmed.linkedin,
                                            shopee: socmed.shopee,
                                          });
                                        }}
                                      />
                                    </Box>
                                  </>
                                ) : null}

                                {/* YOUTUBE */}
                                {formYoutube ? (
                                  <>
                                    <Box
                                      sx={{
                                        display: "flex",
                                        alignItems: "flex-end",
                                        "& > :not(style)": { mb: 2 },
                                      }}
                                    >
                                      <YouTubeIcon
                                        style={{
                                          color: "#FF0000",
                                          fontSize: "40px",
                                          marginRight: "5px",
                                        }}
                                      />
                                      <TextField
                                        id="outlined-search"
                                        label="YouTube"
                                        fullWidth
                                        size="small"
                                        type="Required"
                                        inputProps={{
                                          style: {
                                            color: "white",
                                          },
                                        }}
                                        sx={{
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
                                        }}
                                        defaultValue={socmed.youtube}
                                        onChange={(e) => {
                                          setSocmed({
                                            facebook: socmed.facebook,
                                            instagram: socmed.instagram,
                                            tiktok: socmed.tiktok,
                                            whatsapp: socmed.whatsapp,
                                            youtube: e.target.value,
                                            twitter: socmed.twitter,
                                            github: socmed.github,
                                            linkedin: socmed.linkedin,
                                            shopee: socmed.shopee,
                                          });
                                        }}
                                      />
                                    </Box>
                                  </>
                                ) : null}

                                {/* TWITTER */}
                                {formTwitter ? (
                                  <>
                                    <Box
                                      sx={{
                                        display: "flex",
                                        alignItems: "flex-end",
                                        "& > :not(style)": { mb: 2 },
                                      }}
                                    >
                                      <TwitterIcon
                                        style={{
                                          color: "#1DA1F2",
                                          fontSize: "40px",
                                          marginRight: "5px",
                                        }}
                                      />
                                      <TextField
                                        id="outlined-search"
                                        label="Twitter"
                                        fullWidth
                                        size="small"
                                        type="Required"
                                        inputProps={{
                                          style: {
                                            color: "white",
                                          },
                                        }}
                                        sx={{
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
                                        }}
                                        defaultValue={socmed.twitter}
                                        onChange={(e) => {
                                          setSocmed({
                                            facebook: socmed.facebook,
                                            instagram: socmed.instagram,
                                            tiktok: socmed.tiktok,
                                            whatsapp: socmed.whatsapp,
                                            youtube: socmed.youtube,
                                            twitter: e.target.value,
                                            github: socmed.github,
                                            linkedin: socmed.linkedin,
                                            shopee: socmed.shopee,
                                          });
                                        }}
                                      />
                                    </Box>
                                  </>
                                ) : null}

                                {/* GITHUB */}
                                {formGitHub ? (
                                  <>
                                    <Box
                                      sx={{
                                        display: "flex",
                                        alignItems: "flex-end",
                                        "& > :not(style)": { mb: 2 },
                                      }}
                                    >
                                      <GitHubIcon
                                        style={{
                                          color: "#333",
                                          fontSize: "40px",
                                          marginRight: "5px",
                                        }}
                                      />
                                      <TextField
                                        id="outlined-search"
                                        label="GitHub"
                                        fullWidth
                                        size="small"
                                        type="Required"
                                        inputProps={{
                                          style: {
                                            color: "white",
                                          },
                                        }}
                                        sx={{
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
                                        }}
                                        defaultValue={socmed.github}
                                        onChange={(e) => {
                                          setSocmed({
                                            facebook: socmed.facebook,
                                            instagram: socmed.instagram,
                                            tiktok: socmed.tiktok,
                                            whatsapp: socmed.whatsapp,
                                            youtube: socmed.youtube,
                                            twitter: socmed.twitter,
                                            github: e.target.value,
                                            linkedin: socmed.linkedin,
                                            shopee: socmed.shopee,
                                          });
                                        }}
                                      />
                                    </Box>
                                  </>
                                ) : null}

                                {/* LINKEDIN */}
                                {formLinkedIn ? (
                                  <>
                                    <Box
                                      sx={{
                                        display: "flex",
                                        alignItems: "flex-end",
                                        "& > :not(style)": { mb: 2 },
                                      }}
                                    >
                                      <LinkedInIcon
                                        style={{
                                          color: "#0072b1",
                                          fontSize: "40px",
                                          marginRight: "5px",
                                        }}
                                      />
                                      <TextField
                                        id="outlined-search"
                                        label="LinkedIn"
                                        fullWidth
                                        size="small"
                                        type="Required"
                                        inputProps={{
                                          style: {
                                            color: "white",
                                          },
                                        }}
                                        sx={{
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
                                        }}
                                        defaultValue={socmed.linkedin}
                                        onChange={(e) => {
                                          setSocmed({
                                            facebook: socmed.facebook,
                                            instagram: socmed.instagram,
                                            tiktok: socmed.tiktok,
                                            whatsapp: socmed.whatsapp,
                                            youtube: socmed.youtube,
                                            twitter: socmed.twitter,
                                            github: socmed.github,
                                            linkedin: e.target.value,
                                            shopee: socmed.shopee,
                                          });
                                        }}
                                      />
                                    </Box>
                                  </>
                                ) : null}

                                {/* SHOPEE */}
                                {formShopee ? (
                                  <>
                                    <Box
                                      sx={{
                                        display: "flex",
                                        alignItems: "flex-end",
                                        "& > :not(style)": { mb: 2 },
                                      }}
                                    >
                                      <Image
                                        src={require("../../../public/images/icon-sp.webp")}
                                        className={`${style.iconSocmed}`}
                                        style={{ marginRight: "5px" }}
                                        // width={500}
                                        height={40}
                                        alt="Icon-Linkpocket"
                                      />
                                      <TextField
                                        id="outlined-search"
                                        label="Shopee"
                                        fullWidth
                                        size="small"
                                        type="Required"
                                        inputProps={{
                                          style: {
                                            color: "white",
                                          },
                                        }}
                                        sx={{
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
                                        }}
                                        defaultValue={socmed.shopee}
                                        onChange={(e) => {
                                          setSocmed({
                                            facebook: socmed.facebook,
                                            instagram: socmed.instagram,
                                            tiktok: socmed.tiktok,
                                            whatsapp: socmed.whatsapp,
                                            youtube: socmed.youtube,
                                            twitter: socmed.twitter,
                                            github: socmed.github,
                                            linkedin: socmed.linkedin,
                                            shopee: e.target.value,
                                          });
                                        }}
                                      />
                                    </Box>
                                  </>
                                ) : null}

                                {/* ANOTHER */}
                                {/* {formAnother ? (
                                          <>
                                            <Box
                                              sx={{
                                                display: "flex",
                                                alignItems: "flex-end",
                                                "& > :not(style)": { mb: 2 },
                                              }}
                                            >
                                              <Image
                                                src={require("../../../public/images/icon-fb.png")}
                                                className={`${style.iconSocmed}`}
                                                style={{ marginRight: "5px" }}
                                                // width={500}
                                                height={40}
                                                alt="Icon-Linkpocket"
                                              />
                                              <TextField
                                                id="outlined-search"
                                                label="Another"
                                                size="small"
                                                type="Required"
                                                color="primary"
                                                sx={{
                                                  width: "100%",
                                                }}
                                              />
                                            </Box>
                                          </>
                                        ) : null} */}
                              </Box>
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
                            {/* BUTTON NEXT */}
                            <div
                              className={`d-flex justify-content-end d-flex ${style.divBtnNext}`}
                            >
                              <button
                                className={`btn ${style.btnNext}`}
                                onClick={() => {
                                  setAddName(false);
                                  setAddDesc(false);
                                  setAddListLink(false);
                                  setAddPhoto(true);
                                }}
                                // disabled={isLoading}
                              >
                                {"Next ->"}
                              </button>
                            </div>
                          </div>
                        </div>
                        {/* FORM NAME LINKPOCKET */}
                        {/* END OF FORM SETUP */}
                      </div>
                      {/* END CARD SETUP USER */}
                    </div>
                  </div>
                  {/* END OF RIGHT SIDE */}
                </>
              ) : null}
              {/* FORM DESC LINKPOCKET */}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
