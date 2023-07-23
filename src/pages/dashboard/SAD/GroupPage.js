import { useCallback, useEffect, useState } from "react";
import CategoryComponent from "../../../components/dashboard/Shared/CategoryComponent";
import DataTable from "../../../components/dashboard/Shared/DataGrids/DataTable";
import Statusbar from "../../../components/dashboard/Shared/NavBarFooter/Statusbar";
import MenusGroupComponent from "../../../components/dashboard/Shared/Menus/MenusGroupComponent";
import CustomActionModal from "../../../components/modals/CustomActionModal";
import SadService from "../../../ClientServices/sadService";
import Portal from "../../../components/modals/Portal";
import ConfirmationPopupComponent from "../../../components/dashboard/Shared/ConfirmationPopupComponent";
import { deleteTitle } from "../../../data/headingFooterTitle";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const GroupPage = ({
  records,
  menus,
  keyExpr,
  heading,
  company,
  footer,
  title,
  columns,
  url,
  onActionClick,
  customActions,
  redirectRoute,
  className,
  filterValues,
  onDelete,
  FormComponent,
}) => {
  const navigate = useNavigate();
  const [singleRecord, setSingleRecord] = useState({});
  const [onEditRecordId, setEditRecordId] = useState(null);
  const [selectedRecordId, setSelectedRecordId] = useState(null);
  const [statusMode, setStatusMode] = useState("");
  const [isOpen, setOpen] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);

  useEffect(() => {
    const getSingleRecord = async () => {
      const action = `/${url}/${onEditRecordId}`;
      const response = await SadService.get(action);
      setSingleRecord(response);
      setStatusMode("EditMode");
      setOpen((isOpen) => !isOpen);
    };
    if (onEditRecordId) getSingleRecord();
  }, [onEditRecordId, url]);

  const startEdit = useCallback(({ key }) => {
    if (key) {
      setEditRecordId(key);
    } else {
      setEditRecordId(null);
    }
  }, []);

  const selectRowItem = useCallback(({ key }) => {
    console.log(key);
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
      setSelectedRecordId(rowItem);
      setStatusMode("DeleteMode");
      setConfirmDelete((confirmDelete) => !confirmDelete);
    }
  }, []);

  const handleDelete = async () => {
    try {
      const action = `/${url}/${selectedRecordId}`;
      const response = await SadService.delete(action);

      if (response?.responseCode === "02") {
        onDelete(selectedRecordId);
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
        case "Invite":
          setStatusMode("CreateMode");
          setOpen(true);
          break;
        case "Delete":
          openConfirmationPopup(selectedRecordId);
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
    },
    [selectedRecordId, openConfirmationPopup, navigate]
  );

  return (
    <main className="w-full min-h-full relative">
      <section>
        <CategoryComponent>
          <MenusGroupComponent
            menus={menus}
            customActions={customActions}
            heading={heading}
            onMenuClick={handleClick}
            onActionClick={onActionClick}
          />
          <DataTable
            data={records}
            className={className}
            route={redirectRoute}
            keyExpr={keyExpr}
            columns={columns}
            startEdit={startEdit}
            selectRowItem={selectRowItem}
            filterValues={filterValues}
            openConfirmationPopup={openConfirmationPopup}
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
            singleRecord={singleRecord}
            statusMode={statusMode}
            handleClose={handleClose}
          />
        ) : null}
      </CustomActionModal>
      {statusMode === "DeleteMode" && (
        <Portal isOpen={confirmDelete} setOpen={setConfirmDelete}>
          <ConfirmationPopupComponent
            handleClose={handleClose}
            title={deleteTitle.heading}
            body={heading}
            code={selectedRecordId}
            text={deleteTitle.text}
            statusBarText={footer}
            statusMode={statusMode}
            onDelete={handleDelete}
          />
        </Portal>
      )}
    </main>
  );
};

export default GroupPage;
