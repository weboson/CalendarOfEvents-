// styles for WeekGrid.tsx
import styled from "styled-components";

// main block
export const GridWrapper = styled.div`
    display: block;
    background-color: #1e1f21;
    max-height: 694px;
    min-width: 1210px;
    overflow-y: scroll; 
    &::-webkit-scrollbar { // style scroll
        width: 12px;  
    }             /* ширина scrollbar */
    &::-webkit-scrollbar-track {
        background: #E6E6E6; 
        border-radius: 20px; 
           }       /* цвет дорожки */
    &::-webkit-scrollbar-thumb {
        background-color: #565759;    /* цвет плашки */
        border-radius: 20px;       /* закругления плашки */
        border: 1px solid #E6E6E6;
      }  /* padding вокруг плашки */
`
// side panel block
export const WrapperSidePanel = styled.div`
    display: block;
    float: left;
    background-color: green;
`
// Day (side panel)
export const DaySidePanel = styled.div`
    background-color: #9696e6;
    margin: 5px;
    padding: 10px 20px;
`
// Hours (side panel)
export const HoursSidePanel = styled.div`
    
`
// Item Hour
export const HourSidePanel = styled.div`
    color: white;
    background-color: orange;
    padding: 10px 20px;
    margin: 5px;
    text-align: center;
`

// Wrapper Header
export const WrapperTopPanel = styled.div`
    display: grid;
    grid-template-columns: repeat(7, 1fr); 
    border: 1px solid #23a49b;
`
// Day of Week + Date
interface IDayOfWeek {
    $currentDay: boolean
}

export const DayOfWeek = styled.div<IDayOfWeek>`
    color: #322525;
    ${(props) => (props.$currentDay) ? 'background-color: #005050;' : 'background-color: #0fff;'}
    border: 1px solid #1a2f2f;
`