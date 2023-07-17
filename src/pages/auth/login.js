/* eslint-disable @next/next/no-img-element */
import React from "react";
import Head from "next/head";
import style from "@/styles/pages/login.module.scss";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import { setCookie, getCookie } from "cookies-next";
import { useRouter } from "next/router";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState(null);
  const [errorEmail, setErrorEmail] = React.useState(null);
  const [errorPass, setErrorPass] = React.useState(null);
  const [errUserNotExist, setErrUserNotExist] = React.useState(false);
  const [errEmail, setErrEmail] = React.useState(false);
  const [errPassword, setErrPassword] = React.useState(false);
  const [errPasswordNull, setErrPasswordNull] = React.useState(false);
  const [dataVerification, setDataVerification] = React.useState(false);

  // CHECK IS LOGIN
  React.useEffect(() => {
    if (localStorage.getItem("profile")) {
      const checkProfile = localStorage?.getItem("profile")
        ? JSON.parse(localStorage?.getItem("profile"))
        : null;

      router.push(`/profile/${checkProfile.fullname}`);
    }
  }, []);

  // FUNCTION LOGIN
  const handleSubmit = async () => {
    try {
      setIsLoading(true);

      const connect = await axios.post("/api/login", {
        email,
        password,
      });

      setIsLoading(false);
      setError(null);

      setErrEmail(false);
      setErrUserNotExist(false);
      setErrPassword(false);
      setErrPasswordNull(false);

      setCookie("token", connect?.data?.data?.token);
      setCookie("profile", JSON.stringify(connect?.data?.data?.result));
      localStorage.setItem("token", connect?.data?.data?.token);
      localStorage.setItem(
        "profile",
        JSON.stringify(connect?.data?.data?.result)
      );

      setDataVerification(true);

      axios
        .get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/v1/space`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then(({ data }) => {
          console.log(data?.data[0]);
          console.log(data?.data.length);
          if (data?.data.length === 0) {
            router.push("/user/create_linkpocket");
          } else {
            const checkProfile = localStorage?.getItem("profile")
              ? JSON.parse(localStorage?.getItem("profile"))
              : null;

            router.push(`/profile/${checkProfile.fullname}`);
          }
        })
        .catch(() => setDataVerification(false))
        .finally(() => {
          setIsLoading(false);
        });

      // router.push("/user/create_linkpocket");
      // console.log(connect);
    } catch (error) {
      // console.log(error?.response?.data?.messages);
      // error?.response?.data?.message?.message
      if (error?.response?.data?.messages?.email?.message) {
        setErrorEmail(
          error?.response?.data?.messages?.email?.message ??
            "Something wrong in our server"
        );
        setErrEmail(true);
        setErrUserNotExist(false);
        setErrPassword(false);
        setErrPasswordNull(false);
      } else if (error?.response?.data?.messages?.password?.message) {
        setErrorPass(
          error?.response?.data?.messages?.password?.message ??
            "Something wrong in our server"
        );
        setErrPasswordNull(true);
        setErrPassword(false);
        setErrUserNotExist(false);
        setErrEmail(false);
      } else if (error?.response?.data?.messages == "User not existt") {
        setError(
          error?.response?.data?.messages ?? "Something wrong in our server"
        );
        setErrUserNotExist(true);
        setErrEmail(false);
        setErrPasswordNull(false);
        setErrPassword(false);
      } else if (error?.response?.data?.messages == "Wrong password") {
        setError(
          error?.response?.data?.messages ?? "Something wrong in our server"
        );
        setErrPassword(true);
        setErrPasswordNull(false);
        setErrUserNotExist(false);
        setErrEmail(false);
      } else {
        ("Something wrong in our server");
      }
      setIsLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>Login | Linkpocket</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={style.main}>
        <section className={`container-fluid ${style.login}`}>
          {dataVerification ? (
            <>
              <div className={`container-fluid ${style.dataVerification}`}>
                <div className="container">
                  <div className="row">
                    <div
                      className={`col-12 d-flex align-items-center ${style.container}`}
                    >
                      <div className={`${style.card}`}>
                        <div
                          className={`d-flex align-items-center justify-content-center ${style.containerInCard}`}
                        >
                          <div className="me-2 pt-sm-1 pt-2">
                            <h4 style={{ color: "#03e9f4" }}>
                              Login successful
                            </h4>
                            <p
                              className={`d-flex justify-content-end ${style.dataVerif}`}
                            >
                              Data verification
                            </p>
                          </div>
                          <div className="">
                            <div
                              class="spinner-border text-info"
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
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className={`container`}>
                <div className={`row`}>
                  <div
                    className={`col-12 position-relative ${style.formLoginSide}`}
                  >
                    {/* CARD FORM LOGIN */}
                    <div
                      className={`position-absolute top-50 end-0 translate-middle-y px-sm-5 px-4 ${style.cardFormLogin}`}
                    >
                      {/* TITLE CARD */}
                      <div className={`row ${style.titleCard}`}>
                        <div className={`col`}>
                          <div className="d-flex justify-content-center">
                            <Image
                              src={require("/public/images/Icon-app-nooutline.webp")}
                              className={`${style.iconApp}`}
                              // width={500}
                              height={75}
                              alt="Icon-Linkpocket"
                            />
                          </div>
                          <h5 className="d-flex justify-content-center">
                            Please Login with your account
                          </h5>
                        </div>
                      </div>

                      {/* FORM REGISTER */}
                      <div className={`row ${style.formLogin}`}>
                        <div className={`col`}>
                          <form>
                            <div className={`mb-4 ${style.userbox}`}>
                              <input
                                type="text"
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
                              {errUserNotExist && !errPassword ? (
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
                              {errPassword ? (
                                <p className="mt-1">{`!${error}`}</p>
                              ) : null}
                              {errPasswordNull && !errPassword ? (
                                <p className="mt-1">{`!${errorPass}`}</p>
                              ) : null}
                            </div>
                            <div className={`row ${style.areaLoginAndSignUp}`}>
                              <div className={`col-12`}>
                                <button
                                  className={`${style.btnLogin}`}
                                  onClick={handleSubmit}
                                  disabled={isLoading}
                                >
                                  <span></span>
                                  <span></span>
                                  <span></span>
                                  <span></span>
                                  {isLoading ? "Loading..." : "Login"}
                                </button>
                                <p
                                  className={`text-center ${style.textSignUp}`}
                                >
                                  Anda belum punya akun?{" "}
                                  <Link
                                    href={"/auth/register"}
                                    className={`${style.signUp}`}
                                  >
                                    Buat disini
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
            </>
          )}
        </section>
      </main>
    </>
  );
}
