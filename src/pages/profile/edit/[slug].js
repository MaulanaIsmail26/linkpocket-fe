import React from "react";
import Head from "next/head";
import style from "@/styles/pages/editProfile.module.scss";
import Image from "next/image";
import { useRouter } from "next/router";
import axios from "axios";
import Link from "next/link";

// MATERIAL UI
import TextField from "@mui/material/TextField";

export default function Edit() {
  const router = useRouter();
  const [addPhoto, setAddPhoto] = React.useState(false);
  const [uploadImg, setUploadImg] = React.useState(null);
  const [picture, setPicture] = React.useState("");

  const [socmed, setSocmed] = React.useState([]);
  const [title, setTitle] = React.useState([]);
  const [photo, setPhoto] = React.useState([]);
  const [desc, setDesc] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  // STATE FOR MODAL
  const [link, setLink] = React.useState(``);

  // STATE FOR EDIT
  const [slug, setSlug] = React.useState(``);
  const convertSlug = slug.split("-").slice(0, 2).join("-");

  // CHECK IS LOGIN
  React.useEffect(() => {
    setIsLoading(true);
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
          if (data?.data.length === 0) {
            router.push(`/user/create_linkpocket`);
          }
        })
        .catch()
        .finally(() => {
          // setIsLoading(false);
        });
    }
  }, []);

  // GET USER DATA
  React.useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/v1/space`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then(({ data }) => {
        const test = JSON.parse(data?.data[0]?.social_media);
        setSocmed(test);
        setTitle(data?.data[0]?.title);
        setPhoto(data?.data[0]?.photo_profile);
        setDesc(data?.data[0]?.desc);
        // setLink(`linkpocket.vercel.app/pocket/${data?.data[0]?.slug}`);
        setSlug(`${data?.data[0]?.slug}`);

        setUploadImg(data?.data[0]?.photo_profile);
        setPicture(data?.data[0]?.photo_profile);
      })
      .catch(() => setSocmed([]))
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  // SAVE EDIT LINKPOCKET
  const sendData = () => {
    let bodyFormData = new FormData();
    setIsLoading(true);

    bodyFormData.append("title", title);
    bodyFormData.append("desc", desc);
    // bodyFormData.append("photo_profile", picture);

    axios
      .put(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/v1/space/${slug}`,
        bodyFormData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage?.getItem("token")}`,
          },
        }
      )
      .then(() => {
        router.push(`/profile/${convertSlug}`);
      })
      .finally(() => {
        // setIsLoading(false);
      });
  };

  return (
    <div>
      <Head>
        <title>Edit Profile | LinkPocket</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={style.main}>
        <section className={`container-fluid ${style.edit}`}>
          <div className={`container`}>
            <div className={`row`}>
              <div className={`col-12 p-0`}>
                <div
                  className={`d-flex justify-content-center align-items-center ${style.editSide}`}
                >
                  {/* CARD FORM EDIT USER */}
                  <div
                    className={`px-sm-5 px-4 py-sm-3 py-2 ${style.cardEdit}`}
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
                              <h1 className={`${style.Title}`}>Edit Profile</h1>
                            </div>
                          </div>
                        </div>
                        {/* END OF HEAD CARD */}

                        <div className={`row ${style.linkSection}`}>
                          <div className="col-12">
                            {/* FORM PHOTO LINKPOCKET */}
                            <div className="row">
                              <div className={`col-12 ${style.formPhotoPart}`}>
                                {/* FORM PHOTO LINKPOCKET */}
                                <div
                                  className={`d-flex justify-content-center align-items-center mb-0 ${style.formPhoto}`}
                                >
                                  <div
                                    className="form-label border border-info border-3 rounded-4"
                                    for="customFile1"
                                    style={{
                                      backgroundImage: `url(${uploadImg})`,
                                      backgroundSize: "cover",
                                    }}
                                  >
                                    {/* {uploadImg === null ? (
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
                                                  fontSize: "35px",
                                                }}
                                              />
                                            </div>
                                            <p
                                              style={{
                                                color: "#03e9f4",
                                                fontSize: "14px",
                                              }}
                                            >
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
                                    ) : null} */}
                                  </div>
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
                              </div>
                            </div>
                            {/* END OF FORM PHOTO LINKPOCKET */}

                            {/* FORM NAME LINKPOCKET */}
                            <div className="row mt-4">
                              <div className={`col-12 ${style.formNamePart}`}>
                                {/* INSTRUCTION */}
                                <div className="d-flex justify-content-center">
                                  <p className={`${style.instruction}`}>
                                    Your LinkPocket title
                                  </p>
                                </div>
                                {/* FORM TITLE LINKPOCKET */}
                                <TextField
                                  className={`mt-2 ${style.form}`}
                                  id="outlined-multiline-flexible"
                                  label="Title LinkPocket"
                                  multiline
                                  focused
                                  defaultValue={title}
                                  maxRows={1}
                                  fullWidth
                                  inputProps={{
                                    style: { color: "white" },
                                    maxLength: 16,
                                  }}
                                  sx={{
                                    "& label": {
                                      color: "#03e9f4",
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
                                  onChange={(e) => {
                                    setTitle(e.target.value);
                                  }}
                                />
                              </div>
                            </div>
                            {/* END OF FORM TITLE LINKPOCKET */}

                            {/* FORM DESC LINKPOCKET */}
                            <div className="row mt-4">
                              <div className={`col-12 ${style.formDescPart}`}>
                                {/* INSTRUCTION */}
                                <div className="d-flex justify-content-center">
                                  <p className={`${style.instruction}`}>
                                    Your LinkPocket Description
                                  </p>
                                </div>
                                {/* FORM NAME LINKPOCKET */}
                                <TextField
                                  className={`${style.form}`}
                                  id="outlined-multiline-flexible"
                                  label="Description"
                                  multiline
                                  focused
                                  defaultValue={desc}
                                  maxRows={3}
                                  fullWidth
                                  inputProps={{
                                    style: { color: "white" },
                                    maxLength: 60,
                                  }}
                                  sx={{
                                    "& label": {
                                      color: "#03e9f4",
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
                                  onChange={(e) => {
                                    setDesc(e.target.value);
                                  }}
                                />
                              </div>
                            </div>
                            {/* FORM DESC LINKPOCKET */}

                            {/* BUTTON SAVE EDIT */}
                            <div className="row mt-3">
                              <div className={`col-12 ${style.button}`}>
                                <div className="mt-4 d-flex justify-content-end">
                                  <Link
                                    className={`btn ${style.btnCancel}`}
                                    onClick={() => {
                                      setIsLoading(true);
                                    }}
                                    href={`/profile/${convertSlug}`}
                                  >
                                    {"Cancel"}
                                  </Link>
                                  <button
                                    className={`btn ${style.btnSave}`}
                                    onClick={() => {
                                      sendData();
                                    }}
                                  >
                                    {"Save"}
                                  </button>
                                </div>
                              </div>
                            </div>
                            {/* END OF BUTTON SAVE EDIT */}

                            {/* STYLE TAB SCROLL */}
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
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
