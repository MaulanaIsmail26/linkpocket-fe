/* eslint-disable @next/next/no-img-element */
import React from "react";
import Head from "next/head";
import style from "@/styles/pages/register.module.scss";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import { setCookie, getCookie } from "cookies-next";
import { useRouter } from "next/router";

export default function Register() {
  const router = useRouter();
  const [fullname, setFullname] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState(null);
  const [errorFullname, setErrorFullname] = React.useState(null);
  const [errorEmail, setErrorEmail] = React.useState(null);
  const [errorPass, setErrorPass] = React.useState(null);
  const [errFullname, setErrFullname] = React.useState(false);
  const [errUserNotExist, setErrUserNotExist] = React.useState(false);
  const [errEmail, setErrEmail] = React.useState(false);
  const [errPassword, setErrPassword] = React.useState(false);
  const [errPasswordNull, setErrPasswordNull] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
  const [notif, setNotif] = React.useState(false);

  const handleSubmit = async () => {
    try {
      setIsLoading(true);

      const connect = await axios.post("/api/register", {
        fullname,
        email,
        password,
      });

      setIsLoading(false);
      setError(null);
      setSuccess(true);
      setErrEmail(false);
      setErrUserNotExist(false);
      setErrPassword(false);
      setErrPasswordNull(false);
      router.push("/auth/login");
    } catch (error) {
      console.log(error?.response?.data?.message?.message);
      // error?.response?.data?.message?.username?.message
      if (error?.response?.data?.messages?.fullname?.message) {
        setErrorFullname(
          error?.response?.data?.messages?.fullname?.message ??
            "Something wrong in our server"
        );
        setErrFullname(true);
        setErrEmail(false);
        setErrUserNotExist(false);
        setErrPassword(false);
        setErrPasswordNull(false);
      } else if (error?.response?.data?.messages?.email?.message) {
        setErrorEmail(
          error?.response?.data?.messages?.email?.message ??
            "Something wrong in our server"
        );
        setErrEmail(true);
        setErrFullname(false);
        setErrUserNotExist(false);
        setErrPassword(false);
        setErrPasswordNull(false);
      } else if (error?.response?.data?.messages?.password?.message) {
        setErrorPass(
          error?.response?.data?.messages?.password?.message ??
            "Something wrong in our server"
        );
        setErrPasswordNull(true);
        setErrFullname(false);
        setErrPassword(false);
        setErrUserNotExist(false);
        setErrEmail(false);
      } else if (error?.response?.data?.messages == "User already registered") {
        setError(
          error?.response?.data?.messages ?? "Something wrong in our server"
        );
        setErrUserNotExist(true);
        setErrFullname(false);
        setErrEmail(false);
        setErrPasswordNull(false);
        setErrPassword(false);
      } else {
        ("Something wrong in our server");
      }
      setIsLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>Register | Linkpocket</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={style.main}>
        <section className={`container-fluid ${style.register}`}>
          <div className={`container`}>
            <div className={`row`}>
              <div
                className={`col-12 position-relative ${style.formRegisterSide}`}
              >
                {/* CARD FORM REGISTER */}
                <div
                  className={`position-absolute top-50 end-0 translate-middle-y px-5 ${style.cardFormRegister}`}
                >
                  {/* TITLE CARD */}
                  <div className={`row ${style.titleCard}`}>
                    <div className={`col`}>
                      <div className="d-flex justify-content-center">
                        <Image
                          src={require("/public/images/Icon-app-nooutline.png")}
                          className={`${style.iconApp}`}
                          // width={500}
                          height={75}
                          alt="Icon-Linkpocket"
                        />
                      </div>
                      <h5 className="d-flex justify-content-center">
                        Please sign up with your account
                      </h5>
                    </div>
                  </div>

                  {/* FORM REGISTER */}
                  <div className={`row ${style.formRegister}`}>
                    <div className={`col`}>
                      {/* <form>
                        <div className="mb-3">
                          <input
                            type="email"
                            class="form-control"
                            id="email"
                            aria-describedby="email"
                            placeholder="Email"
                            // onChange={(e) => setEmail(e.target.value)}
                          />
                        </div>
                        <div className="mb-3">
                          <input
                            type="password"
                            class="form-control"
                            id="phone"
                            aria-describedby="password"
                            placeholder="Password"
                            // onChange={(e) => setPassword(e.target.value)}
                          />
                        </div>
                      </form> */}
                      <form>
                        <div className={`mb-4 ${style.userbox}`}>
                          <input
                            type="text"
                            name=""
                            required=""
                            onChange={(e) => setFullname(e.target.value)}
                            onKeyDown={(event) => {
                              if (event.key === "Enter") {
                                handleSubmit;
                              }
                            }}
                          />
                          <label>FullName</label>
                          {errFullname ? (
                            <p className="mt-1">{`!${errorFullname}`}</p>
                          ) : null}
                        </div>
                        <div className={`mb-4 ${style.userbox}`}>
                          <input
                            type="email"
                            name=""
                            required=""
                            onChange={(e) => setEmail(e.target.value)}
                            onKeyDown={(event) => {
                              if (event.key === "Enter") {
                                handleSubmit;
                              }
                            }}
                          />
                          <label>Email</label>
                          {errUserNotExist ? (
                            <p className="mt-1">{`!${error}`}</p>
                          ) : null}
                          {errEmail ? (
                            <p className="mt-1">{`!${errorEmail}`}</p>
                          ) : null}
                        </div>
                        <div className={`${style.userbox}`}>
                          <input
                            type="password"
                            name=""
                            required=""
                            onChange={(e) => setPassword(e.target.value)}
                            onKeyDown={(event) => {
                              if (event.key === "Enter") {
                                handleSubmit;
                              }
                            }}
                          />
                          <label>Password</label>
                          {/* {errPassword ? (
                            <p className="mt-1">{`!${error}`}</p>
                          ) : null} */}
                          {errPasswordNull ? (
                            <p className="mt-1">{`!${errorPass}`}</p>
                          ) : null}
                        </div>
                        <div className={`row ${style.areaSignUpAndLogin}`}>
                          <div className={`col-12`}>
                            <button
                              className={`${style.btnSignUp}`}
                              onClick={() => {
                                handleSubmit();
                                setNotif(true);
                              }}
                              disabled={isLoading}
                            >
                              <span></span>
                              <span></span>
                              <span></span>
                              <span></span>
                              {isLoading ? "Loading..." : "SIGNUP"}
                            </button>
                            <p className={`text-center ${style.textLogin}`}>
                              Anda sudah punya akun?{" "}
                              <Link
                                href={"/auth/login"}
                                className={`${style.login}`}
                              >
                                Masuk disini
                              </Link>
                            </p>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
                {/* END CARD FORM REGISTER */}
              </div>
            </div>
          </div>
          {/* {notif ? (
            <div className={`${style.notification}`}>
              <p>Maulana Ismail</p>
              <span className={`${style.notificationProgress}`}></span>
            </div>
          ) : null} */}
          {/* <div className={`${style.notification}`}>
            <p>Maulana Ismail</p>
            <span className={`${style.notificationProgress}`}></span>
          </div> */}
        </section>
      </main>
    </>
  );
}
