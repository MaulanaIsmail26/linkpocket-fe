import Head from "next/head";
import Image from "next/image";
import style from "@/styles/pages/profile.module.scss";
import Navbar from "components/organisms/navbar";
import React from "react";
import axios from "axios";
import Link from "next/link";
import BtnLink from "components/molecules/btnLink";

// ICON
import FacebookIcon from "@mui/icons-material/Facebook";
import GitHubIcon from "@mui/icons-material/GitHub";
import YouTubeIcon from "@mui/icons-material/YouTube";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";
import DriveFolderUploadIcon from "@mui/icons-material/DriveFolderUpload";

export default function Profile() {
  // const [socmed, setSocmed] = React.useState("");
  const [socmed, setSocmed] = React.useState([]);
  const [title, setTitle] = React.useState([]);
  const [photo, setPhoto] = React.useState([]);
  const [desc, setDesc] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/v1/space`, {
        headers: {
          // "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then(({ data }) => {
        // console.log(data?.data[0]?.social_media);
        const test = JSON.parse(data?.data[0]?.social_media);
        setSocmed(test);
        setTitle(data?.data[0]?.title);
        setPhoto(data?.data[0]?.photo_profile);
        setDesc(data?.data[0]?.desc);
      })
      .catch(() => setSocmed([]))
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  // const test = JSON.parse(socmed);
  // console.log(socmed);
  // console.log(JSON.stringify(socmed));
  console.log(socmed.facebook);

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
                        <Navbar />
                      </div>
                      {/* PROFILE SECTION */}
                      <div className={`row ${style.profileCard}`}>
                        <div className="col-sm-4 col-5">
                          <Image
                            // src={require("/public/images/IMG_20230116_093528.jpg")}
                            src={
                              photo ||
                              `https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/1200px-User-avatar.svg.png`
                            }
                            className={` ${style.photoProfile}`}
                            width={130}
                            height={130}
                            alt="photo-profile"
                          />
                        </div>
                        <div className="col-sm-8 col-7">
                          <h3 className={`${style.username}`}>
                            {title || "TITLE"}
                          </h3>
                          <p className={`${style.desc}`}>
                            {desc || "DESCRIPTION"}
                          </p>
                          <div className="d-grid gap-2">
                            <div className="row">
                              <div className="col-6 d-grid gap-2">
                                <button
                                  type="button"
                                  className={`btn btn-primary ${style.btnShare}`}
                                  data-bs-toggle="modal"
                                  data-bs-target="#staticBackdrop1"
                                >
                                  Edit
                                </button>
                                {/* POPUP EDIT PROFILE */}
                                <div
                                  className={`modal fade ${style.modalEdit}`}
                                  id="staticBackdrop1"
                                  data-bs-backdrop="static"
                                  data-bs-keyboard="false"
                                  tabindex="-1"
                                  aria-labelledby="staticBackdropLabel"
                                  aria-hidden="true"
                                >
                                  <div className="modal-dialog modal-dialog-centered">
                                    <div
                                      className={`modal-content ${style.modalContainer}`}
                                    >
                                      <div className="modal-header">
                                        <h1
                                          className="modal-title fs-5"
                                          id="staticBackdropLabel"
                                        >
                                          Edit Profile
                                        </h1>
                                        <button
                                          type="button"
                                          className="btn-close"
                                          data-bs-dismiss="modal"
                                          aria-label="Close"
                                        ></button>
                                      </div>
                                      <div
                                        className={`modal-body ${style.modalBody}`}
                                      >
                                        <div className={`row`}>
                                          {/* EDIT PROFILE PICTURE */}
                                          <div
                                            className={`col-4 ${style.editProfilePicture}`}
                                          >
                                            <Image
                                              src={require("/public/images/IMG_20230116_093528.jpg")}
                                              className={` ${style.photoProfile}`}
                                              // width={500}
                                              // height={65}
                                              alt="Icon-Linkpocket"
                                            />
                                          </div>
                                          {/* EDIT USERNAME AND DESCRIPTION */}
                                          <div
                                            className={`col-8 ${style.editUsernameAndDesc}`}
                                          >
                                            <form>
                                              <div className="mb-3">
                                                <input
                                                  type="text"
                                                  className={`form-control ${style.formUsername}`}
                                                  placeholder="Title or Username"
                                                />
                                              </div>
                                              <div className="mb-3">
                                                <textarea
                                                  type="textarea"
                                                  className={`form-control ${style.formDesc}`}
                                                  placeholder="Description"
                                                  maxlength="60"
                                                />
                                              </div>
                                            </form>
                                          </div>
                                        </div>
                                        {/* EDIT BACKGROUND */}
                                        <div
                                          className={`row ${style.editBackground}`}
                                        >
                                          <div className="col-12">
                                            <input
                                              class="form-control"
                                              type="file"
                                              id="formFileMultiple"
                                              multiple
                                            />
                                          </div>
                                        </div>
                                      </div>
                                      <div className="modal-footer">
                                        <button
                                          type="button"
                                          className="btn btn-secondary"
                                          data-bs-dismiss="modal"
                                        >
                                          Close
                                        </button>
                                        <button
                                          type="button"
                                          className="btn btn-primary"
                                        >
                                          Understood
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="col-6 d-grid gap-2">
                                <button
                                  type="button"
                                  className={`btn btn-primary ${style.btnShare}`}
                                >
                                  Share
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* BUTTON ADD LINK SOCMED */}
                      <div className={`row ${style.btnAddLink}`}>
                        <div className="col-12 d-grid gap-2">
                          <button
                            type="button"
                            className={`btn btn-primary ${style.btn}`}
                            data-bs-toggle="modal"
                            data-bs-target="#staticBackdrop2"
                          >
                            {"[+] Add Your Link"}
                          </button>
                          {/* POPUP EDIT PROFILE */}
                          <div
                            className={`modal fade ${style.modalAddLink}`}
                            id="staticBackdrop2"
                            data-bs-backdrop="static"
                            data-bs-keyboard="false"
                            tabindex="-1"
                            aria-labelledby="staticBackdropLabel"
                            aria-hidden="true"
                          >
                            <div className="modal-dialog modal-dialog-centered">
                              <div
                                className={`modal-content ${style.modalContainer}`}
                              >
                                <div
                                  className="modal-header"
                                  style={{ backgroundColor: "#03e9f4" }}
                                >
                                  <h1
                                    className="modal-title fs-5"
                                    id="staticBackdropLabel"
                                  >
                                    Add Your Link
                                  </h1>
                                  <button
                                    type="button"
                                    className="btn-close"
                                    data-bs-dismiss="modal"
                                    aria-label="Close"
                                  ></button>
                                </div>
                                <div
                                  className={`modal-body ${style.modalBody}`}
                                >
                                  {/* EDIT USERNAME AND DESCRIPTION */}
                                  <div className={`row`}>
                                    <div className={`col-12 ${style.addLink}`}>
                                      <form>
                                        <div
                                          className={`mb-2 ${style.userbox}`}
                                        >
                                          <input
                                            type="text"
                                            name=""
                                            required=""
                                          />
                                          <label>Title Link</label>
                                        </div>
                                        <div className={`${style.userbox}`}>
                                          <input
                                            type="url"
                                            // name=""
                                            // required=""
                                          />
                                          <label>Link</label>
                                        </div>
                                      </form>
                                    </div>
                                  </div>
                                  {/* ICON OPTION */}
                                  <div
                                    className={`dropdown ${style.iconOption}`}
                                  >
                                    <div className="dropdown">
                                      <label className="mb-2">Icon</label>
                                      <select
                                        className="form-select"
                                        aria-label="Default select example"
                                        // onChange={(e) => {
                                        //   if (e.target.value === "") {
                                        //     fetchSortByName(e.target.value);
                                        //   } else if (
                                        //     e.target.value === "descending"
                                        //   ) {
                                        //     fetchSortByName(e.target.value);
                                        //   } else {
                                        //     fetchSortByDate(sortByDate);
                                        //   }
                                        // }}
                                      >
                                        <option selected disabled>
                                          Choose a logo
                                        </option>
                                        <option value="">Facebook</option>
                                        <option value="">WhatsApp</option>
                                        <option value="">Instagram</option>
                                        <option value="">Twitter</option>
                                        <option value="">E-mail</option>
                                        <option value="">YouTube</option>
                                      </select>
                                    </div>
                                  </div>
                                </div>
                                <div
                                  className="modal-footer"
                                  style={{ backgroundColor: "#03e9f4" }}
                                >
                                  <button
                                    type="button"
                                    className="btn btn-secondary"
                                    data-bs-dismiss="modal"
                                  >
                                    Close
                                  </button>
                                  <button
                                    type="button"
                                    className="btn btn-primary"
                                  >
                                    Understood
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
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
