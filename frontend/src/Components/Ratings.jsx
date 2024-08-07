import {FaStar, FaStarHalfAlt, FaRegStar} from "react-icons/fa";

const getStarIcon = (value, threshold) => {
    if (value >= threshold) return <FaStar/>;
    if (value >= threshold - 0.5) return <FaStarHalfAlt/>;
    return <FaRegStar/>;
};


export default function Ratings({value, text}) {
    return <>
        <div className="rating">
            <span>
                {[1, 2, 3, 4, 5].map((threshold) => (
                    <span key={threshold}>{getStarIcon(value, threshold)}</span>
                ))}
            </span>
            {text && <span className="rating-text">{text}</span>}
        </div>
     

    </>
}
