import classnames from "classnames";
import { ImCheckmark, ImCross } from "react-icons/im";
import { Icon, List, ListItem } from "../../commons";
import { Approved, Disapproved } from "../../../assets";

const ResultView = ({ entryStatus = false, date = "" }) => {
  return (
    <div className="flex flex-col space-y-10">
      <List position="vertical">
        <div className="text-lg">
          {entryStatus ? (
            <ListItem
              className="select-none bg-blue-600"
              icon={
                <Icon
                  background="rounded-full"
                  className="bg-blue-400 text-white"
                  icon={<ImCheckmark className="h-4 w-4" />}
                />
              }
              label="ENTRY ALLOWED"
              subtitle="Entry status"
              textColor="white"
            />
          ) : (
            <ListItem
              className="select-none  bg-red-600"
              icon={
                <Icon
                  background="rounded-full"
                  className="bg-red-400 text-white"
                  icon={<ImCross className="h-4 w-4" />}
                />
              }
              label="ENTRY NOT ALLOWED"
              subtitle="Entry status"
              textColor="white"
            />
          )}
        </div>

        <div className="p-5 flex flex-row gap-x-10 items-center bg-slate-100">
          <img
            className="h-auto w-24 rounded-full"
            src={entryStatus ? Approved : Disapproved}
            alt="slu triage application result"
          />

          <div className="flex flex-col space-y-1">
            <p>
              {entryStatus
                ? "YOU ARE ALLOWED TO ENTER THE CAMPUS."
                : "YOU ARE NOT ALLOWED TO ENTER THE CAMPUS."}
            </p>

            <p className="text-xl font-bold">{date}</p>
          </div>
        </div>

        <hr />

        <div className="p-5 flex flex-col space-y-3 bg-slate-50">
          {entryStatus ? (
            <>
              <div>
                <article>
                  <p>
                    <span>
                      <strong>NOTE</strong>
                    </span>
                  </p>

                  <p>
                    Strictly observe minimum public health standards and Saint
                    Louis University's health and safety protocols.
                  </p>
                </article>
              </div>
            </>
          ) : (
            <>
              <div className="flex flex-col space-y-10">
                <article>
                  <p>
                    <span>
                      <strong>NOTE FOR STUDENTS & EMPLOYEES</strong>
                    </span>
                  </p>

                  <p>
                    Please go and stay home; then consult online at: &nbsp;
                    <span className="font-bold underline underline-offset-2 decoration-blue-800">
                      slu.medical.clinic@slu.edu.ph.
                    </span>
                  </p>

                  <p>Observe minimum public health standards.</p>
                </article>
              </div>
            </>
          )}
        </div>
      </List>
    </div>
  );
};

export default ResultView;
