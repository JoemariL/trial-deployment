import { BiLoaderAlt } from "react-icons/bi";
import { RiSyringeFill, RiHealthBookFill } from "react-icons/ri";
import { Icon, Menu, MenuItem } from "../../commons";

const Dashboard = ({
  onClickHDF = () => {},
  onClickVacc = () => {},
  loading = false,
}) => {
  if (loading) {
    return (
      <div className="w-full flex flex-col items-center">
        <BiLoaderAlt className="h-8 w-8 text-blue-600 animate-spin" />
      </div>
    );
  } else {
    return (
      <div className="space-y-5">
        <div className="rounded border-2 bg-slate-50 shadow-sm">
          <Menu position="vertical">
            <MenuItem
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

            <hr />

            <MenuItem
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
      </div>
    );
  }
};

export default Dashboard;
