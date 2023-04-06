const express = require('express');
const app = express();
const mysql = require('mysql2');
const cors = require('cors');

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
	user: 'root',
	host: 'localhost',
	password: 'ne@m1234',
	database: 'student_grade',
});

app.post('/create', (req, res) => {
	const studentNum = req.body.studentNum;
	const name = req.body.name;
	const studentClass = req.body.studentClass;
	const grade = req.body.grade;

	db.query(
		'INSERT INTO students (student_number, name, class, grade) VALUES (?,?,?,?)',
		[studentNum, name, studentClass, grade],
		(err, result) => {
			if (err) {
				console.log(err);
			} else {
				res.send('Entry inserted!');
			}
		}
	);
});

app.get('/students', (req, res) => {
	db.query('SELECT * FROM students', (err, result) => {
		if (err) {
			console.log(err);
		} else {
			res.send(result);
		}
	});
});

app.put('/update', (req, res) => {
	const id = req.body.id;
	db.query(
		'UPDATE students SET grade = ? WHERE id = ?',
		[grade, id],
		(err, result) => {
			if (err) {
				console.log(err);
			} else {
				res.send(result);
			}
		}
	);
});

app.delete('/delete/:id', (req, res) => {
	const id = req.params.id;
	db.query('DELETE FROM students WHERE id = ?', id, (err, result) => {
		if (err) {
			console.log('err');
		} else {
			res.send(result);
		}
	});
});

app.listen(3001, () => {
	console.log('server is running on port 3001!');
});
