import {TailSpin} from "react-loader-spinner";
import "./loadingComponent.css";

function LoadingComponent(){
    return (
        <div className={"loading-container"}>
            <TailSpin color = "#578d2e" radius={"8px"}/>
        </div>
    )
}

export default LoadingComponent;