import { useState } from 'react';
import './App.css';
import Axios from 'axios';
import Entry from './components/Entry';

function App() {
	const [studentNum, setStudentNum] = useState(0);
	const [name, setName] = useState('');
	const [studentClass, setStudentClass] = useState('');
	const [grade, setGrade] = useState('');

	const [studentList, setStudentList] = useState([]);

	const [newGrade, setNewGrade] = useState('');

	const addStudent = () => {
		Axios.post('http://localhost:3001/create', {
			studentNum: studentNum,
			name: name,
			studentClass: studentClass,
			grade: grade,
		}).then(() => {
			console.log('Success!');
			setStudentList([
				...studentList,
				{
					studentNum: studentNum,
					name: name,
					studentClass: studentClass,
					grade: grade,
				},
			]);
		});
	};

	const getStudents = () => {
		Axios.get('http://localhost:3001/students').then((response) => {
			setStudentList(response.data);
		});
	};

	const updateGrade = (id) => {
		Axios.put('http://localhost:3001/update', {
			grade: newGrade,
			id: id,
		}).then((response) => {
			alert('updated!');
			setStudentList(
				studentList.map((val) => {
					return val.id === id
						? {
								id: val.id,
								studentNum: studentNum,
								name: name,
								studentClass: studentClass,
								grade: newGrade,
						  }
						: val;
				})
			);
		});
	};

	const deleteStudent = (id) => {
		Axios.delete(`http://localhost:3001/delete/${id}`).then((response) => {
			setStudentList(
				studentList.filter((val) => {
					return val.id !== id;
				})
			);
		});
	};

	return (
		<div className='App'>
			<h1>Student Grade Tracker!</h1>
			{/* ----Static HTML---- */}
			{/* <label className='entryComponent'>Student Number: </label>
			<input
				className='entryInput'
				onChange={(e) => {
					setStudentNum(e.target.value);
				}}
			></input>
			<label className='entryComponent'>Name: </label>
			<input
				className='entryInput'
				onChange={(e) => {
					setName(e.target.value);
				}}
			/>
			<label className='entryComponent'>Class: </label>
			<input
				className='entryInput'
				onChange={(e) => {
					setStudentClass(e.target.value);
				}}
			></input>
			<label className='entryComponent'>Grade: </label>
			<input
				className='entryInput'
				onChange={(e) => {
					setGrade(e.target.value);
				}}
			></input> */}
			{/* ----Components---- */}
			<Entry
				text='Student Number'
				stateText={setStudentNum}
			/>
			<Entry
				text='Name'
				stateText={setName}
			/>
			<Entry
				text='Class'
				stateText={setStudentClass}
			/>
			<Entry
				text='Grade'
				stateText={setGrade}
			/>
			<button
				className='button'
				onClick={addStudent}
			>
				Add Student
			</button>
			<br />
			<hr />
			<button
				className='button'
				onClick={getStudents}
			>
				Show Students
			</button>
			{studentList.map((val, key) => {
				return (
					<div className='studentList'>
						<div>
							<h3>{val.studentNum}</h3>
							<h3>{val.name}</h3>
							<h3>{val.studentClass}</h3>
							<h3>{val.grade}</h3>
						</div>
						<div>
							<input
								placeholder='enter amount'
								onChange={(e) => {
									setNewGrade(e.target.value);
								}}
							/>
							<button
								onClick={() => {
									updateGrade(val.id);
								}}
							>
								Update Grade
							</button>
							<button
								onClick={() => {
									deleteStudent(val.id);
								}}
							>
								Delete
							</button>
						</div>
					</div>
				);
			})}
		</div>
	);
}

export default App;
