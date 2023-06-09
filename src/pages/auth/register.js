import Head from "next/head";
import style from "@/styles/pages/register.module.scss";

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
              <div className={`col-6`}></div>
              <div
                className={`col-5 offset-1 position-relative ${style.formRegisterSide}`}
              >
                {/* CARD FORM REGISTER */}
                <div
                  className={`position-absolute top-50 start-50 translate-middle px-5 ${style.cardFormRegister}`}
                >
                  {/* TITLE CARD */}
                  <div className={`row ${style.titleCard}`}>
                    <div className={`col`}>
                      <h3 className="mt-5 d-flex justify-content-center mb-4">
                        LinkPocket
                      </h3>
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
                        <a href="#">
                          <span></span>
                          <span></span>
                          <span></span>
                          <span></span>
                          Login
                        </a>
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
