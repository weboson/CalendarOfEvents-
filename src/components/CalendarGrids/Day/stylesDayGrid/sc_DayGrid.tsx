// styles for DayGrid.tsx
import styled from "styled-components";

// Wrapper main block
export const WrapperBlock = styled.div`
    display: flex;
    flex-wrap: wrap; // обязательно для адаптива
    overflow-x: auto;
    /* justify-content:space-between; */
    background-color: #1e1f21;
    min-height: 694px;
    min-width: 1210px;

`

// Left Section
export const LeftSection = styled.div`
    background-color: green;
    /* flex:50%; */
    min-width: 605px;
    /* для адаптива */
    @media (max-width: 1210px) {
      flex: 100%;
  }
`

// Right Section
export const RightSection = styled.div`
    background-color: blue;
    /* flex:50%; */
    min-width: 605px;
    /* для адаптива */
    @media (max-width: 1210px) {
      flex: 100%;
  }
`
