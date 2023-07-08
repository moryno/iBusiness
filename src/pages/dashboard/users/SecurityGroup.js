import { useCallback, useEffect, useState } from "react";
import { homeMenuSource } from "../../../data/menu";
import { securityGroupsColumns } from "../../../data/PurchaseOrderData";
import { bookingFilterValues } from "../../../helpers/datatableSource";
import CategoryComponent from "../../../components/dashboard/CategoryComponent";
import Constant from "../../../utils/constant";
import DataTable from "../../../components/dashboard/DataTable";
import Statusbar from "../../../components/dashboard/Statusbar";
import MenusGroupComponent from "../../../components/dashboard/Menus/MenusGroupComponent";
import SecurityGroupForm from "../../../components/dashboard/SecurityGroupForm";
import CustomActionModal from "../../../components/modals/CustomActionModal";
import ErpService from "../../../axios/erpService";

const SecurityGroup = () => {
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
    const response = await ErpService.get(url);
    setRecords(response);
  };

  useEffect(() => {
    getRecords();
  }, []);

  useEffect(() => {
    const getSingleRecord = async () => {
      const url = "/SecurityGroups/" + onEditRecordId;
      const response = await ErpService.get(url);
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
            menus={homeMenuSource}
            heading={"Security Groups"}
            onMenuClick={handleClick}
          />
          <DataTable
            data={records}
            route={route}
            keyExpr={"groupCode"}
            columns={securityGroupsColumns}
            startEdit={startEdit}
            selectRowItem={selectRowItem}
            filterValues={bookingFilterValues}
          />

          <Statusbar
            heading={"Security Groups"}
            company={"ARBS Customer Portal"}
          />
        </CategoryComponent>
      </section>
      <CustomActionModal
        title={"Security Group"}
        isOpen={isOpen}
        handleClose={handleClose}
      >
        {statusMode === "CreateMode" ? (
          <SecurityGroupForm
            setRecords={setRecords}
            records={records}
            singleRecord={singleRecord}
            statusMode={statusMode}
            handleClose={handleClose}
          />
        ) : (
          statusMode === "EditMode" && (
            <SecurityGroupForm
              setRecords={setRecords}
              records={records}
              singleRecord={singleRecord}
              statusMode={statusMode}
              handleClose={handleClose}
            />
          )
        )}
      </CustomActionModal>
    </main>
  );
};

export default SecurityGroup;
