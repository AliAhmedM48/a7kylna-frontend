import React from 'react'
import { Outlet } from 'react-router-dom';

function GuestLayout() {
    return (
        <main className='min-h-dvh flex flex-col justify-between items-center '>
            <div className='container mx-auto  h-dvh flex flex-col items-center justify-center'>
                <Outlet />
            </div>
        </main>
    );
}

export default GuestLayout