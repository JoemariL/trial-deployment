import classnames from "classnames";
import { FaUserAlt } from "react-icons/fa";
import { Button, Icon, List, ListItem } from "../../commons";

const VaccineView = ({
  vaccineStatus = "",
  vaccineDate = "",
  vaccineSerial = "",
  hasVaccine = false,
  loading = false,
  onVaccineForm = () => {},
}) => {
  return (
    <div
      className={classnames(
        "flex flex-col space-y-10"
        // loading ? "blur-sm animate-pulse" : ""
      )}
    >
      <List position="vertical">
        <ListItem
          className="bg-blue-900 rounded-full"
          icon={<Icon icon={<FaUserAlt className="h-4 w-4" />} />}
          label="Vaccination Profile"
          textColor="white"
        />

        <div className="p-2 rounded space-y-3 bg-slate-100">
          <ListItem
            // className={classnames(loading ? "blur-sm animate-pulse" : "")}
            label={hasVaccine ? vaccineStatus : "--"}
            subtitle="Vaccine status"
          />
          <ListItem
            // className={classnames(loading ? "blur-sm animate-pulse" : "")}
            label={hasVaccine ? vaccineDate : "--"}
            subtitle={
              vaccineStatus === "NOT VACCINATED"
                ? "No date of dose."
                : "Date of last dose"
            }
          />
          <ListItem
            // className={classnames(loading ? "blur-sm animate-pulse" : "")}
            label={hasVaccine ? vaccineSerial : "--"}
            subtitle={
              vaccineStatus === "NOT VACCINATED"
                ? "No vaccination card serial no."
                : "Vaccination card serial no."
            }
          />
        </div>
      </List>

      <div className="px-16 col-span-2">
        <Button
          label="Manage"
          type="button"
          roundedFull
          onClick={!loading ? onVaccineForm : undefined}
        />
      </div>
    </div>
  );
};

export default VaccineView;
