import { createGlobalStyle } from "styled-components";
const GlobalStyle = createGlobalStyle`
  body {
    padding: 0;
    margin: 0;
    font-family: 'Montserrat', sans-serif;
    text-transform: uppercase;
  }

  @media only screen and (min-width: 768px) {
    body {
      overflow: hidden;
    }
  }
  

  input:-webkit-autofill {
    background-color: red !important;
  };

  .loading-indicator:before {
    content: '';
    background: #000000cc;
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    z-index: 3000;
  }
  
  .loading-indicator:after {
    content: '';
    position: fixed;
    width: 100%;
    top: 45%;
    left: 45%;
    z-index: 3001;
    color:white;
    text-align:center;
    font-weight:bold;
    font-size:1.5rem;    
    border: 16px solid #f3f3f3;
    border-radius: 50%;
    border-top: 16px solid red;
    width: 120px;
    height: 120px;
    -webkit-animation: spin 2s linear infinite; /* Safari */
    animation: spin 2s linear infinite;   
    transform: translate(-50%, -50%)  !important;
  }
  
  @-webkit-keyframes spin {
    0% { -webkit-transform: rotate(0deg); }
    100% { -webkit-transform: rotate(360deg);  }
  }
  
  @keyframes spin {
    0% { transform: rotate(0deg);}
    100% { transform: rotate(360deg);; }
  };

  
`

export default GlobalStyle;