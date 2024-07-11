import { Link, Head } from "@inertiajs/react"
import logo from "../../images/logo.png";

export default function Welcome({ auth }) {
    return (
        <>
            <Head title="Welcome" />
            <div className="relative sm:flex sm:justify-center sm:items-center min-h-screen bg-dots-darker bg-center bg-gray-100 dark:bg-dots-lighter dark:bg-white-900 selection:bg-red-500 selection:text-blue">
                <div>
                    {auth.user ? (
                        <Link
                            href={route("dashboard")}
                            className="font-semibold text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500"
                        >
                            Dashboard
                        </Link>
                    ) : (
                        <>
                            <img
                                src={logo}
                                alt="Logo"
                                className="  hover:animate-pulse h-44 w-auto fill-current "
                            />

                            <Link
                                href={route("login")}
                                className=" font-semibold sm:fixed sm:top-2 sm:right-44 p-6 text-end transform scale-150  text-blue-950 hover:text-gray-500 dark:text-blue-950 dark:hover:text-blue "
                            >
                                Log in
                            </Link>
                            <Link
                                href={route("register")}
                                className="font-semibold sm:fixed sm:top-2 sm:right-10 p-6 text-end transform scale-150 ms-4  text-blue-950 hover:text-gray-500 dark:text-blue-950 dark:hover:text-blue "
                            >
                                Sign up
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </>
    );
}
