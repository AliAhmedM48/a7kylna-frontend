import Navbar from '../components/Navbar';
import { Outlet } from 'react-router-dom';
import Footer from '../components/Footer';

const RootLayout = () => {
    return (
        <main className='min-h-dvh flex flex-col justify-between'>
            <Navbar />
            <div className='container mx-auto'>
                <Outlet />
            </div>
            <Footer />
        </main>
    );
};

export default RootLayout;