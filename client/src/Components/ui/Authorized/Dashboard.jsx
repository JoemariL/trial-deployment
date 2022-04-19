import classnames from "classnames";
import { ImCheckmark, ImCross } from "react-icons/im";
import { MdQrCodeScanner } from "react-icons/md";
import { RiSyringeFill, RiHealthBookFill } from "react-icons/ri";
import { Icon, Menu, MenuItem, Button, ListItem } from "../../commons";

const Dashboard = ({
  onClickHDF = () => {},
  onClickVacc = () => {},
  onClickQR = () => {},
  onClickResult = () => {},
  entryDate,
  hasHDF = false,
  status = false,
  loading = false,
}) => {
  return (
    <div className="space-y-5">
      <ListItem
        className={classnames(loading ? "blur-sm animate-pulse" : "")}
        label="NOTE"
        subtitle="Fill out your Health Declartion Form and Vaccination Profile first in order to scan the QR codes displayed in the gates of the campus."
      />

      <div className="rounded bg-slate-50 shadow-sm">
        <Menu position="vertical">
          <MenuItem
            className={classnames(loading ? "blur-sm animate-pulse" : "")}
            icon={
              <Icon
                background="rounded-full"
                className="bg-red-400 text-white"
                icon={<RiHealthBookFill className="h-4 w-4" />}
              />
            }
            label="Health Declaration Form"
            subtitle="View or fill out your Health Declaration Form."
            hover
            cursorPointer
            onClick={onClickHDF}
          />

          <MenuItem
            className={classnames(loading ? "blur-sm animate-pulse" : "")}
            icon={
              <Icon
                background="rounded-full"
                className="bg-indigo-400 text-white"
                icon={<RiSyringeFill className="h-4 w-4" />}
              />
            }
            label="Vaccination Profile"
            subtitle="Manage your vaccination profile."
            hover
            cursorPointer
            onClick={onClickVacc}
          />
        </Menu>
      </div>

      {hasHDF && (
        <div
          className={classnames(
            "flex flex-col space-y-10",
            loading ? "blur-sm animate-pulse" : ""
          )}
        >
          <Menu position="vertical">
            <MenuItem label="YOUR ENTRY STATUS" />

            <MenuItem
              className={
                status ? "select-none bg-blue-600" : "select-none  bg-red-600"
              }
              icon={
                <Icon
                  background="rounded-full"
                  className={
                    status ? "bg-blue-400 text-white" : "bg-red-400 text-white"
                  }
                  icon={
                    status ? (
                      <ImCheckmark className="h-4 w-4" />
                    ) : (
                      <ImCross className="h-4 w-4" />
                    )
                  }
                />
              }
              label={status ? "ENTRY ALLOWED" : "ENTRY NOT ALLOWED"}
              subtitle={
                status
                  ? "You are allowed to enter the campus. Strictly observe minimum public health standards & safety protocols."
                  : "Your are not allowed to enter the campus. Please go and stay home."
              }
              textColor="white"
            />
          </Menu>

          <div className="bottom-0 grid grid-cols-2 gap-x-3">
            <Button
              buttonStyle="secondary"
              label="VIEW"
              roundedFull
              onClick={onClickResult}
            />
            <Button
              icon={<MdQrCodeScanner className="h-6 w-6" />}
              label="SCAN QR CODE"
              roundedFull
              onClick={onClickQR}
              disabled={entryDate != null ? true : false}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
