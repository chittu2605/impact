import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";

const ADPDetails = () => {
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
    },
  };
  const ADPIdWrapper = styled("div")(style.idWrapper);
  const ADPNameWrapper = styled("div")(style.nameWrapper);
  const ADPDetailsLabel = styled("span")(style.label);
  const ADPDetailsIcon = styled("i")(style.icon);

  const { adpId, name } = useSelector((state) => state.updateLoginStatus);
  return (
    <div>
      <ADPIdWrapper>
        <ADPDetailsIcon className="now-ui-icons  users_circle-08" />
        <ADPDetailsLabel>ADP ID: {adpId}</ADPDetailsLabel>
      </ADPIdWrapper>
      <ADPNameWrapper>
        <ADPDetailsIcon className="now-ui-icons emoticons_satisfied" />
        <ADPDetailsLabel>ADP Name: {name}</ADPDetailsLabel>
      </ADPNameWrapper>
    </div>
  );
};

export default ADPDetails;
