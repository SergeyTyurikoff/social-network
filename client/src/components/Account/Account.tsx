import {useQuery} from "@tanstack/react-query";
import {fetchMe} from "../../api/User.ts";
import {Loader} from "../Loader";
import {AuthForm} from "../AuthForm";
import {PostForm} from "../PostForm";
import {queryClient} from "../../api/queryClient.ts";
import {UserFrame} from "../UserFrame";
import {FetchPostListView} from "../PostListView";

export const Account = () => {
    const meQuery = useQuery({
        queryFn: () => fetchMe(),
        queryKey: ["users", "me"],
        retry: false,
    }, queryClient)

    switch (meQuery.status) {
        case "pending":
            return <Loader/>;
        case "error":
            return <AuthForm/>;
        case "success":
            return (
                <>
                    <UserFrame user={meQuery.data}/>
                    <PostForm/>
                    <FetchPostListView/>
                </>
            )
    }
}