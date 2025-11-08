import { assets } from '@assets/assets_frontend/assets';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
    return (
        <div className="md:mx-10">
            <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm">
                {/* ****** Section : Left ******** */}
                <div>
                    <img className="mb-5 w-40" src={assets.logo} alt="Logo" />
                    <p className="w-full md:w-2/3 text-gray-600 leading-6">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Quis, numquam iusto. Repellendus vel aut praesentium
                        eos, laborum saepe est expedita esse deserunt, porro qui
                        et accusantium, illum molestiae natus? Explicabo.
                    </p>
                </div>
                {/* ****** Section : Center ******** */}
                <div>
                    <p className="text-xl font-medium mb-5 ">COMPANY</p>
                    <ul className="flex flex-col gap-2 text-gray-600">
                        <li>
                            <Link to="/">Home</Link>
                        </li>
                        <li>
                            <Link to="/about">About Us</Link>
                        </li>
                        <li>
                            <Link to="/contact">Contact Us</Link>
                        </li>
                        <li>
                            <Link to="/privacy-policy">Privacy Policy</Link>
                        </li>
                    </ul>
                </div>
                {/* ****** Section : Right ******** */}
                <div>
                    <p className="text-xl font-medium mb-5 ">GET IN TOUCH</p>
                    <ul className="flex flex-col gap-2 text-gray-600">
                        <li>+880-151-1653-3621</li>
                        <li>programmerhasan0@gmail.com</li>
                    </ul>
                </div>
            </div>
            {/* ****** Copyright Section ******** */}
            <div>
                <hr className="text-gray-600" />
                <p className="py-5 text-sm text-center">
                    Copyright 2025 &copy; Pulse Point | All Rights Reserved
                </p>
            </div>
        </div>
    );
};

export default Footer;
