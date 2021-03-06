import { Formbar } from ".";
import { Menu, MenuItem, ListItem } from "../commons";

const HamburgerMenu = ({
  onVisitorReviewClick = () => {},
  onReturnClick = () => {},
  onHomeClick = () => {},
  onEditClick = () => {},
  onLogOutClick = () => {},
  onReturnIntro = () => {},
  loading = false,
  visitor = false,
  disabled = false,
}) => {
  return (
    <div className="fixed min-h-screen w-full z-50 border-2 bg-white border-slate-100 lg:left-0 lg:w-1/3 lg:shadow-sm">
      <div className="p-3 flex flex-col gap-y-10">
        <Formbar onReturnClick={onReturnClick} />

        <div className="flex flex-col justify-center space-y-5">
          {!visitor ? (
            <Menu position="vertical">
              <MenuItem
                className="bg-slate-100"
                label="HOME"
                hover
                cursorPointer
                onClick={onHomeClick}
              />

              <MenuItem
                className="bg-slate-100"
                label="UPDATE PROFILE"
                hover
                cursorPointer
                onClick={onEditClick}
              />
            </Menu>
          ) : (
            <Menu position="vertical">
              <MenuItem
                className="bg-slate-100"
                label="EDIT MY INFORMATION"
                hover
                cursorPointer
                onClick={onVisitorReviewClick}
              />
            </Menu>
          )}

          <Menu position="vertical">
            {visitor && (
              <>
                {disabled ? (
                  <ListItem
                    className="bg-slate-100"
                    label="QR CODE ALREADY SCANNED!"
                    subtitle="Your information is stored for only 14 days for COVID-19 tracking. After that time period, all your data and information are completely deleted."
                  />
                ) : (
                  <MenuItem
                    className="bg-slate-100"
                    label="RETURN TO LOGIN SELECTION"
                    hover
                    cursorPointer
                    onClick={onReturnIntro}
                  />
                )}
              </>
            )}

            {!visitor && (
              <>
                <MenuItem
                  className="bg-slate-100"
                  label="LOG OUT"
                  hover
                  cursorPointer
                  onClick={onLogOutClick}
                  loading={loading}
                />
              </>
            )}
          </Menu>
        </div>
      </div>
    </div>
  );
};

export default HamburgerMenu;
