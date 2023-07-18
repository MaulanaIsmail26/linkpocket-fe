import Head from "next/head";
import Image from "next/image";
import style from "@/styles/pages/profile.module.scss";
import React from "react";
import axios from "axios";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Link from "next/link";
import BtnLink from "components/molecules/btnLink";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { useRouter } from "next/router";

// ICON
import FacebookIcon from "@mui/icons-material/Facebook";
import GitHubIcon from "@mui/icons-material/GitHub";
import YouTubeIcon from "@mui/icons-material/YouTube";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";
import DriveFolderUploadIcon from "@mui/icons-material/DriveFolderUpload";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import DoneIcon from "@mui/icons-material/Done";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

// STYLE FOR MODAL
const styleModal = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "#323334",
  border: "2px solid #323334",
  boxShadow: 24,
  p: 4,
  color: "#03e9f4",
};

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

export default function Profile() {
  const router = useRouter();
  const [socmed, setSocmed] = React.useState([]);
  const [title, setTitle] = React.useState("");
  const [photo, setPhoto] = React.useState([]);
  const [desc, setDesc] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  // STATE FOR MODAL
  const [open, setOpen] = React.useState(false);
  const [link, setLink] = React.useState(``);
  const [CheckCopy, setCheckCopy] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // STATE FOR BUTTON EDIT
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
          // "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then(({ data }) => {
        const test = JSON.parse(data?.data[0]?.social_media);
        setSocmed(test);
        setTitle(data?.data[0]?.title);
        setPhoto(data?.data[0]?.photo_profile);
        setDesc(data?.data[0]?.desc);
        setLink(`linkpocket.vercel.app/pocket/${data?.data[0]?.slug}`);

        setSlug(`${data?.data[0]?.slug}`);
      })
      .catch(() => setSocmed([]))
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <>
      <Head>
        <title>Profile | Linkpocket</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={style.main}>
        <section className={`container-fluid ${style.profile}`}>
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
                            <div className={` ${style.btnLogout}`}>
                              <button
                                type="button"
                                className={`btn btn-primary ${style.logout}`}
                                onClick={() => {
                                  localStorage.clear();

                                  router.push(`/`);
                                }}
                              >
                                Logout
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* PROFILE SECTION */}
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
                            <h3 className={`${style.username14}`}>{title}</h3>
                          ) : (
                            <h3 className={`${style.username16}`}>{title}</h3>
                          )}
                          <p className={`${style.desc}`}>{desc}</p>
                          <div className="d-grid gap-2">
                            <div className="row">
                              {/* BUTTON EDIT */}
                              <div className="col-6 pb-0 pe-1 d-grid gap-2">
                                <Link
                                  type="button"
                                  className={`btn btn-primary ${style.btnShare}`}
                                  href={`/profile/edit/${convertSlug}`}
                                >
                                  Edit
                                </Link>
                              </div>
                              {/* BUTTON SHARE */}
                              <div className="col-6 pb-0 ps-1 d-grid gap-2">
                                <button
                                  type="button"
                                  className={`btn btn-primary ${style.btnShare}`}
                                  onClick={handleOpen}
                                >
                                  Share
                                </button>
                                <div>
                                  <Modal
                                    open={open}
                                    onClose={handleClose}
                                    aria-labelledby="modal-modal-title"
                                    aria-describedby="modal-modal-description"
                                  >
                                    <Box sx={styleModal}>
                                      <Typography
                                        id="modal-modal-title"
                                        variant="h6"
                                        component="h2"
                                      >
                                        Share your LinkPocket
                                      </Typography>
                                      <Typography
                                        id="modal-modal-description"
                                        sx={{ mt: 2 }}
                                      >
                                        <div className="row">
                                          <div className={`col-12`}>
                                            <div
                                              className={`d-flex align-items-center justify-content-start ${style.buttonCopy}`}
                                            >
                                              <TextField
                                                id="outlined-basic"
                                                className={style.link}
                                                sx={styleIconCopy}
                                                // label={() => {
                                                //   {
                                                //     CheckCopy
                                                //       ? "succes to copy your link"
                                                //       : "Click to copy your link";
                                                //   }
                                                // }}
                                                label={
                                                  CheckCopy
                                                    ? "succes to copy your link"
                                                    : "Click to copy your link"
                                                }
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
                                        </div>
                                      </Typography>
                                    </Box>
                                  </Modal>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* BUTTON ADD LINK SOCMED */}
                      <div className={`row ${style.btnAddLink}`}>
                        <div className="col-12 d-grid gap-2">
                          <Link
                            type="button"
                            className={`btn btn-primary ${style.btn}`}
                            href={`edit/list_link`}
                          >
                            {"Edit Your Link List"}
                          </Link>
                        </div>
                      </div>

                      {/* LINKS SECTION */}
                      <div className={`row ${style.linkSection}`}>
                        <div className="col-12">
                          <div className="d-grid gap-2 ">
                            {/* {socmed?.map((item, key) => {
                              return (
                                <div key={key}>
                                  <BtnLink socmed={item?.social_media} />
                                </div>
                              );
                            })} */}
                            {/* FACEBOOK */}
                            {socmed.facebook ? (
                              <button
                                className={`btn ${style.linkStick}`}
                                type="button"
                                onClick={() =>
                                  window.open(`${socmed.facebook}`, "_blank")
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
                                  window.open(`${socmed.instagram}`, "_blank")
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
                                  window.open(`${socmed.whatsapp}`, "_blank")
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
                                  window.open(`${socmed.linkedin}`, "_blank")
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
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
