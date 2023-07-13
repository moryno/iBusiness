import SecurityGroupForm from "../../../../components/dashboard/SAD/SecurityGroup/SecurityGroupForm";
import UserGroupForm from "../../../../components/dashboard/SAD/UserGroup/UserGroupForm";
import { homeMenuSource } from "../../../../data/dashboard-page/menu";
import { securityGroupsColumns } from "../../../../data/datagrid-json/datagridColumns";
import { bookingFilterValues } from "../../../../helpers/datatableSource";
import { securityHeadingFooter } from "../../../../data/headingFooterTitle";
import { useDispatch, useSelector } from "react-redux";
import { useCallback, useEffect, useState } from "react";
import {
  getFreshSecurityGroups,
  getSecurityGroups,
} from "../../../../redux/api/userManagementCall";
import { securityGroupModules } from "../../../../data/dashboard-page/moduleSource";
import CategoryComponent from "../../../../components/dashboard/Shared/CategoryComponent";
import MenusGroupComponent from "../../../../components/dashboard/Shared/Menus/MenusGroupComponent";
import DataTable from "../../../../components/dashboard/Shared/DataGrids/DataTable";
import Statusbar from "../../../../components/dashboard/Shared/NavBarFooter/Statusbar";
import CustomActionModal from "../../../../components/modals/CustomActionModal";
import SadService from "../../../../ClientServices/sadService";
import { useNavigate } from "react-router-dom";

const SecurityGroup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [singleRecord, setSingleRecord] = useState({});
  const [onEditRecordId, setEditRecordId] = useState(null);
  // eslint-disable-next-line
  const [selectedRecordId, setSelectedRecordId] = useState(null);
  const [statusMode, setStatusMode] = useState("");
  const [customModalMode, setCustomMode] = useState("");
  const [isOpen, setOpen] = useState(false);

  const url = "SecurityGroups";
  const redirectRoute = "users/security-groups";

  const securityGroups = useSelector((state) => state?.securityGroups?.groups);

  useEffect(() => {
    if (!securityGroups || securityGroups.length < 1) {
      getSecurityGroups(dispatch);
    } else {
      getFreshSecurityGroups(dispatch);
    }

    // eslint-disable-next-line
  }, [dispatch]);

  useEffect(() => {
    const getSingleRecord = async () => {
      const action = `/${url}/${onEditRecordId}`;
      const response = await SadService.get(action);
      setSingleRecord(response);
      setStatusMode("EditMode");
      setOpen((isOpen) => !isOpen);
    };
    if (onEditRecordId) getSingleRecord();
    // eslint-disable-next-line
  }, [onEditRecordId]);

  const startEdit = useCallback(({ key }) => {
    if (key) {
      setEditRecordId(key);
    } else {
      setEditRecordId(null);
    }
  }, []);

  const selectRowItem = useCallback(({ key }) => {
    if (key) {
      setSelectedRecordId(key);
    }
  }, []);

  const handleClose = () => {
    setEditRecordId(null);
    setSingleRecord({});
    setStatusMode("");
    setOpen(false);
  };

  const handleClick = useCallback((menu) => {
    switch (menu) {
      case "Find":
        break;
      case "New":
        setStatusMode("CreateMode");
        setOpen(true);
        break;

      case "Delete":
        break;
      case "Close":
        console.log("Close was clicked");
        break;
      case "Help":
        console.log("Help was clicked");
        break;

      default:
        break;
    }
  }, []);

  const onCustomActionClick = useCallback(
    (menu) => {
      switch (menu) {
        case "User Groups":
          navigate("/dashboard/users/user-groups");
          break;
        case "Create UserGroups":
          setCustomMode("CreateUserGroup");
          setOpen(true);
          break;

        case "Delete":
          break;
        case "Close":
          console.log("Close was clicked");
          break;
        case "Help":
          console.log("Help was clicked");
          break;

        default:
          break;
      }
    },
    [navigate]
  );

  return (
    <main className="w-full min-h-full relative">
      <section>
        <CategoryComponent>
          <MenusGroupComponent
            menus={homeMenuSource}
            customActions={securityGroupModules}
            heading={securityHeadingFooter.heading}
            onMenuClick={handleClick}
            onActionClick={onCustomActionClick}
          />
          <DataTable
            data={securityGroups}
            route={redirectRoute}
            keyExpr={"groupCode"}
            columns={securityGroupsColumns}
            startEdit={startEdit}
            selectRowItem={selectRowItem}
            filterValues={bookingFilterValues}
          />

          <Statusbar
            footer={securityHeadingFooter.footer}
            company={securityHeadingFooter.company}
          />
        </CategoryComponent>
      </section>
      <CustomActionModal
        title={
          customModalMode === "CreateUserGroup"
            ? "User Group"
            : securityHeadingFooter.title
        }
        isOpen={isOpen}
        handleClose={handleClose}
      >
        {statusMode === "CreateMode" || statusMode === "EditMode" ? (
          <SecurityGroupForm
            singleRecord={singleRecord}
            statusMode={statusMode}
            handleClose={handleClose}
          />
        ) : (
          customModalMode === "CreateUserGroup" && <UserGroupForm />
        )}
      </CustomActionModal>
    </main>
  );
};

export default SecurityGroup;
