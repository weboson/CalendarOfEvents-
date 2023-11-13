import {FC} from 'react';
import Header from '../components/Header/Header';
import Monitor from '../components/Monitor/Monitor';
import CalendarGrid from '../components/CalendarGrid/CalendarGrid';

const Home: FC = () => {
    return (
        <div>
            <Header />
            <Monitor />
            <CalendarGrid />
        </div>
    );
};

export default Home;