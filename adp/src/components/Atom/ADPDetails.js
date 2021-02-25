import React from "react";
import styled from "styled-components";

const ADPDetails = ({ adpId, name }) => {
  const style = {
    idWrapper: {
      display: "block",
    },
    nameWrapper: {
      display: "block",
      marginTop: "1rem",
    },
    label: {
      marginLeft: "0.5rem",
    },
    icon: {
      fontSize: "1.5rem",
      verticalAlign: "middle",
      marginLeft: "15px",
    },
  };
  const ADPIdWrapper = styled("div")(style.idWrapper);
  const ADPNameWrapper = styled("div")(style.nameWrapper);
  const ADPDetailsLabel = styled("span")(style.label);
  const ADPDetailsIcon = styled("i")(style.icon);
  return (
    <div>
      <>
        <ADPDetailsIcon className="now-ui-icons  users_circle-08" />
        <ADPDetailsLabel>ADP ID: {adpId}</ADPDetailsLabel>
        <ADPDetailsIcon className="now-ui-icons emoticons_satisfied" />
        <ADPDetailsLabel>ADP Name: {name}</ADPDetailsLabel>
      </>
    </div>
  );
};

export default ADPDetails;
