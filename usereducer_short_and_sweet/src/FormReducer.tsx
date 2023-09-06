import { useReducer, useRef } from "react";

/// Initial stte
type Iistatetype = {
	title: string;
	desc: string;
	price: number;
	category: string;
	tags: string[];
	quantity: number;
};

const initialState: Iistatetype = {
	title: "",
	desc: "",
	price: 0,
	category: "",
	tags: [],
	quantity: 0,
};

// Action
const FORM_ACTIONS = {
	CHANGE_TITLE: "CHANGE_TITLE",
	CHANGE_DESCRIPTION: "CHANGE_DESCRIPTION",
	CHANGE_PRICE: "CHANGE_PRICE",
	CHANGE_CATEGORY: "CHANGE_CATEGORY",
	ADD_TAG: "ADD_TAG",
	REMOVE_TAG: "REMOVE_TAG",
	INCREASE: "INCREASE",
	DECREASE: "DECREASE",
};

type IactionType = {
	type: keyof typeof FORM_ACTIONS;
	payload?: string | number | null;
};

// the reducer which mutates the state based on the action
const formInputReducer = (
	state: Iistatetype,
	action: IactionType
): Iistatetype => {
	switch (action.type) {
		case "CHANGE_CATEGORY":
			return {
				...state,
				category: (action.payload as string) || "",
			};
		case "CHANGE_TITLE":
			return {
				...state,
				title: (action.payload as string) || "",
			};
		case "CHANGE_DESCRIPTION":
			return {
				...state,
				desc: (action.payload as string) || "",
			};
		case "CHANGE_PRICE":
			return {
				...state,
				price: (action.payload as number) || 0,
			};
		case "ADD_TAG": {
			const prev = state.tags.find(tag => tag === action.payload);
            if(prev){
                return state
            }else {
                return {
                    ...state,
                    tags: [...state.tags, action.payload as string],
                };
            }
		}

		case "REMOVE_TAG":
			return {
				...state,
				tags: state.tags.filter((tag) => tag !== action.payload),
			};
		case "INCREASE":
			return {
				...state,
				quantity: state.quantity + 1,
			};
		case "DECREASE":
			return {
				...state,
				quantity: state.quantity <= 1 ? 0 : state.quantity - 1,
			};
		default:
			return state;
	}
};

const FormReducer = () => {
	const [formState, dispatch] = useReducer(formInputReducer, initialState);
	const tagref: React.RefObject<HTMLInputElement> = useRef(null);

	const handleTags = () => {
		if (tagref.current) {
			const tags = tagref.current.value.split(",");
			tags?.forEach((tag) =>
				dispatch({
					type: "ADD_TAG",
					payload: tag,
				})
			);
			tagref.current.value = "";
		}
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		console.log(formState);
	};

	return (
		<div className="form_container">
			<form onSubmit={handleSubmit}>
				<div className="input_item">
					<input
						type="text"
						name="title"
						onChange={(e) =>
							dispatch({
								type: "CHANGE_TITLE",
								payload: e.target.value,
							})
						}
						placeholder="Title"
					/>
				</div>
				<div className="input_item">
					<input
						type="text"
						name="desc"
						onChange={(e) =>
							dispatch({
								type: "CHANGE_DESCRIPTION",
								payload: e.target.value,
							})
						}
						placeholder="Description"
					/>
				</div>
				<div className="input_item">
					<input
						type="number"
						name="price"
						onChange={(e) =>
							dispatch({
								type: "CHANGE_PRICE",
								payload: e.target.value,
							})
						}
						placeholder="Price"
					/>
				</div>
				<div className="input_item">
					<p>Category</p>
					<select
						name="category"
						id="category"
						onChange={(e) =>
							dispatch({
								type: "CHANGE_CATEGORY",
								payload: e.target.value,
							})
						}
					>
						<option value="Sneakers">Sneakers</option>
						<option value="T-Shirts">T-Shirts</option>
						<option value="Jeans">Jeans</option>
					</select>
				</div>
				<div className="input_item tag_box">
					<p>Tags</p>
					<input
						type="text"
						placeholder="Separate tags with comma ,"
						ref={tagref}
					/>
					<button onClick={handleTags}>Add Tags</button>
					<div className="span_box">
						{formState.tags.map((tag) => {
							return (
								<span
									key={tag}
									onClick={() =>
										dispatch({
											type: "REMOVE_TAG",
											payload: tag,
										})
									}
								>
									{tag}
								</span>
							);
						})}
					</div>
				</div>
				<div className="input_item quantity_box">
					<button onClick={() => dispatch({ type: "DECREASE" })}> - </button>
					<span>{`Quantity: ${formState.quantity}`}</span>
					<button onClick={() => dispatch({ type: "INCREASE" })}> + </button>
				</div>
				<div className="input_item">
					<button type="submit" className="submit_btn">
						Submit
					</button>
				</div>
			</form>
		</div>
	);
};

export default FormReducer;
