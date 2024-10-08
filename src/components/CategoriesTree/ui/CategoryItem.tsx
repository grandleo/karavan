import {useState} from "react";
import {CategoryItemProps} from "@/components/CategoriesTree/types";
import classes from "../categories-tree.module.css";
import {NavLink} from "@mantine/core";
import {IconFolder, IconFolderOpen} from "@tabler/icons-react";

const CategoryItem = ({category} : CategoryItemProps) => {
    const [open, setOpen] = useState(false);
    const {id, name, subcategories} = category;

    const hasChildren = Array.isArray(subcategories) && subcategories.length > 0;

    return (
        <>
            {hasChildren ?
                <>
                    <NavLink
                        label={name}
                        leftSection={open ? <IconFolderOpen size="1.5rem" stroke={1.5} /> : <IconFolder size="1.5rem" stroke={1.5} />}
                        childrenOffset={28}
                        onClick={() => setOpen(!open)}
                        className={classes.category}
                    >
                        {subcategories.map((category, index: number) => (
                            <CategoryItem category={category} key={index}/>
                        ))}
                    </NavLink>
                </>

                :

                <>
                    <NavLink
                        label={name}
                        // className={`${classes.lastCategory} ${choseCategory === id ? classes.activeCategory : ''}`}
                    />
                </>
            }
        </>
    )
}

export default CategoryItem;