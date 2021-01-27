import React from "react";
import styled from 'styled-components';
import { rem } from 'polished';
import { device } from "../../utils/mediaQueries/device"

const styles = {
    slate: {
        marginLeft: rem("80px"),
        marginTop: rem("32px"),
        marginRight: rem("16px"),
    [device.tablet]: {
        marginLeft: rem("128px"),
    }
    }
  };

export const Slate = styled('div')(styles.slate);