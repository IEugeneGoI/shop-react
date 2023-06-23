import React from "react";
import { Link } from "react-router-dom";
import ToolTipStyled from "./ToolTipStyled";

export const catArr = [
    { name: "Все", code: 0 },
    {
        name: "Игровые",
        code: 1,
    },
    {
        name: "Для\u00A0работы",
        code: 2,
    },
    {
        name: "Для\u00A0учебы",
        code: 3,
    },
    {
        name: "Для\u00A0дома",
        code: 4,
    },
];

const Categories = React.memo(({ value, onChangeCategory }) => {
    const categories = catArr.map((category) => (
        <ToolTipStyled
            enterDelay={2000}
            leaveDelay={0}
            key={category.code}
        >
            <Link to={"/" + category.code}>
                <li className={value === category.code ? "active" : ""}>
                    {category.name}
                </li>
            </Link>
        </ToolTipStyled>
    ));

    return (
        <div className="categories">
            <ul>{categories}</ul>
        </div>
    );
});

export default Categories;
