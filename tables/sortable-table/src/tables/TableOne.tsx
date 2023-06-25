import { MouseEventHandler, useCallback, useState } from "react";
import data from "../data.json";

type Data = typeof data;
type SortKeys = keyof Data[0];
type SortOrder = "ascn" | "desc";

function sortData({tableData,sortKey, reverse, }: { tableData: Data;sortKey: SortKeys;reverse: boolean;}) {
    // this is where the majoc happens
	if (!sortKey) {
		return tableData;
	}

	const sortedData = data.sort((a, b) => {
		return a[sortKey] > b[sortKey] ? 1 : -1;
	});

	if (reverse) {
		return sortedData.reverse();
	}

	return sortedData;
}


function SortButton({sortOrder, columnKey, sortKey, onClick}:{sortOrder:SortOrder, columnKey: SortKeys, sortKey:SortKeys, onClick:MouseEventHandler<HTMLButtonElement>}){
    return(
        <button
            onClick={onClick}
            className={`${sortKey === columnKey && sortOrder === "desc"
                            ? "sort-button sort-reverse"
                            :"sort-button"
                        }`} 
        >
            ▲
        </button>
    )
}

function Table() {
	const [sortKey, setSortKey] = useState<SortKeys>("id");
	const [sortOrder, setSortOrder] = useState<SortOrder>("ascn");

	const sortedData = useCallback(() => {
		return sortData({
			tableData: data,
			sortKey,
			reverse: sortOrder === "desc",
		});
	}, [sortKey, sortOrder]);

    const changeSort =(key:SortKeys) =>{
        // this will be the onclick function
        // this changes the state after which the usecallback recomputes the table 
        setSortOrder(sortOrder === "ascn" ? "desc" :"ascn")
        setSortKey(key)

        console.log("SORTING BY--->", key, sortOrder)
    }

	const headers = [
		{ key: "id", label: "ID" },
		{ key: "first_name", label: "First Name" },
		{ key: "last_name", label: "Last Name" },
		{ key: "email", label: "Email" },
		{ key: "gender", label: "Gender" },
		{ key: "ip_address", label: "Ip Address" },
	];

	return (
		<>
			<table>
				<thead>
					<tr>
						{headers.map((row) => {
							return (
                                <td key={row.key}>
                                    {row.label}
                                    <SortButton 
                                        columnKey={row.key as SortKeys} 
                                        onClick={()=>changeSort(row.key as SortKeys)}
                                        sortKey={sortKey}
                                        sortOrder={sortOrder}
                                    />
                                </td>
                            );
						})}
					</tr>
				</thead>
				<tbody>
					{sortedData().map((person) => {
						return (
							<tr key={person.id}>
								<td>{person.id}</td>
								<td>{person.first_name}</td>
								<td>{person.last_name}</td>
								<td>{person.email}</td>
								<td>{person.gender}</td>
								<td>{person.ip_address}</td>
							</tr>
						);
					})}
				</tbody>
			</table>
		</>
	);
}

export default Table;
