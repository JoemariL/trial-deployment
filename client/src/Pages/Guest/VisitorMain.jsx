import React, { useEffect, useState } from "react";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { getVisitor } from "../../actions/visitorActions";
import {
  Appbar,
  HamburgerMenu,
  GuestResult,
  GuestProfile,
} from "../../Components/ui";

function VisitorMain() {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [isValid, setIsValid] = useState(false);
  const [dribble, setDribble] = useState(false);

  const [visitor, setVisitor] = useState({});
  const [hdf, setHdf] = useState({});

  useEffect(() => {
    (async function () {
      const userInfo = JSON.parse(localStorage.getItem("userInfo"));
      const userHdf = JSON.parse(localStorage.getItem("userHDF"));
      if (userInfo) {
        setVisitor(userInfo);
        setHdf(userHdf);
      } else {
        const user = await getVisitor();
        setVisitor(user);
        setHdf(user.hdf_data[0]);
        setIsValid(true);
      }
    })();
  }, []);

  const handleDribble = () => {
    setDribble(!dribble);
  };

  const { allowed, createdAt, entry_date, gate_info, entry_campus } = hdf;

  return (
    <div className="relative text-xs ... sm:text-base">
      {dribble && (
        <HamburgerMenu
          onReturnClick={handleDribble}
          onReturnIntro={(e) => {
            e.preventDefault();
            navigate("/");
          }}
          onVisitorReviewClick={(e) => {
            e.preventDefault();
            navigate("/visitor/fillout");
          }}
          visitor
        />
      )}

      <Appbar headerText="Dashboard" onMenuClick={handleDribble} />

      <GuestProfile
        userFullName={`${visitor.first_name} ${visitor.last_name}`}
        contactNumber={visitor.contact_number}
      />
      <div className="my-10 mx-5 space-y-5 ... ease-in-out duration-300 sm:mx-20 md:mx-36 lg:mx-60 xl:mx-96">
        <GuestResult
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
          visitor
          onClickQR={(e) => {
            e.preventDefault();
            navigate("/visitor/qr-scanner");
          }}
        />
      </div>
    </div>
  );
}

export default VisitorMain;
