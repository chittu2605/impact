import React from "react";
import styled from "styled-components";

const style = {
  name: {
    marginTop: 0,
    fontSize: "1rem",
    fontWeight: "600",
    textTransform: "uppercase",
    color: "#717171",
    marginBottom: "0rem",
  },

  address: {
    fontSize: "1rem",
  },

  phone: {
    fontSize: "1rem",
  }
}

const StyledName = styled("span")(style.name);
const StyledAddress = styled(StyledName)(style.address);
const StyledPhone = styled(StyledAddress)(style.phone);


const FranchiseDetails = ({selectedFranchise}) => {
  return (
    <div style={{marginBottom: "1rem"}}>
      <StyledName>{selectedFranchise.franchise_name && `${selectedFranchise.franchise_name}, `} </StyledName>
      <StyledAddress>{selectedFranchise.franchise_address && `${selectedFranchise.franchise_address}, `} </StyledAddress>
      <StyledPhone>{selectedFranchise.franchise_number}</StyledPhone>
    </div>
  )
}

export default FranchiseDetails;