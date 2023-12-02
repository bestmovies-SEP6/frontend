import {useLocation, Navigate, Outlet} from "react-router-dom";
import {useSelector} from "react-redux";
import {selectAccessToken} from "../../../redux/features/state/authState";


function RequireAuth() {
    const accessToken = useSelector(selectAccessToken);
    const location = useLocation();

    if (accessToken === null) {
        return <Navigate to={"/login"} state={{from: location}} replace/>
    }

    return <Outlet/>;
}

export default RequireAuth;