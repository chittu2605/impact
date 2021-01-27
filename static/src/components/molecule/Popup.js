import React from 'react';
import styled from 'styled-components';
import NotAvailable from "../../assets/images/image-not-available.jpg";
import { createGlobalStyle } from "styled-components";
import { device } from "../../constants/mediaQueries/device";
const GlobalStyle = createGlobalStyle`
  body {
    overflow: hidden;
  }

`


const styles = {
    modalContainer: {
      display: "block",  
      textTransform: "uppercase",

      "&::after": {
        content: "''",
        position: "fixed",
        top: 0,
        bottom: 0,
        right: 0,
        left: 0,
        background: "rgba(0, 0, 0, 0.53)",
        zIndex: -1,

      }
    },

    productImage: {
        height:"100%", 
        width:"100%",
        backgroundSize:"cover",
        backgroundPosition: "center",
    },

    productShortDesc: {
        border: "1px solid rgba(0, 0, 0, 0.16)",
        height:"190px",
        padding: "5px",
        height:"100px",
        textAlign:"left",
        overflow:"auto",
        [device.laptop]: {
            height: "200px",
        }
        
    },
    productDesc: {
        border: "1px solid rgba(0, 0, 0, 0.16)",
        height:"190px",
        padding: "5px",
        overflow:"auto",
    }
}


const ModalContainer = styled("div")(styles.modalContainer);
const ProductImage = styled("div")(styles.productImage);
const ProductDesc = styled("div")(styles.productDesc);
const ProductShortDesc = styled("div")(styles.productShortDesc);


const popup = (props) => {

    return (
        <ModalContainer className="modal"  tabindex="-1" role="dialog">
            {/* <GlobalStyle /> */}
            <div className="modal-dialog  modal-xl">
                <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title">{props.product}</h5>
                    <button 
                        type="button" 
                        className="close" 
                        data-dismiss="modal" 
                        aria-label="Close"
                        onClick={props.handleReadMoreclicked}
                    >
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div className="modal-body">
                    <div className="row">
                        <div className="col-4">
                            <ProductImage style={{backgroundImage: "url(" + (props.imageUrl != null ? props.imageUrl : NotAvailable) + ")"}}>
                            </ProductImage>
                        </div>
                        <div className="col-8">
                        <ProductShortDesc >
                            {props.short_desc}
                        </ProductShortDesc>
                        </div>
                    </div>
                
                <br></br>
                <div className="row">
                    <div className="col-12"> 
                        <ProductDesc > 
                            <p>{props.desc}</p>
                        </ProductDesc>
                    </div>
                </div>
                
                </div>
                <div className="modal-footer">
                    <button 
                        type="button" 
                        className="btn btn-secondary" 
                        data-dismiss="modal"
                        onClick={props.handleReadMoreclicked}
                    >Close</button>
                    {/* <button type="button" className="btn btn-primary">Save changes</button> */}
                </div>
                </div>
            </div>
        </ModalContainer>
        
    )

}

export default popup;