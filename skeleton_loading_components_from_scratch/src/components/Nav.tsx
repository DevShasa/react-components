import useSWR from "swr";
import { getUsers } from "../api/usersApi";
import { User } from "../globaltypes";

type INavProps = {
	currentUserId: number;
	setCurrentUserId: React.Dispatch<React.SetStateAction<number>>
};


const Nav = (props: INavProps) => {
	const { currentUserId, setCurrentUserId } = props;



    // async function x(){
    //     const data = await fetch(`${baseUrl}${usersEdnpoint}`)
    //     const res = await data.json()
    //     return res
    // }

	const { isLoading, error, data: employees, } = useSWR("/users", getUsers);
    //console.log(`${baseUrl}${usersEdnpoint}`)
    console.log("---->",employees)

	let options;
	if (isLoading) {
		options = <option>...Loading</option>;
	} else if (!error) {
		// no error
		options = employees.map((user: User) => (
			<option key={`opt${user.id}`} value={user.id}> {user.name} </option>
		));

		const titleValue = ( <option key={"opt0"} value={0}> Employees </option> );

		options.push(titleValue);
	}

	function onChangeUser(e: React.ChangeEvent<HTMLSelectElement>) {
		setCurrentUserId(Number(e.target.value));
	}

	let content;
	if (error) {
		content = <p>{error.message}</p>;
	} else {
		content = (
			<select
				name="selectMenu"
				id="selectMenu"
				className="selectMenu"
				value={currentUserId}
				aria-label="Employee Name"
				onChange={onChangeUser}
			>
				{options}
			</select>
		);
	}

    return content
};

export default Nav