/* eslint-disable @next/next/no-img-element */
import Head from "next/head";
import style from "@/styles/pages/register.module.scss";
import Image from "next/image";
import Link from "next/link";

export default function Register() {
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
                          <input type="text" name="" required="" />
                          <label>Email</label>
                        </div>
                        <div className={`${style.userbox}`}>
                          <input type="password" name="" required="" />
                          <label>Password</label>
                        </div>
                        <div className={`row ${style.areaSignUpAndLogin}`}>
                          <div className={`col-12`}>
                            <a href="" className={`${style.btnSignUp}`}>
                              <span></span>
                              <span></span>
                              <span></span>
                              <span></span>
                              SignUp
                            </a>
                            <p className={`text-center ${style.textLogin}`}>
                              Anda sudah punya akun?{" "}
                              <Link
                                href={"/auth/login/recruiter"}
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
        </section>
      </main>
    </>
  );
}
