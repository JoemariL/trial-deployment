import { useState } from "react";
import classnames from "classnames";
import { AiFillCaretDown, AiFillCaretUp } from "react-icons/ai";
import { FaSchool, FaCalendarAlt } from "react-icons/fa";
import { GiGate } from "react-icons/gi";
import { GoReport } from "react-icons/go";
import { ImCheckmark, ImCross } from "react-icons/im";
import { MdQrCodeScanner } from "react-icons/md";
import { Button, Icon, List, ListItem } from "../../commons";
import { Approved, Disapproved } from "../../../assets";

const GuestResult = ({
  hdfTimeCreated = "",
  campusEntered = "",
  campusName = "",
  gate = "",
  entryStatus = false,
  loading = false,
  onClickQR = () => {},
  visitor = false,
}) => {
  const [accordion, setAccordion] = useState(false);

  const handleAccordion = () => {
    setAccordion(!accordion);
  };

  return (
    <div
      className={classnames(
        "flex flex-col space-y-10",
        loading ? "blur-sm animate-pulse" : ""
      )}
    >
      <List position="vertical">
        <ListItem
          className="bg-blue-900 rounded-full"
          icon={<Icon icon={<GoReport className="h-6 w-6" />} />}
          label="ENTRY RESULT"
          textColor="white"
          addEnable
          addItem={
            <div className="ml-auto cursor-pointer" onClick={handleAccordion}>
              {accordion ? (
                <Icon icon={<AiFillCaretDown className="h-6 w-6" />} />
              ) : (
                <Icon icon={<AiFillCaretUp className="h-6 w-6" />} />
              )}
            </div>
          }
        />

        <div className={classnames(accordion ? "hidden" : "")}>
          <div className="p-5 flex flex-col rounded space-y-3 justify-center items-center bg-slate-100">
            <img
              className={classnames(
                "h-auto w-24 rounded-full",
                loading ? "blur-sm animate-pulse" : ""
              )}
              src={entryStatus ? Approved : Disapproved}
              alt="slu triage application result"
            />
            <span className="font-bold">
              {entryStatus
                ? "ALLOWED TO ENTER THE CAMPUS!"
                : "NOT ALLOWED TO ENTER THE CAMPUS!"}
            </span>
          </div>

          <div className="p-2 space-y-3 bg-slate-50">
            <ListItem
              icon={
                <Icon
                  className="bg-indigo-400 text-white"
                  icon={<FaCalendarAlt className="h-4 w-4" />}
                />
              }
              label={hdfTimeCreated !== "" ? hdfTimeCreated : "--"}
              subtitle="Date & time HDF created"
            />
            <ListItem
              icon={
                <Icon
                  className="bg-indigo-400 text-white"
                  icon={<FaCalendarAlt className="h-4 w-4" />}
                />
              }
              label={campusEntered !== "" ? campusEntered : "--"}
              subtitle="Date & time campus entered"
            />

            <ListItem
              icon={
                <Icon
                  className="bg-blue-400 text-white"
                  icon={<FaSchool className="h-4 w-4" />}
                />
              }
              label={campusName !== "" ? campusName : "--"}
              subtitle="Name of the campus entered"
            />

            <ListItem
              icon={
                <Icon
                  className="bg-gray-400 text-white"
                  icon={<GiGate className="h-4 w-4" />}
                />
              }
              label={gate !== "" ? gate : "--"}
              subtitle="Name of the gate entered"
            />
          </div>
        </div>
      </List>

      <div>
        <ListItem
          className={
            entryStatus ? "select-none bg-blue-600" : "select-none  bg-red-600"
          }
          icon={
            <Icon
              background="rounded-full"
              className={
                entryStatus ? "bg-blue-400 text-white" : "bg-red-400 text-white"
              }
              icon={
                entryStatus ? (
                  <ImCheckmark className="h-4 w-4" />
                ) : (
                  <ImCross className="h-4 w-4" />
                )
              }
            />
          }
          label={entryStatus ? "ENTRY ALLOWED" : "ENTRY NOT ALLOWED"}
          subtitle="Entry  status"
          textColor="white"
        />
      </div>

      {entryStatus ? (
        <>
          <div>
            <article>
              <span>
                <strong>NOTE</strong>
              </span>

              <p>
                Strictly observe minimum public health standards and Saint Louis
                University's health and safety protocols.
              </p>
            </article>
          </div>
        </>
      ) : (
        <>
          <div className="flex flex-col space-y-10">
            {!visitor && (
              <article>
                <span>
                  <strong>NOTE FOR STUDENTS & EMPLOYEES</strong>
                </span>

                <p>
                  Please go and stay home; then consult online at &nbsp;
                  <span className="underline underline-offset-2 decoration-blue-800">
                    <strong>slu.medical.clinic@slu.edu.ph.</strong>
                  </span>
                  <br /> Observe minimum public health standards.
                </p>
              </article>
            )}

            <article>
              <span>
                <strong>NOTE FOR VISITORS</strong>
              </span>

              <p>
                <span className="underline underline-offset-2 decoration-blue-800">
                  <strong>
                    Proceed to holding area located at SILANG BUILDING LOBBY.
                  </strong>
                </span>
                <br /> Observe minimum public health standards.
              </p>
            </article>
          </div>
        </>
      )}

      <div className="px-16">
        <Button
          icon={<MdQrCodeScanner className="h-6 w-6" />}
          label="SCAN QR CODE"
          roundedFull
          onClick={onClickQR}
          disabled={campusName ? true : false}
        />
      </div>
    </div>
  );
};

export default GuestResult;
