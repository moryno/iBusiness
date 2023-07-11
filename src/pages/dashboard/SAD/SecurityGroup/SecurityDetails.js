import { useNavigate, useParams } from "react-router-dom";
import DetailsPage from "../../../../components/dashboard/Shared/DetailsComponents/DetailsPage";
import GroupDetails from "../../../../components/dashboard/Shared/DetailsComponents/GroupDetails";
import {
  customActionsSource,
  updateMenuSource,
} from "../../../../data/dashboard-page/menu";
import { securityDetail } from "../../../../data/headingFooterTitle";
import { useEffect, useState } from "react";
import SadService from "../../../../ClientServices/sadService";
import SecurityRightBar from "../../../../components/dashboard/SAD/SecurityGroup/SecurityRightBar";
import SecurityGroupForm from "../../../../components/dashboard/SAD/SecurityGroup/SecurityGroupForm";
import CustomActionModal from "../../../../components/modals/CustomActionModal";

const SecurityDetails = () => {
  const { id } = useParams();
  const [data, setData] = useState({});
  const navigate = useNavigate();
  const [isOpen, setOpen] = useState(false);
  const [statusMode, setStatusMode] = useState("");

  useEffect(() => {
    const getSingleBooking = async () => {
      const url = "/SecurityGroups/" + id;
      const response = await SadService.get(url);
      setData(response);
    };
    getSingleBooking();
  }, [id]);

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

  const handleClose = () => {
    setStatusMode("");
    setOpen(false);
  };

  return (
    <main className="w-full min-h-full relative  px-3 md:px-5 py-1.5">
      <DetailsPage
        data={data}
        heading={securityDetail.heading}
        footer={securityDetail.footer}
        title={`${securityDetail.title} ${data?.groupCode}`}
        menus={updateMenuSource}
        customAction={customActionsSource}
        company={securityDetail.company}
        onMenuClick={handleClick}
        DetailComponent={GroupDetails}
        CustomActionComponent={SecurityRightBar}
      />
      <CustomActionModal
        title={"Hello"}
        isOpen={isOpen}
        handleClose={handleClose}
      >
        {statusMode === "EditMode" && (
          <SecurityGroupForm
            singleRecord={data}
            statusMode={statusMode}
            handleClose={handleClose}
          />
        )}
      </CustomActionModal>
    </main>
  );
};

export default SecurityDetails;
