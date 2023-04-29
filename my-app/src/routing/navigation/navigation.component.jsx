import React, {useContext} from "react";
import {Link, Outlet, useNavigate} from "react-router-dom";
import './navigation.styles.scss';
import {ReactComponent as CrownLogo} from "../../assets/crown.svg";
import {signOutUser} from "../../utils/firebase/firebase.utils";
import ShopIcon from "../../components/shop-icon";
import CartDropdown from "../../components/cart-dropdown";
import {CartContext} from "../../context/cart.context";
import {useDispatch, useSelector} from "react-redux";
import {signOutStart} from "../../redux/action/user/user.action";

const Navigation = () => {
    const dispatch = useDispatch();
    const currentUser = useSelector(state=> state.user.currentUser);
    const isOpen = useSelector(item => item.cart.isOpen);
    console.log(isOpen)
    // const {isOpen} = useContext(CartContext);
    const navigate = useNavigate();
    const signOutHandler = async () => {
        await dispatch(signOutStart());
        navigate("/auth");
    }
    return (
        <>
            <div className="navigation">
                <Link className="logo-container" to="/">
                    <CrownLogo className='logo'/>
                </Link>
                <div className="nav-links-container">
                    <Link className="nav-link" to="/shop">
                        Shop
                    </Link>
                    {currentUser ?
                        <span className="nav-link" onClick={signOutHandler}> Sign Out </span> :
                        <Link className="nav-link" to="/auth">
                            Sign In
                        </Link>
                    }
                    <ShopIcon/>
                </div>
                {isOpen ? <CartDropdown/> :<></>}
            </div>
            <Outlet/>
        </>
    );
};
export default Navigation;
