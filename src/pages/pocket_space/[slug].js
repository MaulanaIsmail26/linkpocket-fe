import Head from "next/head";
import Image from "next/image";
import style from "@/styles/pages/pocketSpace.module.scss";

export default function Home() {
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
                  <div className={`row ${style.titleCard}`}>
                    <div className={`col`}>
                      <div className="d-flex justify-content-between">
                        <Image
                          src={require("/public/images/Icon-app-nooutline.png")}
                          className={` ${style.iconApp}`}
                          // width={500}
                          // height={65}
                          alt="Icon-Linkpocket"
                        />
                        <div className={` ${style.btnLoginRegister}`}>
                          <button
                            type="button"
                            className={`btn btn-outline-primary ${style.btnLogin}`}
                          >
                            Login
                          </button>
                          <button
                            type="button"
                            className={`btn btn-primary ${style.btnRegister}`}
                          >
                            Register
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* PROFILE SECTION */}
                  <div className={`row ${style.profileCard}`}>
                    <div className="col-sm-4 col-5">
                      <Image
                        src={require("/public/images/IMG_20230116_093528.jpg")}
                        className={` ${style.photoProfile}`}
                        // width={500}
                        // height={65}
                        alt="Icon-Linkpocket"
                      />
                    </div>
                    <div className="col-sm-8 col-7">
                      <h3 className={`${style.username}`}>Maulana Ismail</h3>
                      <p className={`${style.desc}`}>
                        Terjemahkan teks & berkas dokumen secara instan.
                        Terjemahan.
                      </p>
                      <div className="d-grid gap-2">
                        <button
                          type="button"
                          className={`btn btn-primary ${style.btnShare}`}
                        >
                          Create your LinkPocket
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* LINKS SECTION */}
                  <div className={`row ${style.linkSection}`}>
                    <div className="col-12">
                      <div className="d-grid gap-2 ">
                        <button
                          className={`btn ${style.linkStick}`}
                          type="button"
                        >
                          Facebook
                        </button>
                        <button
                          className={`btn ${style.linkStick}`}
                          type="button"
                        >
                          YouTube
                        </button>
                        <button
                          className={`btn ${style.linkStick}`}
                          type="button"
                        >
                          Instagram
                        </button>
                        <button
                          className={`btn ${style.linkStick}`}
                          type="button"
                        >
                          Twitter
                        </button>
                        <button
                          className={`btn ${style.linkStick}`}
                          type="button"
                        >
                          Tiktok
                        </button>
                        <button
                          className={`btn ${style.linkStick}`}
                          type="button"
                        >
                          GitHub
                        </button>
                        <button
                          className={`btn ${style.linkStick}`}
                          type="button"
                        >
                          E-mail
                        </button>
                        <button
                          className={`btn ${style.linkStick}`}
                          type="button"
                        >
                          WhatsApp
                        </button>
                        <button
                          className={`btn ${style.linkStick}`}
                          type="button"
                        >
                          Shopee
                        </button>
                        <button
                          className={`btn ${style.linkStick}`}
                          type="button"
                        >
                          LinkedIn
                        </button>
                        <button
                          className={`btn ${style.linkStick}`}
                          type="button"
                        >
                          WhatsApp
                        </button>
                        <button
                          className={`btn ${style.linkStick}`}
                          type="button"
                        >
                          Shopee
                        </button>
                        <button
                          className={`btn ${style.linkStick}`}
                          type="button"
                        >
                          LinkedIn
                        </button>
                        <button
                          className={`btn ${style.linkStick}`}
                          type="button"
                        >
                          WhatsApp
                        </button>
                        <button
                          className={`btn ${style.linkStick}`}
                          type="button"
                        >
                          Shopee
                        </button>
                        <button
                          className={`btn ${style.linkStick}`}
                          type="button"
                        >
                          LinkedIn
                        </button>
                        <button
                          className={`btn ${style.linkStick}`}
                          type="button"
                        >
                          WhatsApp
                        </button>
                        <button
                          className={`btn ${style.linkStick}`}
                          type="button"
                        >
                          Shopee
                        </button>
                        <button
                          className={`btn ${style.linkStick}`}
                          type="button"
                        >
                          LinkedIn
                        </button>
                        <style>
                          {`
                            ::-webkit-scrollbar {
                              width: 0.3em;
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
          </div>
        </section>
      </main>
    </>
  );
}