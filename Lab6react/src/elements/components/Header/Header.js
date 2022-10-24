import './Header.css'
import logo from '../../resources/Logo/logo.svg'

const Header = () => {
    return(
        <header className="header">
            <div className='wrapper'>
                <img src={logo} alt='Shoe Logo' className="logo"/>
                <nav className='nav'>
                    <ul className='nav_menu'>
                        <li className='nav_item'>Home</li>
                        <li className='nav_item'>Catalog</li>
                        <li className='nav_item'>Cart</li>
                    </ul>
                </nav>
            </div>
            <div className='line'></div>
        </header>
    )
}

export default Header;