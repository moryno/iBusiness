import React from "react";
import "./contactus.css";
import data from "../../../data/address";

export const Address = () => {
  return (
    // <div className="address-body">
    //   <div className="adr-head">
    //     <FontAwesomeIcon icon={faLocationDot} />
    //     <h2 className="adr-header">{data.location_header}</h2>
    //   </div>
    //   <div className="adr-subtext">
    //     <p>
    //       {data.location.building}
    //       <br />
    //       <br />
    //       {data.location.city}
    //       <br />
    //       <br />
    //       {data.location.country}
    //     </p>
    //   </div>
    //   <div className="adr-head">
    //     <FontAwesomeIcon icon={faMobileButton} />
    //     <h2 className="adr-header">{data.phone_header}</h2>
    //   </div>
    //   <div className="adr-subtext">
    //     <p>{data.phone}</p>
    //   </div>
    //   <div className="adr-head">
    //     <FontAwesomeIcon icon={faEnvelope} />
    //     <h2 className="adr-header">{data.email_header}</h2>
    //   </div>
    //   <div className="adr-subtext">
    //     <p>{data.email}</p>
    //   </div>
    // </div>

    <div className="support-information">
      <div className="support-info-header">
        <h2 className="support-info-header-title">{data.supportInfoHeaderTitle}</h2>
        <p className="support-info-header-subtitle">
          {data.supportInfoHeaderSubtitle}
        </p>
      </div>
      <div className="support-info-description">
        <p className="support-info-description-text">
          {data.supportInfoDescriptionText}
        </p>
      </div>
    </div>
  );
};
