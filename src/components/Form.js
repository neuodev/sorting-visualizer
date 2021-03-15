import React from 'react';
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from '@material-ui/core';
import styled from 'styled-components';
const StyledDiv = styled.div`
  border: 1px;
  margin-bottom: 16px;
`;
const Form = ({ formLabel, values, labels, currentValue, onChange }) => {
  return (
    <StyledDiv className='card'>
      <FormControl>
        <FormLabel>{formLabel}</FormLabel>
        <RadioGroup value={currentValue} onChange={onChange}>
          {values.map((value, idx) => (
            <FormControlLabel
              key={`${value}_${idx}`}
              value={values[idx]}
              control={<Radio />}
              label={labels[idx]}
            />
          ))}
        </RadioGroup>
      </FormControl>
    </StyledDiv>
  );
};

export default Form;
