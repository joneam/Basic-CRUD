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
								studentNum: val.studentNum,
								name: val.name,
								studentClass: val.studentClass,
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

	const studentFields = [
		{ fieldText: 'Student Number', fieldState: { setStudentNum } },
		{ fieldText: 'Name', fieldState: { setName } },
		{ fieldText: 'Class', fieldState: { setStudentClass } },
		{ fieldText: 'Grade', fieldState: { setGrade } },
	];

	return (
		<div className='App'>
			<h1>Student Grade Tracker!</h1>
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
			{/* ---- Mapped Components ---- */}
			{/* {studentFields.map((student) => {
				return (
					<Entry
						text={studentFields.fieldText}
						stateText={studentFields.fieldState}
					/>
				);
			})} */}
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
						<table className='studentTable'>
							<tr className='tableInput'>
								<input
									placeholder='enter grade'
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
							</tr>
							<br />
							<tr>
								<th>Student Number</th>
								<th>Name</th>
								<th>Class</th>
								<th>Grade</th>
							</tr>
							<tr>
								<td>{val.student_number}</td>
								<td>{val.name}</td>
								<td>{val.class}</td>
								<td>{val.grade}</td>
							</tr>
						</table>
					</div>
				);
			})}
		</div>
	);
}

export default App;
