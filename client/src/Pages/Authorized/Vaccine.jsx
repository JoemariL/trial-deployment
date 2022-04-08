import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import useAuth from "../../hooks/useAuth";
import { getUserData } from "../../actions/userActions";
import { logout } from "../../actions/authActions";
import { Appbar, HamburgerMenu, VaccineView } from "../../Components/ui";

function Vaccine() {
  const navigate = useNavigate();

  const { auth, setAuth } = useAuth();

  const [dribble, setDribble] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [vaccine, setVaccine] = useState({});
  const [hasVaccine, setHasVaccine] = useState(false);

  useEffect(() => {
    (async function () {
      setIsLoading(true);
      const user = await getUserData();
      if (!user?.vaccination_details[0]) {
        setVaccine({});
        setIsLoading(false);
      } else {
        setVaccine(user.vaccination_details[0]);
        setHasVaccine(true);
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

  const { vaccine_status, vaccine_date, vaccine_serial_no } = vaccine;

  return (
    <div className="relative text-sm ... sm:text-base">
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

      <Appbar headerText="Vaccination Profile" onMenuClick={handleDribble} />

      <div className="my-10 mx-5 space-y-5 ... ease-in-out duration-300 sm:mx-20 md:mx-36 lg:mx-60 xl:mx-96">
        <VaccineView
          hasVaccine={hasVaccine}
          vaccineStatus={vaccine_status}
          vaccineDate={moment(vaccine_date).format("MMMM Do YYYY")}
          vaccineSerial={vaccine_serial_no}
          loading={isLoading}
          onVaccineForm={(e) => {
            e.preventDefault();
            navigate("/vaccine/update");
          }}
        />
      </div>
    </div>
  );
}

export default Vaccine;
