import React from "react";
import Image from "next/image";
import styleNavbar from "@/styles/navbar.module.scss";
import Link from "next/link";
import { useRouter } from "next/router";

// ICON
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

export default function Navbar() {
  const router = useRouter();
  const [isLogin, setIsLogin] = React.useState(false);

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
              <Link href={`/profile/${profile.fullname}`}>
                <AccountCircleIcon
                  style={{ fontSize: "35px", color: "#03e9f4" }}
                />
              </Link>
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
