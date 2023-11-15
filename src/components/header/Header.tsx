import { FC } from 'react';
import styled from 'styled-components';

const DivWrapper = styled('div')`
    background-color: #2A282D;
    height: 36px;
`

const Header: FC = () => {
    return (
            <DivWrapper>Header</DivWrapper>
    );
};

export default Header;