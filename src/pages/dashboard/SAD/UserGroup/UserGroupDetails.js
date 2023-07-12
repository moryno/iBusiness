import { useCallback, useEffect, useState } from "react";
import FromToDateComponent from "../../../../components/dashboard/Shared/FromToDateComponent";
import { useNavigate, useParams } from "react-router-dom";
import SadService from "../../../../ClientServices/sadService";
import { userGroupDetail } from "../../../../data/headingFooterTitle";
import Constant from "../../../../utils/constant";
import CategoryComponent from "../../../../components/dashboard/Shared/CategoryComponent";
import MenusGroupComponent from "../../../../components/dashboard/Shared/Menus/MenusGroupComponent";
import { updateMenuSource } from "../../../../data/dashboard-page/menu";
import DataTable from "../../../../components/dashboard/Shared/DataGrids/DataTable";
import Statusbar from "../../../../components/dashboard/Shared/NavBarFooter/Statusbar";
import { userGroupsColumns } from "../../../../data/datagrid-json/datagridColumns";
import { bookingFilterValues } from "../../../../helpers/datatableSource";
import CustomActionModal from "../../../../components/modals/CustomActionModal";
import UserGroupForm from "../../../../components/dashboard/SAD/UserGroup/UserGroupForm";

const UserGroupDetails = () => {
  const { id } = useParams();
  const [records, setRecords] = useState([]);

  const [statusMode, setStatusMode] = useState("");
  const [isOpen, setOpen] = useState(false);
  const navigate = useNavigate();

  const route = Constant.ROUTE.BOOKING;

  useEffect(() => {
    const getUserGroupByCode = async () => {
      const url = "/UserGroups/" + id;
      const response = await SadService.get(url);
      setRecords(response);
    };
    getUserGroupByCode();
  }, [id]);

  const startEdit = useCallback(({ key }) => {
    if (key) {
    } else {
    }
  }, []);

  const selectRowItem = useCallback(({ key }) => {
    if (key) {
    }
  }, []);

  const handleClose = () => {
    setStatusMode("");
    setOpen(false);
  };

  const handleClick = (menu) => {
    switch (menu) {
      case "Edit":
        setStatusMode("EditMode");
        setOpen(true);
        break;
      case "Delete":
        break;
      case "Close":
        navigate(-1);
        break;
      case "Help":
        console.log("Help was clicked");
        break;

      default:
        break;
    }
  };

  return (
    <main className="w-full min-h-full relative">
      <CategoryComponent>
        <MenusGroupComponent
          menus={updateMenuSource}
          heading={userGroupDetail.heading}
          onMenuClick={handleClick}
        />
        <FromToDateComponent />
        <DataTable
          data={records}
          route={route}
          keyExpr={"createdDate"}
          columns={userGroupsColumns}
          startEdit={startEdit}
          selectRowItem={selectRowItem}
          filterValues={bookingFilterValues}
        />
        <Statusbar
          footer={userGroupDetail.footer}
          company={userGroupDetail.company}
        />
      </CategoryComponent>
      <CustomActionModal title={id} isOpen={isOpen} handleClose={handleClose}>
        {statusMode === "EditMode" ? (
          <UserGroupForm statusMode={statusMode} handleClose={handleClose} />
        ) : null}
      </CustomActionModal>
    </main>
  );
};

export default UserGroupDetails;
