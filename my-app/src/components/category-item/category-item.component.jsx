import "./category-item.style.scss";
import {Link} from "react-router-dom";

const CategoryItem = ({category}) => {
    const {title, imageUrl, route} = category;
    return (
        <Link to={route} className="category-container">
            <div
                className="background-image"
                style={{backgroundImage: `url(${imageUrl})`}}
            />
            <div className="category-body-container">
                <h2>{title}</h2>
                <p>Shop Now</p>
            </div>
        </Link>
    );
};
export default CategoryItem;
