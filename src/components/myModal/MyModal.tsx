import {FC} from 'react';

const MyModal:FC = () => {
    return (
        <div style={{color: "red", width: "100px", height: "200px", display: "block", zIndex: 3,}}>
            МОДАЛЬНОЕ ОКНО
        </div>
    );
};

export default MyModal;