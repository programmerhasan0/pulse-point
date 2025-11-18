import { assets } from '@assets/assets_frontend/assets';
import { AppContext } from '@context/contexts';
import { useContext, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

const Navbar: React.FC = () => {
    const navigate = useNavigate();
    const [showMenu, setShowMenu] = useState<boolean>(false);
    const [showProfileMenu, setShowProfileMenu] = useState<boolean>(false);
    const {
        user: { setUser, user },
        isLoggedIn: { isLoggedIn, setIsLoggedIn },
    } = useContext(AppContext);

    const logOut = () => {
        localStorage.removeItem('token');
        setIsLoggedIn(false);
        setUser(null);
    };

    return (
        <div className="flex items-center justify-between text-sm py-4 mb-5 border-b border-gray-400">
            <NavLink to="/">
                <img
                    src={assets.logo}
                    alt="logo"
                    className="w-44 cursor-pointer"
                />
            </NavLink>
            <ul className="hidden md:flex items-start gap-5 font-medium uppercase">
                <NavLink to="/">
                    <li className="py-1">Home</li>
                    <hr className="border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden" />
                </NavLink>
                <NavLink to="/doctors">
                    <li className="py-1">All Doctors</li>
                    <hr className="border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden" />
                </NavLink>
                <NavLink to="/about">
                    <li className="py-1">About</li>
                    <hr className="border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden" />
                </NavLink>
                <NavLink to="/contact">
                    <li className="py-1">Contact</li>
                    <hr className="border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden" />
                </NavLink>
            </ul>

            <div className="flex items-center gap-4">
                {isLoggedIn ? (
                    <>
                        {/* Profile Menu area started  */}
                        <div
                            className="flex items-center gap-2 cursor-pointer relative"
                            onClick={() => setShowProfileMenu((prev) => !prev)}
                        >
                            <img
                                className="w-8 rounded-full"
                                src={assets.profile_pic}
                                alt=""
                            />
                            <img
                                className="w-2.5 "
                                src={assets.dropdown_icon}
                                alt=""
                            />
                            {showProfileMenu && (
                                <div className="absolute top-0 right-0 pt-14 text-base font-medium text-gray-600 z-20">
                                    <div className="min-w-48 bg-stone-100 rounded flex flex-col gap-4 p-4">
                                        <p
                                            className="hover:text-black cursor-pointer"
                                            onClick={() =>
                                                navigate('my-profile')
                                            }
                                        >
                                            My Profile
                                        </p>
                                        <p
                                            className="hover:text-black cursor-pointer"
                                            onClick={() =>
                                                navigate('my-appointments')
                                            }
                                        >
                                            My Appointments
                                        </p>
                                        {user?.role === 'admin' && (
                                            <>
                                                <p
                                                    className="hover:text-black cursor-pointer"
                                                    onClick={() =>
                                                        navigate(
                                                            'admin/doctors'
                                                        )
                                                    }
                                                >
                                                    Doctors
                                                </p>
                                                <p
                                                    className="hover:text-black cursor-pointer"
                                                    onClick={() =>
                                                        navigate(
                                                            'admin/specialities'
                                                        )
                                                    }
                                                >
                                                    Specialities
                                                </p>
                                            </>
                                        )}
                                        <p
                                            className="hover:text-black cursor-pointer"
                                            onClick={logOut}
                                        >
                                            Logout
                                        </p>
                                    </div>
                                </div>
                            )}
                        </div>
                        {/* Profile Menu area end  */}
                    </>
                ) : (
                    <button
                        onClick={() => navigate('/login')}
                        className="bg-primary text-white px-8 py-3  rounded-full font-light hidden md:block cursor-pointer"
                    >
                        Login | Sign Up
                    </button>
                )}
                <img
                    onClick={() => setShowMenu(true)}
                    className="w-6 md:hidden"
                    src={assets.menu_icon}
                    alt=""
                />
                {/* -------- Mobile Menu -------- */}
                <div
                    className={` ${showMenu ? 'fixed w-full' : 'h-0 w-0'} md:hidden right-0 top-0 bottom-0 z-20 overflow-hidden bg-white transition-all`}
                >
                    <div className="flex items-center justify-between px-5 py-6">
                        <img src={assets.logo} alt="" className="w-36" />
                        <img
                            onClick={() => setShowMenu(false)}
                            src={assets.cross_icon}
                            alt=""
                            className="w-7"
                        />
                    </div>
                    <ul className="flex flex-col items-center gap-2 mt-5 px-5 text-lg font-medium">
                        <NavLink onClick={() => setShowMenu(false)} to="/">
                            <p className="px-4 py-2 rounded inline-block">
                                Home
                            </p>
                        </NavLink>
                        <NavLink
                            onClick={() => setShowMenu(false)}
                            to="/doctors"
                        >
                            <p className="px-4 py-2 rounded inline-block">
                                All Doctors
                            </p>
                        </NavLink>
                        <NavLink onClick={() => setShowMenu(false)} to="/about">
                            <p className="px-4 py-2 rounded inline-block">
                                About
                            </p>
                        </NavLink>
                        <NavLink
                            onClick={() => setShowMenu(false)}
                            to="/contact"
                        >
                            <p className="px-4 py-2 rounded inline-block">
                                Contact
                            </p>
                        </NavLink>

                        {isLoggedIn === false && (
                            <NavLink
                                onClick={() => setShowMenu(false)}
                                to="/login"
                            >
                                <p className="px-4 py-2 rounded inline-block">
                                    Login / Create Account
                                </p>
                            </NavLink>
                        )}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
