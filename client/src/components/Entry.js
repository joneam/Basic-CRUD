import React from "react";

export default function Entry({ text, type, stateText }) {
	return (
		<div className='entryComponent'>
			<label>{text}: </label>
			<input
				className='entryInput'
				type={type}
				onChange={(e) => stateText(e.target.value)}
			/>
		</div>
	);
}
