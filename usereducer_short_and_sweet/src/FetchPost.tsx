import { useReducer } from "react";

// Initial State
type StateType = {
	loading: boolean;
	post: {
        title: string,
        body: string
    };
	error: boolean;
};
const initial_State: StateType = {
	loading: false,
	post: {
        title: "",
        body: ""
    },
	error: false,
};

// the actions that tell the reducer what to do
const POST_ACTIONS = {
	FETCH_POST_START: "FETCH_POST_START",
	FETCH_POST_SUCCESS: "FETCH_POST_SUCCESS",
	FETCH_POST_ERROR: "FETCH_POST_ERROR",
};


type ReducerAction = {
	type: keyof typeof POST_ACTIONS;
	payload: {
        title: string,
        body: string
    };
};

// the reducer which takes in action and then mutates state based on that
const postReducer = (state: StateType, action: ReducerAction): StateType => {
	switch (action.type) {
		case POST_ACTIONS.FETCH_POST_START:
			return {
				loading: true,
				post: {
                    title: "",
                    body: ""
                },
				error: false,
			};
		case POST_ACTIONS.FETCH_POST_SUCCESS:
			return {
				loading: false,
				post: action.payload,
				error: false,
			};
		case POST_ACTIONS.FETCH_POST_ERROR:
			return {
				loading: false,
				post: {
                    title: "",
                    body: ""
                },
				error: true,
			};
		default:
			return state;
	}
};

const FetchPost = () => {
	const [state, dispatch] = useReducer(postReducer, initial_State);

    const fetchPost =  async ()=>{
        dispatch({
            type:"FETCH_POST_START", 
            payload:{
                title: "",
                body: ""
            }
        })

        try {
            const res = await  fetch(`https://jsonplaceholder.typicode.com/posts/1`)
            const data = await res.json()

            if(res.status === 200){
                dispatch({
                    type: "FETCH_POST_SUCCESS",
                    payload: {
                        title: data?.title,
                        body: data?.body
                    }
                })
            }else {
                throw new Error("Something went wrong")
            }

        } catch (error) {
            console.log(error)
            dispatch({
                type: "FETCH_POST_ERROR",
                payload: {
                    title: "",
                    body: ""
                }
            })
        }
    }

	return (
        <div className="post_container">
            <div className="post_container_content">
                <button onClick={fetchPost}>{`${state.loading ? "...Loading" :"Fetch Post"}`}</button>
                {state.error && <span>Something went wrong</span>}
                {!state.error && !state.loading && state.post.body &&(
                    <div className="post_content_container">
                        <div className="post_content_border"></div>
                        <div className="post_contents">
                            <p className="post_contents_heading">{state?.post?.title}</p>
                            <p>{state?.post?.body}</p>
                        </div>

                    </div>

                )}
            </div>
        </div>
    );
};

export default FetchPost;
