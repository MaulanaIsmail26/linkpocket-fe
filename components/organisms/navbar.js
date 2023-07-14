import React from "react";
import Image from "next/image";
import styleNavbar from "@/styles/navbar.module.scss";
import Link from "next/link";
import { useRouter } from "next/router";
import InputAdornment from "@mui/material/InputAdornment";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

// ICON
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import DoneIcon from "@mui/icons-material/Done";
import MenuIcon from "@mui/icons-material/Menu";

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

export default function Navbar() {
  const router = useRouter();
  const [isLogin, setIsLogin] = React.useState(false);

  // STATE FOR MODAL
  const [open, setOpen] = React.useState(false);
  const [link, setLink] = React.useState(``);
  const [CheckCopy, setCheckCopy] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const token = localStorage.getItem("token");

  // check if already login
  React.useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
  }, []);

  const checkProfile = localStorage.getItem("profile")
    ? JSON.parse(localStorage.getItem("profile"))
    : null;
  const [profile, setProfile] = React.useState(checkProfile);

  return (
    <div>
      <div className={`col`}>
        <div className="d-flex justify-content-between">
          <Image
            src={require("/public/images/Icon-app-nooutline.webp")}
            className={` ${styleNavbar.iconApp}`}
            // width={500}
            // height={65}
            alt="Icon-Linkpocket"
          />
          {isLogin ? (
            <>
              {/* BUTTON MENU */}
              <div>
                {/* <!-- Button trigger modal --> */}
                <MenuIcon
                  className={`${styleNavbar.btnMenu}`}
                  onClick={handleOpen}
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
                    className={`modal-dialog modal-dialog-centered modal-dialog-scrollable-dialog ${styleNavbar.modalMenu}`}
                  >
                    <div
                      className="modal-content"
                      style={{ backgroundColor: "#323334" }}
                    >
                      {/* HEADER MODAL */}
                      <div
                        className={`modal-header ${styleNavbar.modalHeader}`}
                      >
                        <h1 className="modal-title fs-5" id="exampleModalLabel">
                          LinkPocket
                        </h1>
                        <button
                          type="button"
                          className="btn-close"
                          data-bs-dismiss="modal"
                          aria-label="Close"
                        ></button>
                      </div>
                      <div className={`modal-body ${styleNavbar.modalBody}`}>
                        {/* COPY LINK SECTION */}
                        <div className="row">
                          <div
                            className={`col-12 px-4 ${styleNavbar.CopyLink}`}
                          >
                            <p>Share this LinkPocket</p>
                            <TextField
                              id="outlined-basic"
                              className={styleNavbar.link}
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
                                navigator.clipboard.writeText(link);

                                setCheckCopy(true);
                              }}
                            />
                          </div>
                        </div>

                        {/* REGISTER SECTION */}
                        <div className="row">
                          <div
                            className={`col-12 px-4 ${styleNavbar.registerSection}`}
                          >
                            <p>Register and create your own LinkPocket</p>
                            <div className="d-grid gap-2">
                              <button
                                className={`btn btn-primary ${styleNavbar.btnRegister}`}
                                type="button"
                              >
                                Register Free
                              </button>
                            </div>
                          </div>
                        </div>

                        {/* LOGIN SECTION */}
                        <div className="row">
                          <div
                            className={`col-12 px-4 ${styleNavbar.loginSection}`}
                          >
                            <p>Already have an account?</p>
                            <div className="d-grid gap-2">
                              <button
                                className={`btn btn-primary ${styleNavbar.btnLogin}`}
                                type="button"
                              >
                                Login
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className={` ${styleNavbar.btnLoginRegister}`}>
                <Link
                  type="button"
                  className={`btn btn-outline-primary ${styleNavbar.btnLogin}`}
                  href={"/auth/login"}
                >
                  Login
                </Link>
                <Link
                  type="button"
                  className={`btn btn-primary ${styleNavbar.btnRegister}`}
                  href={"/auth/register"}
                >
                  Register
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
