import { createGlobalStyle } from "styled-components";
const GlobalStyle = createGlobalStyle`
  body {
    padding: 0;
    margin: 0;
    font-family: 'Montserrat', sans-serif;
  }

  input:-webkit-autofill {
    background-color: red !important;
  }

  /* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type=number] {
  -moz-appearance: textfield;
}

/* The emerging W3C standard
   that is currently Firefox-only */
* {
  scrollbar-width: thin;
  scrollbar-color: black rgba(0, 0, 0, 0.25882352941176473);;
}

/* Works on Chrome/Edge/Safari */
*::-webkit-scrollbar {
  width: 12px;
}
*::-webkit-scrollbar-track {
  background: rgba(0, 0, 0, 0.25882352941176473);;
}
*::-webkit-scrollbar-thumb {
  background-color: black;
  // border-radius: 20px;
  border: 3px solid rgba(0, 0, 0, 0.25882352941176473);;
}

.rdg-cell{
  overflow: visible;
}

.rdg{
  height: auto !important;
  min-height: 100px;
}

.react-datepicker-wrapper{
  position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
}

.react-datepicker-wrapper .react-datepicker__input-container input{
  width: 100%;
  height: 31px;
  border: 0px solid;
}

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
}

.pagination {
  display: inline-block;
  padding-left: 0;
  margin: 20px 0;
  border-radius: 4px;
}

.pagination > li {
  display: inline;
}

.pagination > li > a, .pagination > li > span {
  position: relative;
  float: left;
  padding: 6px 12px;
  line-height: 1.42857143;
  text-decoration: none;
  color: red !important;
  background-color: #fff;
  border: 1px solid #ddd;
  margin-left: -1px;
}

.pagination > .disabled > span, .pagination > .disabled > span:hover, .pagination > .disabled > span:focus, .pagination > .disabled > a, .pagination > .disabled > a:hover, .pagination > .disabled > a:focus {
  color: white !important;
  background-color: #c7c7c7;
  border-color: #ddd;
  cursor: not-allowed;
}

.pagination > li:first-child > a, .pagination > li:first-child > span {
  margin-left: 0;
  border-bottom-left-radius: 4px;
  border-top-left-radius: 4px;
}

.pagination > .active > a, .pagination > .active > span, .pagination > .active > a:hover, .pagination > .active > span:hover, .pagination > .active > a:focus, .pagination > .active > span:focus {
  z-index: 3;
  color: #fff !important;
  background-color: red;
  border-color: red;
  cursor: default;
}
`

export default GlobalStyle;