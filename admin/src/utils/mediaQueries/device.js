import { size } from "./breakPoints"; 
export const device = { 
    mobileS: `@media (min-width: ${size.mobileS})`, 
    mobileM: `@media (min-width: ${size.mobileM})`, 
    mobileL: `@media (min-width: ${size.mobileL})`, 
    // mobileLPortrait: `@media (min-width: ${size.mobileL}) and (max-height: 375px) and ((orientation: landscape))`, 
    tablet: `@media (min-width: ${size.tablet})`, 
    laptop: `@media (min-width: ${size.laptop})`, 
    laptopL: `@media (min-width: ${size.laptopL})`, 
    desktop: `@media (min-width: ${size.desktop})`, 
    desktopL: `@media (min-width: ${size.desktop})`
};