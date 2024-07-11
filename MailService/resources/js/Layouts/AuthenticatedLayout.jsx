import { useState } from 'react';
import Dropdown from '@/Components/Dropdown';
import NavLink from '@/Components/NavLink';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import { Link } from '@inertiajs/react';
import logo from "../../images/logo.png";

export default function Authenticated({ user, header, children, currentRoute }) {
    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);

    return (
        <div className="min-h-screen bg-gray-100">
            <nav className="bg-white border-b border-gray-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-24">
                        <div className="flex">
                            <div className="shrink-0 flex items-center">
                            <img
                                    src={logo}
                                    alt="Logo"
                                    className="  hover:scale-125 block h-20 w-auto fill-current text-gray-800"
                                />
                            </div>

                            <div className="hidden space-x-8 sm:-my-px sm:ms-10 sm:flex">
                                <NavLink href={route('dashboard')} active={route().current('dashboard')}>
                                    MailService
                                </NavLink>
                            </div>
                        </div>

                        <div className="hidden sm:flex sm:items-center sm:ms-6">
                            <div className="ms-3 relative">
                                <Dropdown >
                                    <Dropdown.Trigger>
                                        <span className="inline-flex rounded-md">
                                            <button
                                                type="button"
                                                className="inline-flex items-center px-3 py-2 border border-transparent text-lg leading-4 font-medium rounded-md text-gray-500 bg-white hover:text-gray-700 focus:outline-none transition ease-in-out duration-150"
                                            >
                                                {user.name}

                                                <svg
                                                    className="ms-2 -me-0.5 h-4 w-4"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 20 20"
                                                    fill="currentColor"
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                        clipRule="evenodd"
                                                    />
                                                </svg>
                                            </button>
                                        </span>
                                    </Dropdown.Trigger>

                                    <Dropdown.Content>
                                        <Dropdown.Link href={route('profile.edit')}>Profile</Dropdown.Link>
                                        <Dropdown.Link href={route('logout')} method="post" as="button">
                                            Log Out
                                        </Dropdown.Link>
                                    </Dropdown.Content>
                                </Dropdown>
                            </div>
                        </div>

                        <div className="-me-2 flex items-center sm:hidden">
                            <button
                                onClick={() => setShowingNavigationDropdown((previousState) => !previousState)}
                                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-500 transition duration-150 ease-in-out"
                            >
                                <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                                    <path
                                        className={!showingNavigationDropdown ? 'inline-flex' : 'hidden'}
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                    <path
                                        className={showingNavigationDropdown ? 'inline-flex' : 'hidden'}
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                <div className={(showingNavigationDropdown ? 'block' : 'hidden') + ' sm:hidden'}>
                    <div className="pt-2 pb-3 space-y-1">
                        <ResponsiveNavLink href={route('dashboard')} active={route().current('dashboard')}>
                            Dashboard
                        </ResponsiveNavLink>
                    </div>

                    <div className="pt-4 pb-1 border-t border-gray-200">
                        <div className="px-4">
                            <div className="font-medium text-base text-gray-800">{user.name}</div>
                            <div className="font-medium text-sm text-gray-500">{user.email}</div>
                        </div>

                        <div className="mt-3 space-y-1">
                            <ResponsiveNavLink href={route('profile.edit')}>Profile</ResponsiveNavLink>
                            <ResponsiveNavLink method="post" href={route('logout')} as="button">
                                Log Out
                            </ResponsiveNavLink>
                        </div>
                    </div>
                </div>
            </nav>

            {header && (
                <header className="bg-white shadow">
                    <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">{header}</div>
                </header>
            )}

                    <nav className="bg-white p-4 rounded-lg shadow-md ">
                            <ul className="flex space-x-8 items-center justify-center">
                                
                                
                          
                                <li className=' rounded-lg p-2'>
                                   <form action="/inbox" method="GET"> <button className={`${currentRoute === 'inbox' ? 'animate-pulse font-bold bg-gray-100 shadow rounded-lg p-1' : 'font-semibold'} hover:text-gray-600 hover:scale-110 text-gray-900 `}>Inbox</button></form>
                                </li>

                                <li className=' rounded-lg p-2'>
                                   <form action="/sent" method="GET"> <button className={`${currentRoute === 'sent' ? 'animate-pulse font-bold bg-gray-100 shadow rounded-lg p-1' : 'font-semibold'} hover:text-gray-600 hover:scale-110 text-gray-900 `}>Sent</button></form>
                                </li>

                                <li className=' rounded-lg p-2'>
                                   <form action="/junk" method="GET"> <button className={`${currentRoute === 'junk' ? 'animate-pulse font-bold bg-gray-100 shadow rounded-lg p-1' : 'font-semibold'} hover:text-gray-600 hover:scale-110 text-gray-900 `}>Junk</button></form>
                                </li>

                                <li className=' rounded-lg p-2 '>
                                   <form action="/trash" method="GET"> <button className={`${currentRoute === 'trash' ? 'animate-pulse font-bold bg-gray-100 shadow rounded-lg p-1' : 'font-semibold'} hover:text-gray-600 hover:scale-110 text-gray-900 `}>Trash</button></form>
                                </li>

                                <li className='bg-green-300 rounded-lg p-2 hover:scale-110'>
                                   <form action="/newmail" method="GET"> <button className=
                                   {`${currentRoute === 'newmail' ? 'animate-pulse text-lg font-extrabold' : 'font-semibold'} hover:text-gray-600 text-gray-900 `}>New mail</button></form>
                                </li>
                            </ul>
                        </nav>

            <main>{children}</main>
        </div>
    );
}
