import { useSelector, useDispatch } from "react-redux";
import { addItem, selectCartItemById } from "../../redux/slices/cartSlicee";
import { Link } from "react-router-dom";
import ToolTipStyled from "../ToolTipStyled";

function NotebookBlock({ id, title, price, imageUrl }) {
    const dispatch = useDispatch();
    const cartItem = useSelector(selectCartItemById(id));

    const addedCount = cartItem ? cartItem.count : 0;

    const onClickAdd = () => {
        const item = {
            id,
            title,
            price,
            imageUrl,
        };
        dispatch(addItem(item));
    };

    return (
        <div className="notebook-block-wrapper">
            <div className="notebook-block">
                <ToolTipStyled
                    title="Клик для подробной инфо"
                    enterDelay={2000}
                    leaveDelay={0}
                    followCursor
                >
                    <Link to={`/fullItem/${id}`}>
                        <img
                            className="notebook-block__image"
                            src={imageUrl}
                            alt="notebook"
                        />
                        <h4 className="notebook-block__title">{title}</h4>
                    </Link>
                </ToolTipStyled>

                <div className="notebook-block__bottom">
                    <div className="notebook-block__price">{price} Br</div>
                    <button
                        onClick={onClickAdd}
                        className="button button--outline button--add"
                    >
                        <svg
                            width="12"
                            height="12"
                            viewBox="0 0 12 12"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
                                fill="white"
                            />
                        </svg>
                        <span>Добавить</span>
                        {addedCount > 0 && <i>{addedCount}</i>}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default NotebookBlock;
