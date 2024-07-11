import {FC} from 'react';

const ErrorPage:FC = () => {
    return (
        <div>
            <h1>Error 404</h1>
            <p>Такой стрницы не существует</p>
            <p>Хотите вернутся на <a href="/">главную</a>главную?</p>
        </div>
    );
};

export default ErrorPage;