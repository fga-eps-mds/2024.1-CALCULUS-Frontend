import Link from 'next/link';
import HomeIcon from '@mui/icons-material/Home';
import CalendarViewMonthIcon from '@mui/icons-material/CalendarViewMonth';

const Siderbar = () => {
    return (
        <div className="h-screen w-80 bg-white text-black fixed shadow-lg">
            <div className="p-4">
                <ul>
                    <li className="mb-2 flex items-center p-2 hover:bg-blue-100 hover:text-purple-600 transition duration-200">
                        <CalendarViewMonthIcon className="h-5 w-5 mr-2"/>
                        <Link href="#" className="block p-2 hover:bg-blue-100 hover:text-purple-600 transition duration-200">
                            Painel de Administrador
                        </Link>
                    </li>
                    <li className="mb-2 flex items-center p-2 hover:bg-blue-100 hover:text-purple-600 transition duration-200">
                        <HomeIcon className="h-5 w-5 mr-2" />
                        <Link href="#" className="block p-2 hover:bg-blue-100 hover:text-purple-600 transition duration-200">
                            Home
                        </Link>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default Siderbar;