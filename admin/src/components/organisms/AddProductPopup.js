import React from 'react';
import styled from 'styled-components';
import AddProductForm from '../molecules/AddProductForm';
import axios from 'axios';
import { withRouter } from "react-router-dom";
import { apiHandler } from '../../utils/apiConfig';


const styles = {
    modalContainer: {
      display: "block",  
      top: "50px",
      zIndex: "2000",

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

    modalBody: {
        // overflow: "scroll",
    },   
}


const ModalContainer = styled("div")(styles.modalContainer);
const ModalBody = styled("div")(styles.modalBody);



class AddProductPopup extends React.Component {
    
    handleProductAdd = ({product}) => {
        var bodyFormData = new FormData();
        for ( var key in product ) {
            if (key === "image" && product[key] !== "") {
                bodyFormData.append(key, product[key], product[key].name);
            } else {
                bodyFormData.append(key, product[key]);
            }
            
        }
        apiHandler.post(`/add-product`, bodyFormData).then((response) => {
            this.props.toggleModal();
            this.props.history.push("/products");
            setTimeout(() => {
                this.props.getAdminProductAction()
            }, 300)
            
        })
    }

    render () {
        let props = this.props;
        return (
            <ModalContainer className="modal"  tabindex="-1" role="dialog">
                {/* <GlobalStyle /> */}
                <div className="modal-dialog modal-dialog-scrollable modal-xl	">
                    <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Add Product</h5>
                        <button 
                            type="button" 
                            className="close" 
                            data-dismiss="modal" 
                            aria-label="Close"
                            onClick={props.toggleModal}
                        >
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <ModalBody className="modal-body">
                        <AddProductForm 
                            handleProductAdd={this.handleProductAdd}
                            toggleModal={props.toggleModal}
                            productTypeOptions={props.productTypeOptions}
                        />
                    
                    </ModalBody>
                    
                    </div>
                </div>
            </ModalContainer>
            
        )
    }
}



export default (withRouter(AddProductPopup));