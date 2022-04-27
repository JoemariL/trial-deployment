import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MdQrCodeScanner } from "react-icons/md";
import useAuth from "../../hooks/useAuth";
import { logout } from "../../actions/authActions";
import { getUserData, getHdfDay } from "../../actions/userActions";
import { Appbar, HamburgerMenu, Dashboard, Profile } from "../../Components/ui";
import { Alert, Button } from "../../Components/commons";

function Main() {
  const navigate = useNavigate();

  const { auth, setAuth } = useAuth();

  const [dribble, setDribble] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState({});
  const [hdf, setHdf] = useState({});
  const [hasHDF, setHasHDF] = useState(false);

  useEffect(() => {
    (async function () {
      setIsLoading(true);
      const user = await getUserData();
      if (user) {
        setUser(user);
        setIsLoading(false);
      }
    })();
  }, []);

  useEffect(() => {
    (async function () {
      setIsLoading(true);
      const user = await getHdfDay();
      if (!user || user.length === 0) {
        setHdf({});
      } else {
        setHdf(user[0]);
        setHasHDF(true);
        setIsLoading(false);
      }
    })();
  }, [auth]);

  const handleDribble = () => {
    setDribble(!dribble);
  };

  const logoutUser = async (e) => {
    e.preventDefault();
    const response = await logout();
    if (response) {
      setAuth({ access: null });
      navigate("/login", { replace: true });
    }
  };

  const { first_name, last_name, email_address } = user;

  return (
    <div className="relative text-xs ... sm:text-base">
      {dribble && (
        <HamburgerMenu
          onReturnClick={handleDribble}
          onHomeClick={(e) => {
            e.preventDefault();
            handleDribble();
            navigate("/main");
          }}
          onEditClick={(e) => {
            e.preventDefault();
            handleDribble();
            navigate("/profile/update");
          }}
          onLogOutClick={logoutUser}
        />
      )}

      <Appbar headerText="Dashboard" onMenuClick={handleDribble} />

      <Profile
        userFullName={`${first_name} ${last_name}`}
        userEmail={email_address}
        loading={isLoading}
      />

      <div className="my-10 mx-5 space-y-5 ... ease-in-out duration-300 sm:mx-20 md:mx-36 lg:mx-60 xl:mx-96">
        <div className={isLoading ? "blur-sm animate-pulse" : ""}>
          <Alert
            header="INSTRUCTION"
            message="Fill out your Health Declaration Form first in order to scan the QR code."
            info
          />
        </div>

        <div className="flex flex-col space-y-16">
          <Dashboard
            loading={isLoading}
            onClickHDF={(e) => {
              e.preventDefault();
              navigate("/hdf");
            }}
            onClickVacc={(e) => {
              e.preventDefault();
              navigate("/vaccine");
            }}
          />

          {hasHDF && (
            <div className="flex flex-col space-y-10">
              <div className="bottom-0 grid grid-cols-2 gap-x-3">
                <Button
                  secondary
                  label="VIEW RESULT"
                  roundedFull
                  onClick={(e) => {
                    e.preventDefault();
                    navigate("/result");
                  }}
                  disabled={isLoading}
                />
                <Button
                  icon={<MdQrCodeScanner className="h-6 w-6" />}
                  label="SCAN QR CODE"
                  roundedFull
                  onClick={(e) => {
                    e.preventDefault();
                    navigate("/qr-scanner");
                  }}
                  disabled={isLoading}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Main;
