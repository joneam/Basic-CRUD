import { useState } from "react";
import "./App.css";
import Entry from "./components/Entry";

function App() {
	const [studentid, setStudentid] = useState(0);
	const [name, setName] = useState("");
	const [schClass, setSchClass] = useState("");
	const [grade, setGrade] = useState("");

	const output = () => {
		console.log(studentid + " " + name + " " + schClass + " " + grade);
	};

	return (
		<div className='App'>
			<h1>Student Grade Tracker!</h1>
			<Entry
				text='Student ID'
				stateText={setStudentid}
			/>
			<Entry
				text='Name'
				stateText={setName}
			/>
			<Entry
				text='Class'
				stateText={setSchClass}
			/>
			<Entry
				text='Grade'
				stateText={setGrade}
			/>
			<button
				className='button'
				onClick={output}
			>
				Add Student
			</button>
		</div>
	);
}

export default App;
