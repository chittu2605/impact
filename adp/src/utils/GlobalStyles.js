import { createGlobalStyle } from "styled-components";
const GlobalStyle = createGlobalStyle`
  body {
    padding: 0;
    margin: 0;
    font-family: 'Montserrat', sans-serif;
    text-transform: uppercase;
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
`

export default GlobalStyle;