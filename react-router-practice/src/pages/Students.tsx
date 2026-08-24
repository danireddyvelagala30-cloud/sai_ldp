import {
  Link,
  useSearchParams,
} from "react-router-dom";

const students = [
  {
    id: 1,
    name: "Ravi",
    course: "React",
  },
  {
    id: 2,
    name: "Priya",
    course: "Java",
  },
  {
    id: 3,
    name: "Rahul",
    course: "React",
  },
  {
    id: 4,
    name: "Anita",
    course: "Python",
  },
];

const Students = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const search = searchParams.get("search") || "";

  const handleSearch = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.value;

    setSearchParams({
      search: value,
    });
  };

  const filteredStudents = students.filter((student) =>
    student.name
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div>
      <h1>Students Page</h1>

      <input
        type="text"
        placeholder="Search student"
        value={search}
        onChange={handleSearch}
      />

      <p>
        Search value: <strong>{search}</strong>
      </p>

      {filteredStudents.length === 0 ? (
        <p>No students found.</p>
      ) : (
        <ul>
          {filteredStudents.map((student) => (
            <li key={student.id}>
              <Link to={`/students/${student.id}`}>
                {student.name}
              </Link>

              {" - "}

              {student.course}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Students;