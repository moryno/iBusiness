import React from "react";
import Statusbar from "../NavBarFooter/Statusbar";
import MenusGroupComponent from "../Menus/MenusGroupComponent";
import SkeletonDetail from "../Skeletons/SkeletonDetail";

const DetailsPage = ({
  heading,
  footer,
  menus,
  title,
  company,
  data,
  onMenuClick,
  customAction,
  DetailComponent,
  CustomActionComponent,
}) => {
  return (
    <main className="w-full min-h-full">
      <MenusGroupComponent
        menus={menus}
        heading={heading}
        onMenuClick={onMenuClick}
      />
      <section className="mt-5 w-full gap-2 md:gap-0 flex flex-col-reverse md:flex-row">
        <article className="w-full px-2 md:w-9/12 lg:px-5 box-border">
          {data ? (
            <DetailComponent data={data} title={title} />
          ) : (
            <SkeletonDetail />
          )}
        </article>
        <article className="w-full px-2 md:w-3/12 lg:px-5 ">
          <CustomActionComponent customAction={customAction} />
        </article>
      </section>
      <Statusbar footer={footer} company={company} />
    </main>
  );
};

export default DetailsPage;
