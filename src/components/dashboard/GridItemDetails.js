import React from "react";
import GridItemContent from "./GridItemContent";
import Statusbar from "./Statusbar";
import GridDetailHeader from "./GridDetailHeader";
import RightBarComponent from "./RightBarComponent";

const GridItemDetails = ({
  heading,
  menus,
  title,
  company,
  data,
  onMenuClick,
  customAction,
}) => {
  return (
    <main className="w-full">
      <GridDetailHeader
        menus={menus}
        heading={heading}
        onMenuClick={onMenuClick}
      />
      <section className="mt-5 w-full flex">
        <article className="w-9/12 px-5 box-border">
          <GridItemContent data={data} title={title} />
        </article>
        <article className="w-3/12 px-5 ">
          <RightBarComponent customAction={customAction} />
        </article>
      </section>
      <Statusbar heading={heading} company={company} />
    </main>
  );
};

export default GridItemDetails;
