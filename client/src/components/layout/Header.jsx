import {
    Link
} from 'react-router-dom'
import {logo } from '../../assets';

 const Header = ()=>{
    return(
        <header
                className="w-full   sticky top-0 flex justify-between items-center bg-white z-50
            sm:px-8 px-4 py-4 border-b border-b-[#e6ebf4]"
              >
                <Link to="/">
                  <img src={logo} alt="logo" className="w-28 object-contain" />
                </Link>
              </header>
    )
}

export default Header;