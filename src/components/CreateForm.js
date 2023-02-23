import "devextreme-react/text-area";
import Form, { GroupItem, Item } from "devextreme-react/form";

import MenuButtonsGroup from "./MenuButtonsGroup";
import { newMenuSource } from "../data/menu";

import MobileMenus from "./MobileMenus";
import Statusbar from "./Statusbar";
import { useState } from "react";

const CreateForm = () => {
  const [formInputs, setFormInputs] = useState({});

  const handleChange = (e) => {
    const name = e.dataField;
    const value = e.value;
    setFormInputs({ ...formInputs, [name]: value });
  };

  const save = async () => {};

  const handleClick = (menu) => {
    switch (menu) {
      case "Save":
        save();
        break;
      case "Close":
        // navigate("/");
        break;
      default:
        break;
    }
  };

  return (
    <main className="w-full relative h-full md:h-full  px-3 md:px-5 py-1.5">
      <section className="w-full h-full">
        <MenuButtonsGroup
          heading="Add a booking"
          menus={newMenuSource}
          onMenuClick={handleClick}
        />

        <MobileMenus menus={newMenuSource} onMenuClick={handleClick} />
        <article className="flex items-center justify-center">
          <div className="py-2  w-full p-2 md:px-0">
            <div className="text-menu bg-bgxLight rounded-t-md py-1 px-2 font-medium ">
              Enter all the details in the fields below then click save.
            </div>

            <Form className="mt-5" onFieldDataChanged={handleChange}>
              <GroupItem colCount={2}>
                <Item dataField="fullName"></Item>
                <Item dataField="email"></Item>
                <Item dataField="telephone"></Item>
                <Item dataField="idNumber"></Item>
                <Item dataField="physicalAddress"></Item>
                <Item dataField="employerName"></Item>
                <Item dataField="originCountry" editorType="dxSelectBox"></Item>
                <Item dataField="experience (years)"></Item>
                <Item dataField="position"></Item>
                <Item dataField="bookingType" editorType="dxSelectBox"></Item>
                <Item
                  dataField="retirementSchemeName"
                  editorType="dxSelectBox"
                ></Item>
                <Item dataField="schemePosition"></Item>
                <Item dataField="trainingVenue" editorType="dxSelectBox"></Item>
                <Item dataField="courseDate" editorType="dxDateBox"></Item>
                <Item dataField="paymentMode" editorType="dxSelectBox"></Item>
                <Item dataField="additionalRequirements"></Item>
                <Item dataField="externalSchemeAdmin"></Item>
                <Item
                  dataField="disabilityStatus"
                  editorType="dxSelectBox"
                ></Item>
              </GroupItem>
            </Form>
          </div>
        </article>
      </section>
      <Statusbar heading="Add New Booking" company="ARBS Customer Portal" />
    </main>
  );
};

export default CreateForm;
