import './loadSpinner.css'
import { BarLoader } from "react-spinners";


const LoadingSpinner = ({ loading }) => {
    return(
        <div className="loading-spinner">
            <h1>Loading....</h1>
            <BarLoader className="loader" color="#36d7b7" loading={loading} size={500} height={50}/>
        </div>
    )
}

export default LoadingSpinner;