import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import useAuth from "../../hooks/useAuth";
import { logout } from "../../actions/authActions";
import { getHdfDay } from "../../actions/userActions";
import { Appbar, HamburgerMenu, ResultView } from "../../Components/ui";

function Result() {
  const navigate = useNavigate();

  const { auth, setAuth } = useAuth();

  const [dribble, setDribble] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [hdf, setHdf] = useState({});
  const [hasHDF, setHasHDF] = useState(false);

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

  const { allowed, entry_date, createdAt, entry_campus, gate_info } = hdf;

  return (
    <div className="relative text-xs ... sm:text-base">
      {dribble && (
        <HamburgerMenu
          onReturnClick={handleDribble}
          onHomeClick={(e) => {
            e.preventDefault();
            navigate("/main");
          }}
          onLogOutClick={logoutUser}
        />
      )}

      <Appbar headerText="Result" onMenuClick={handleDribble} />

      <div className="py-10 mx-5 space-y-5 ... ease-in-out duration-300 sm:mx-20 md:mx-36 lg:mx-60 xl:mx-96">
        <ResultView
          entryStatus={allowed}
          hdfTimeCreated={
            createdAt
              ? moment(createdAt).format("MMMM Do YYYY, h:mm:ss A")
              : "--"
          }
          campusEntered={
            entry_date
              ? moment(entry_date).format("MMMM Do YYYY, h:mm:ss A")
              : "--"
          }
          campusName={entry_campus}
          gate={gate_info}
          loading={isLoading}
          onClickQR={(e) => {
            e.preventDefault();
            navigate("/qr-scanner");
          }}
        />
      </div>
    </div>
  );
}

export default Result;
