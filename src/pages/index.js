import Head from "next/head";
import Image from "next/image";
import style from "@/styles/pages/home.module.scss";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <Head>
        <title>LinkPocket</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={style.main}>
        <section className={`container-fluid ${style.homePage}`}>
          <div className={`row`}>
            <div className={`col-12 position-relative ${style.colum}`}>
              <div
                className={`position-absolute top-50 start-50 translate-middle ${style.blurOverlay}`}
              >
                <div className={``}>
                  {/* ICON APP */}
                  <div className={`row mb-2 ${style.iconApp}`}>
                    <div className="col d-flex justify-content-center">
                      <Image
                        src={require("/public/images/Icon-app-nooutline.webp")}
                        className={` ${style.icon}`}
                        // width={500}
                        height={80}
                        alt="Icon-Linkpocket"
                      />
                    </div>
                  </div>
                  {/* TEXT WELCOME */}
                  <div className={`row ${style.textWelcome}`}>
                    <div className="col d-flex justify-content-center">
                      <h1 className={`${style.text}`}>Welcome To LinkPocket</h1>
                    </div>
                  </div>
                  {/* TEXT SLOGAN*/}
                  <div className={`row ${style.textSlogan}`}>
                    <div className="col d-flex justify-content-center">
                      <p className={`${style.text}`}>
                        Collect all your links in just one pocket
                      </p>
                    </div>
                  </div>
                  {/* BIG ICON*/}
                  <div className={`row mb-1 ${style.bigIcon}`}>
                    <div className="col d-flex justify-content-center">
                      <Image
                        src={require("/public/images/iconApp.webp")}
                        className={` ${style.icon}`}
                        // width={500}
                        height={250}
                        alt="Icon-Linkpocket"
                      />
                    </div>
                  </div>
                  {/* TEXT STARTED */}
                  <div className={`row ${style.TextStarted}`}>
                    <div className="col d-flex justify-content-center">
                      <p className={`${style.started}`}>
                        Its time for you to make a link pocket
                      </p>
                    </div>
                  </div>
                  {/* BUTTON STARTED */}
                  <div className={`row ${style.btnStarted}`}>
                    <div className="col d-flex justify-content-center">
                      <Link
                        type="button"
                        className={`btn btn-primary ${style.btn}`}
                        href={"/auth/register"}
                      >
                        Get Started
                      </Link>
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
