import React, {useContext} from "react";
import {Link, Outlet, useNavigate} from "react-router-dom";
import './navigation.styles.scss';
import {ReactComponent as CrownLogo} from "../../assets/crown.svg";
import {UserContext} from "../../context/user.context";
import {signOutUser} from "../../utils/firebase/firebase.utils";

const Navigation = () => {
    const {userState, setUserState} = useContext(UserContext);
    const navigate = useNavigate();
    const signOutHandler = async () => {
        await signOutUser();
        setUserState(null);
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
                    {userState ?
                        <span className="nav-link" onClick={signOutHandler}> Sign Out </span> :
                        <Link className="nav-link" to="/auth">
                            Sign In
                        </Link>
                    }

                </div>
            </div>
            <Outlet/>
        </>
    );
};
export default Navigation;
