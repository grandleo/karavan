import {useMemo} from "react";
import {useDispatch} from "react-redux";
import {bindActionCreators} from "redux";
import {rootActions} from "@/store/rootActions";

export const useActions = () => {
    const dispatch = useDispatch();

    return useMemo(() => bindActionCreators(rootActions, dispatch), [dispatch])
}