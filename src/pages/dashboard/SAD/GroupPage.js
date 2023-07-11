import { useCallback, useEffect, useState } from "react";
import CategoryComponent from "../../../components/dashboard/Shared/CategoryComponent";
import Constant from "../../../utils/constant";
import DataTable from "../../../components/dashboard/Shared/DataGrids/DataTable";
import Statusbar from "../../../components/dashboard/Shared/NavBarFooter/Statusbar";
import MenusGroupComponent from "../../../components/dashboard/Shared/Menus/MenusGroupComponent";
import CustomActionModal from "../../../components/modals/CustomActionModal";
import SadService from "../../../ClientServices/sadService";

const UserGroup = ({
  menus,
  heading,
  company,
  footer,
  title,
  columns,
  url,
  filterValues,
  FormComponent,
}) => {
  const [records, setRecords] = useState([]);
  const [singleRecord, setSingleRecord] = useState({});
  const [onEditRecordId, setEditRecordId] = useState(null);
  // eslint-disable-next-line
  const [selectedRecordId, setSelectedRecordId] = useState(null);
  const [statusMode, setStatusMode] = useState("");
  const [isOpen, setOpen] = useState(false);

  const route = Constant.ROUTE.BOOKING;

  const getRecords = async () => {
    const url = "/SecurityGroups/GetAll";
    const response = await SadService.get(url);
    setRecords(response);
  };

  useEffect(() => {
    getRecords();
  }, []);

  useEffect(() => {
    const getSingleRecord = async () => {
      const url = "/SecurityGroups/" + onEditRecordId;
      const response = await SadService.get(url);
      setSingleRecord(response);
      setStatusMode("EditMode");
      setOpen((isOpen) => !isOpen);
    };
    if (onEditRecordId) getSingleRecord();
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
      case "Invite":
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

  return (
    <main className="w-full min-h-full relative px-3 md:px-5">
      <section>
        <CategoryComponent>
          <MenusGroupComponent
            menus={menus}
            heading={heading}
            onMenuClick={handleClick}
          />
          <DataTable
            data={records}
            route={route}
            keyExpr={"groupCode"}
            columns={columns}
            startEdit={startEdit}
            selectRowItem={selectRowItem}
            filterValues={filterValues}
          />

          <Statusbar footer={footer} company={company} />
        </CategoryComponent>
      </section>
      <CustomActionModal
        title={title}
        isOpen={isOpen}
        handleClose={handleClose}
      >
        {statusMode === "CreateMode" || statusMode === "EditMode" ? (
          <FormComponent
            setRecords={setRecords}
            records={records}
            singleRecord={singleRecord}
            statusMode={statusMode}
            handleClose={handleClose}
          />
        ) : null}
      </CustomActionModal>
    </main>
  );
};

export default UserGroup;
