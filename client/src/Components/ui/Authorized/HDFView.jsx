import classnames from "classnames";
import { FaHeadSideCough, FaTired, FaToiletPaper } from "react-icons/fa";
import { IoSadSharp } from "react-icons/io5";
import { MdSick, MdOutlinePregnantWoman } from "react-icons/md";
import { RiTempColdFill } from "react-icons/ri";
import { Button, Icon, List, ListItem } from "../../commons";

const HDFView = ({
  exposure = false,
  positive = false,
  fever = false,
  cough = false,
  cold = false,
  soreThroat = false,
  diffBreathing = false,
  diarrhea = false,
  pregnant = false,
  hasHDF = false,
  onHDForm = () => {},
  loading = false,
}) => {
  return (
    <div className="flex flex-col space-y-5">
      <div className="p-5 grid grid-rows-3 grid-cols-2 gap-x-3 gap-y-5 rounded-2xl bg-gradient-to-b from-slate-100">
        <ListItem
          className="col-span-2 justify-center text-center"
          label="COVID-19 TRACK"
        />

        <ListItem
          className={classnames(
            "justify-center text-center",
            loading ? "blur-sm animate-pulse" : ""
          )}
          label={hasHDF ? (exposure === true ? "YES" : "NO") : "--"}
          subtitle="EXPOSURE"
        />

        <ListItem
          className={classnames(
            "justify-center text-center",
            loading ? "blur-sm animate-pulse" : ""
          )}
          label={hasHDF ? (positive === true ? "YES" : "NO") : "--"}
          subtitle="POSITIVE"
        />

        <div className="px-16 col-span-2">
          <Button
            label="FILL OUT HDF"
            buttonStyle="primary"
            type="button"
            disabled={hasHDF || loading}
            roundedFull
            onClick={!hasHDF ? onHDForm : undefined}
          />
        </div>
      </div>

      {hasHDF && (
        <div
          className={classnames(
            "flex flex-col space-y-3 select-none",
            loading ? "blur-sm animate-pulse" : ""
          )}
        >
          <List position="vertical">
            <ListItem
              className="justify-center text-center"
              label="MEDICAL HISTORY"
            />
            {fever && (
              <ListItem
                icon={
                  <Icon
                    className="bg-red-400 text-white"
                    icon={<MdSick className="h-4 w-4" />}
                  />
                }
                label="FEVER"
                subtitle="Lagnat"
              />
            )}
            {cough && (
              <ListItem
                icon={
                  <Icon
                    className="bg-green-400 text-white"
                    icon={<FaHeadSideCough className="h-4 w-4" />}
                  />
                }
                label="COUGH"
                subtitle="Pag-ubo"
              />
            )}
            {cold && (
              <ListItem
                icon={
                  <Icon
                    className="bg-blue-400 text-white"
                    icon={<RiTempColdFill className="h-4 w-4" />}
                  />
                }
                label="COLD"
                subtitle="Sipon"
              />
            )}
            {soreThroat && (
              <ListItem
                icon={
                  <Icon
                    className="bg-yellow-400 text-white"
                    icon={<IoSadSharp className="h-4 w-4" />}
                  />
                }
                label="SORE THROAT"
                subtitle="Pananakit ng lalamunan"
              />
            )}

            {diffBreathing && (
              <ListItem
                icon={
                  <Icon
                    className="bg-gray-400 text-white"
                    icon={<FaTired className="h-4 w-4" />}
                  />
                }
                label="DIFFICULTY IN BREATHING"
                subtitle="Hirap sa paghinga"
              />
            )}

            {diarrhea && (
              <ListItem
                icon={
                  <Icon
                    className="bg-lime-400 text-white"
                    icon={<FaToiletPaper className="h-4 w-4" />}
                  />
                }
                label="DIARRHEA"
                subtitle="Madalas na pagdumi"
              />
            )}
          </List>

          <List position="vertical">
            <ListItem
              className="bg-cyan-600"
              icon={
                <Icon
                  className="bg-cyan-400 text-white"
                  icon={<MdOutlinePregnantWoman className="h-4 w-4" />}
                />
              }
              label={
                pregnant === null || pregnant === ""
                  ? "NOT APPLICABLE"
                  : pregnant === true
                  ? "PREGNANT"
                  : "NOT PREGNANT"
              }
              subtitle="Pregnancy status"
              textColor="white"
            />
          </List>
        </div>
      )}

      <p className="text-sm">
        Health Declaration Form will reset every 12:00 AM GMT +08. <br />
        <span className="text-red-600">
          *After filling out your HDF, you are not able to fill out again until
          the reset time.
        </span>
      </p>
    </div>
  );
};

export default HDFView;
