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
import { useDispatch } from "react-redux";
import { getMenuItem } from "../../../redux/reducers/moduleSlice";

const GroupPage = ({
  records,
  menus,
  roles,
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
  const dispatch = useDispatch();
  const [singleRecord, setSingleRecord] = useState({});
  const [onEditRecordId, setEditRecordId] = useState(null);
  const [selectedRecordId, setSelectedRecordId] = useState(null);
  const [statusMode, setStatusMode] = useState("");
  const [isOpen, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);

  const handleContextMenu = (event) => {
    event.preventDefault();
  };

  useEffect(() => {
    document.addEventListener("contextmenu", handleContextMenu);

    return () => {
      document.removeEventListener("contextmenu", handleContextMenu);
    };
  }, []);

  useEffect(() => {
    const getRecord = async () => {
      try {
        if (onEditRecordId) {
          const action = `/${url}/${onEditRecordId}`;
          const response = await SadService.get(action);
          setSingleRecord(response);
          setStatusMode("EditMode");
          setOpen((isOpen) => !isOpen);
        }
      } catch (error) {
        console.log(error);
      }
    };

    getRecord();
  }, [onEditRecordId, url, menus, roles]);

  useEffect(() => {
    dispatch(getMenuItem(roles));
  }, [dispatch, roles]);

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

  const handleClose = useCallback(() => {
    setEditRecordId(null);
    setSingleRecord({});
    setStatusMode("");
    setOpen(false);
    setConfirmDelete(false);
  }, []);

  const openConfirmationPopup = useCallback(async (rowItem) => {
    try {
      if (rowItem === null) {
        toast.warning("Select a record to delete");
      } else {
        setSelectedRecordId(rowItem);
        setStatusMode("DeleteMode");
        setConfirmDelete((confirmDelete) => !confirmDelete);
      }
    } catch (error) {
      setSelectedRecordId(null);
      setStatusMode("");
      setConfirmDelete(false);
      console.log(error);
    }
  }, []);

  const handleDelete = useCallback(async () => {
    setLoading(true);
    try {
      const action = `/${url}/${selectedRecordId}`;
      const response = await SadService.delete(action);

      if (response?.responseCode === "02") {
        onDelete(selectedRecordId);
        setConfirmDelete(false);
        setLoading(false);
        setSelectedRecordId(null);
        toast.success(response?.responseMsg);
      } else {
        setConfirmDelete(false);
        setLoading(false);
        setSelectedRecordId(null);
        toast.error("Cannot delete a group with assigned users.");
      }
    } catch (error) {
      setLoading(false);
      setConfirmDelete(false);
      setSelectedRecordId(null);
      console.log(error);
    }
  }, [onDelete, selectedRecordId, url]);

  const handleClick = useCallback(
    (menu) => {
      switch (menu) {
        case "Find":
          break;
        case "Add":
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
    [openConfirmationPopup, selectedRecordId, navigate]
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
            loading={loading}
          />
        </Portal>
      )}
    </main>
  );
};

export default GroupPage;
