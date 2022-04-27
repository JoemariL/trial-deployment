import { useState } from "react";
import classnames from "classnames";
import { AiFillCaretDown, AiFillCaretUp } from "react-icons/ai";
import { FaSchool, FaCalendarAlt } from "react-icons/fa";
import { GiGate } from "react-icons/gi";
import { GoReport } from "react-icons/go";
import { ImCheckmark, ImCross } from "react-icons/im";
import { Button, Icon, List, ListItem } from "../../commons";
import { Approved, Disapproved } from "../../../assets";

const GuestResult = ({ entryStatus = false, date = "" }) => {
  return (
    <div className={classnames("flex flex-col space-y-10")}>
      <List position="vertical">
        <div className="text-lg">
          <ListItem
            className={
              entryStatus
                ? "select-none bg-blue-600"
                : "select-none  bg-red-600"
            }
            icon={
              <Icon
                background="rounded-full"
                className={
                  entryStatus
                    ? "bg-blue-400 text-white"
                    : "bg-red-400 text-white"
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
                      <strong>NOTE FOR VISITORS</strong>
                    </span>
                  </p>

                  <p>...</p>
                </article>
              </div>
            </>
          )}
        </div>
      </List>
    </div>
  );
};

export default GuestResult;
