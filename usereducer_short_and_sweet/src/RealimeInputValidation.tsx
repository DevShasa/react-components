import React, { useReducer } from "react";

const initial_state = {
	name: {
		value: "",
		error: "",
	},
	email: {
		value: "",
		error: "",
	},
	phoneNo: {
		value: "",
		error: "",
	},
};

const FORM_ACTIONS = {
	NAME: "NAME",
	EMAIL: "EMAIL",
	PHONE: "PHONE",
};

type Initial_state_type = typeof initial_state;
type Action_Type = {
	type: keyof typeof FORM_ACTIONS;
	payload: string;
};

const validator = (input: keyof typeof FORM_ACTIONS, value: string) => {
	switch (input) {
		case "EMAIL": {
			if (value.length < 4) {
				return "Email must be more than four digits";
			} else {
				return "";
			}
		}
		case "NAME": {
			if (value.length < 4) {
				return "name must be more than four digits";
			} else {
				return "";
			}
		}
		case "PHONE": {
			//const phoneRegex = /^[0-9]+$/;
			//if(value.length < 4 && !phoneRegex.test(value)){
			if (value.length < 4) {
				return "Number should be greater than 4 and consist of only numbers 0-9";
			} else {
				return "";
			}
		}
		default:
			return "";
	}
};

const formReducer = (
	state: Initial_state_type,
	action: Action_Type
): Initial_state_type => {
	switch (action.type) {
		case "EMAIL":
			return {
				...state,
				email: {
					value: action.payload,
					error: validator(action.type, action.payload),
				},
			};
		case "NAME":
			return {
				...state,
				name: {
					value: action.payload,
					error: validator(action.type, action.payload),
				},
			};
		case "PHONE":
			return {
				...state,
				phoneNo: {
					value: action.payload,
					error: validator(action.type, action.payload),
				},
			};
		default:
			return state;
	}
};

const RealimeInputValidation = () => {
	const [formState, dispatch] = useReducer(formReducer, initial_state);

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
    console.log("USER SUBMITTED DATA:::", formState)
	};

	return (
		<div className="form_container">
			<form onSubmit={handleSubmit}>
				<div className="input_item">
          {formState.email.error && <span className="error_notification">{formState.email.error}</span>}
					<input
						type="email"
						name="email"
						onChange={(e) =>
							dispatch({
								type: "EMAIL",
								payload: e.target.value,
							})
						}
						placeholder="Email"
            className={`${formState.email.error ? "input_error" : ""}`}
					/>
				</div>
				<div className="input_item">
          {formState.name.error && <span className="error_notification">{formState.name.error}</span>}
					<input
						type="text"
						name="text"
						onChange={(e) =>
							dispatch({
								type: "NAME",
								payload: e.target.value,
							})
						}
						placeholder="Name"
            className={`${formState.name.error ? "input_error" : ""}`}
					/>
				</div>
				<div className="input_item">
          {formState.phoneNo.error && <span className="error_notification">{formState.phoneNo.error}</span>}
					<input
						type="text"
						name="phone"
						onChange={(e) =>
							dispatch({
								type: "PHONE",
								payload: e.target.value,
							})
						}
						placeholder="Phone"
            className={`${formState.phoneNo.error ? "input_error" : ""}`}
					/>
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

export default RealimeInputValidation;
