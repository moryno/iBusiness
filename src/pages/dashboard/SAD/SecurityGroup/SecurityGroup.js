import SecurityGroupForm from "../../../../components/dashboard/SAD/SecurityGroup/SecurityGroupForm";
import { homeMenuSource } from "../../../../data/dashboard-page/menu";
import { securityGroupsColumns } from "../../../../data/datagrid-json/datagridColumns";
import { bookingFilterValues } from "../../../../helpers/datatableSource";
import {
  deleteTitle,
  securityHeadingFooter,
} from "../../../../data/headingFooterTitle";
import { useDispatch, useSelector } from "react-redux";
import { useCallback, useEffect, useState } from "react";
import { getSecurityGroups } from "../../../../redux/actions/userManagementCall";
import { securityActions } from "../../../../data/dashboard-page/moduleSource";
import CategoryComponent from "../../../../components/dashboard/Shared/CategoryComponent";
import MenusGroupComponent from "../../../../components/dashboard/Shared/Menus/MenusGroupComponent";
import DataTable from "../../../../components/dashboard/Shared/DataGrids/DataTable";
import Statusbar from "../../../../components/dashboard/Shared/NavBarFooter/Statusbar";
import CustomActionModal from "../../../../components/modals/CustomActionModal";
import SadService from "../../../../ClientServices/sadService";
import { useNavigate } from "react-router-dom";
import Portal from "../../../../components/modals/Portal";
import ConfirmationPopupComponent from "../../../../components/dashboard/Shared/ConfirmationPopupComponent";
import { toast } from "react-toastify";
import { deleteSecurityGroupSuccess } from "../../../../redux/reducers/securityGroupSlice";
import GroupPage from "../GroupPage";

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
  const [confirmDelete, setConfirmDelete] = useState(false);

  const url = "SecurityGroups";
  const redirectRoute = "users/security-groups";

  const securityGroups = useSelector((state) => state?.securityGroups?.groups);

  useEffect(() => {
    getSecurityGroups(dispatch);
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
    setConfirmDelete(false);
  };

  const openConfirmationPopup = useCallback(async (rowItem) => {
    if (rowItem === null) {
      toast.warning(
        "You must select one or more records before you can perform this action."
      );
    } else {
      setStatusMode("DeleteMode");
      setConfirmDelete((confirmDelete) => !confirmDelete);
    }
  }, []);

  const handleDelete = async () => {
    try {
      const action = `/${url}/${selectedRecordId}`;
      const response = await SadService.delete(action);

      if (response?.responseCode === "02") {
        dispatch(deleteSecurityGroupSuccess(selectedRecordId));
        setConfirmDelete(false);
        setSelectedRecordId(null);
        toast.success(response?.responseMsg);
      } else {
        setConfirmDelete(false);
        setSelectedRecordId(null);
        toast.error("Cannot delete a group with assigned users.");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleClick = useCallback(
    (menu) => {
      switch (menu) {
        case "Find":
          break;
        case "New":
          setStatusMode("CreateMode");
          setOpen(true);
          break;

        case "Delete":
          openConfirmationPopup(selectedRecordId);
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
    [selectedRecordId, openConfirmationPopup]
  );

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
    <GroupPage
      records={securityGroups}
      heading={securityHeadingFooter.heading}
      title={securityHeadingFooter.title}
      footer={securityHeadingFooter.footer}
      company={securityHeadingFooter.company}
      menus={homeMenuSource}
      customActions={securityActions}
      keyExpr={"groupCode"}
      columns={securityGroupsColumns}
      url={"SecurityGroups"}
      onActionClick={onCustomActionClick}
      redirectRoute={"users/security-groups"}
      filterValues={bookingFilterValues}
      FormComponent={SecurityGroupForm}
    />
  );
};

export default SecurityGroup;
