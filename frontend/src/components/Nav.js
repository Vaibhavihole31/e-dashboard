import React, { useEffect } from 'react';
import {Link,useNavigate} from 'react-router-dom';
import App from '../App';

const Nav=()=>{
    const auth = localStorage.getItem('user');
    const navigate = useNavigate();
    const logout =()=>{
        localStorage.clear();
        navigate('/signup')
    }
    return(
        <div>
           <img
           alt='logo'
           className='logo'
           src='https://yt3.ggpht.com/ytc/AKedOLR09bCpy_XTq2scU91URc0pWG0EqS_Yc_Zg-r9pBQ=s900-c-k-c0x00ffffff-no-rj'/>
           { auth ?  <ul className='nav-ul'>
                <li><Link to="/">Products</Link> </li>
                <li><Link to="/add">Add Products</Link> </li>
                <li><Link to="/update">Update Products</Link> </li>

                <li><Link onClick={logout} to="/signup">Logout  ({JSON.parse(auth).name}) </Link></li> 

                {/* <li>{auth ?<Link onClick={logout} to="/signup">Logout</Link> : <Link to="/Signup">Signup </Link> }</li>
                <li><Link to="/login">Login</Link> </li> */}

                {/* {
                    auth ?  <li><Link onClick={logout} to="/signup">Logout</Link></li> 
                    : <> <li> <Link to="/Signup">Signup </Link></li> <li><Link to="/login">Login</Link> </li> </>
                } */}
            </ul>
            :
            <ul className='nav-ul nav-right'>
                 <li> <Link to="/Signup">Signup </Link></li> <li><Link to="/login">Login</Link> </li>
            </ul>
            }
        </div>
    )
}

export default Nav;