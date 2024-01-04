import {CategoriesTreeProps} from "@/components/CategoriesTree/types";
import CategoryItem from "@/components/CategoriesTree/ui/CategoryItem";
const CategoriesTree = ({categories} : CategoriesTreeProps) => {

    return (
        <>
            {categories?.map((category, index: number) => {
                return (
                    <CategoryItem category={category} key={index}/>
                )
            })}
        </>
    )
}

export default CategoriesTree;