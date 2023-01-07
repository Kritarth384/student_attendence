import { useEffect, useState } from "react";
import { v4 as uuid } from "uuid";
import "./App.css";

function getStudents() {
  const data = localStorage.getItem("Students");
  if (!data) return [];
  return JSON.parse(data);
}

function getFocus() {
  const data = localStorage.getItem("Focus");
  if (!data) return true;
  return JSON.parse(data);
}

function App() {
  const [students, setStudents] = useState(getStudents());
  const [name, setName] = useState("");
  const [roll, setRoll] = useState("");
  const [focusButton, setFocusButton] = useState(getFocus());
  const [namePlaceholder, setNamePlaceholder] = useState("Enter Name");
  const [rollPlaceholder, setRollPlaceholder] = useState("Enter Roll");

  function RollNoValidation() {
    for (let i = 0; i < students.length; i++) {
      if (students[i].roll === roll) {
        setRoll("");
        setRollPlaceholder("Roll No. Already Exists");
        return true;
      }
    }
    return false;
  }

  function handleAttendance() {
    if (name === "") {
      setNamePlaceholder("Empty!!");
    }
    if (roll === "") {
      setRollPlaceholder("Empty!!");
    }
    if (name === "" || roll === "") return;
    if (name === "Empty!!" || roll === "Empty!!") return;
    if (RollNoValidation()) return;
    const date = new Date();
    setStudents((prevStudents) => [
      ...prevStudents,
      {
        id: uuid(),
        name,
        roll,
        checkIn:
          date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds(),
        checkOut: "00:00:00",
      },
    ]);

    console.log(students);
    setName("");
    setRoll("");
    setRollPlaceholder("");
    setNamePlaceholder("");
  }

  function handleStudentLeave(id) {
    const date = new Date();
    setStudents(
      students.map((student) => {
        console.log(student);
        if (student.id === id) {
          return {
            ...student,
            checkOut:
              date.getHours() +
              ":" +
              date.getMinutes() +
              ":" +
              date.getSeconds(),
          };
        } else {
          return student;
        }
      })
    );
  }

  //saving data to local storage
  useEffect(() => {
    localStorage.setItem("Students", JSON.stringify(students));
    localStorage.setItem("Focus", JSON.stringify(focusButton));
  }, [students, focusButton]);

  console.log(students);
  console.log(focusButton);

  return (
    <div>
      <div className="App absolute top-0 right-0 bottom-0 left-0 -z-10 bg-gradient-to-r from-red-500 to-red-400 flex flex-col"></div>
      <div className="flex justify-center items-center h-[100vh] flex-wrap flex-auto">
        <div className="w-[35rem] h-[45rem] bg-blue-500 mr-[6rem] flex flex-col shadow-lg z-3">
          <div className="w-full h-1/5 bg-gradient-to-r to-red-500 from-red-400 flex flex-col">
            <div className="w-full flex justify-center items-center h-1/2 text-white font-bold tracking-wider text-[1.2rem]">
              ATTENDANCE SHEET
            </div>
            <div className="flex justify-center items-center h-1/2 w-full mb-2">
              <button
                className={`flex justify-center items-center p-3 ${
                  focusButton && "bg-white bg-opacity-30"
                } rounded-[2.5rem] text-white uppercase mr-[4rem]`}
                onClick={() => setFocusButton(true)}
              >
                Present{" "}
                <div className="text-[0.7rem] flex justify-center items-center ml-2">
                  Student
                </div>
              </button>
              <button
                className={`flex justify-center items-center p-3 ${
                  !focusButton && "bg-white bg-opacity-30"
                } rounded-[2.5rem] text-white uppercase`}
                onClick={() => setFocusButton(false)}
              >
                All{" "}
                <div className="text-[0.7rem] flex justify-center items-center ml-2">
                  Student
                </div>
              </button>
            </div>
          </div>
          <div className="w-full h-4/5 bg-red-50 overflow-y-auto">
            {focusButton
              ? students.map((student) => {
                  if (student.checkOut === "00:00:00")
                    return (
                      <div
                        className="h-[6rem] bg-white shadow-md mx-2 mt-3 flex justify-center items-center rounded-[0.5rem]"
                        key={student.id}
                      >
                        <div className="h-full w-2/4  flex flex-col justify-center items-center">
                          <div className="text-[1.2rem] font-bold tracking-wide">
                            {student.name}
                          </div>
                          <div className="text-[0.8rem] text-black text-opacity-60">
                            {student.roll}
                          </div>
                        </div>
                        <div className="h-full w-1/4 flex flex-col justify-center items-center">
                          <div className="text-[1.3rem] text-red-400 font-bold tracking-wider">
                            {student.checkIn}
                          </div>
                          <div className="text-[0.8rem] text-black text-opacity-60">
                            Check In
                          </div>
                        </div>
                        <div className="h-full w-1/4 flex flex-col justify-center items-center">
                          <button
                            className="bg-gradient-to-r to-red-500 from-red-400 p-3 text-white shadow-md rounded-[0.3rem]"
                            onClick={() => handleStudentLeave(student.id)}
                          >
                            Leave
                          </button>
                        </div>
                      </div>
                    );
                })
              : students.map((student) => {
                  return (
                    <div
                      className="h-[6rem] bg-white shadow-md mx-2 mt-3 flex justify-center items-center rounded-[0.5rem]"
                      key={student.id}
                    >
                      <div className="h-full w-2/4  flex flex-col justify-center items-center">
                        <div className="text-[1.2rem] font-bold tracking-wide">
                          {student.name}
                        </div>
                        <div className="text-[0.8rem] text-black text-opacity-60">
                          {student.roll}
                        </div>
                      </div>
                      <div className="h-full w-1/4 flex flex-col justify-center items-center">
                        <div className="text-[1.3rem] text-red-400 font-bold tracking-wider">
                          {student.checkIn}
                        </div>
                        <div className="text-[0.8rem] text-black text-opacity-60">
                          Check In
                        </div>
                      </div>
                      <div className="h-full w-1/4 flex flex-col justify-center items-center">
                        {student.checkOut === "00:00:00" ? (
                          <button
                            className="bg-gradient-to-r to-red-500 from-red-400 p-3 text-white shadow-md rounded-[0.3rem]"
                            onClick={() => handleStudentLeave(student.id)}
                          >
                            Leave
                          </button>
                        ) : (
                          <div
                            key={student.id}
                            className="h-full w-1/4 flex flex-col justify-center items-center"
                          >
                            <div className="text-[1.3rem] text-sky-400 font-bold tracking-wider">
                              {student.checkOut}
                            </div>
                            <div className="text-[0.8rem] text-black text-opacity-60 w-[4rem]">
                              Check Out
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
          </div>
        </div>
        <div className=" flex justify-center items-center w-[35em] h-[30rem] shadow-lg bg-red-50 flex-col z-10 ">
          <div className="h-1/5 w-full flex flex-col justify-center items-center uppercase text-[1.2rem] font-bold tracking-wider bg-white border-t-2 border-red-400">
            <div className="text-sky-400 mt-5">Student</div>
            <div className="text-red-400 text-[1.5rem] mb-4">ATTENDANCE</div>
          </div>
          <div className="h-4/5 mt-[3rem] w-[20rem] flex flex-col ">
            <label className="flex flex-col mb-11">
              <label className="uppercase tracking-wider text-red-400 font-bold text-[1.6rem]">
                Name :
              </label>
              <input
                type="text"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="outline-none h-[2.3rem] tracking-wider font-bold p-2 text-sky-400"
                placeholder={namePlaceholder}
                required
              />
            </label>
            <label className="flex flex-col mb-5">
              <label className="uppercase tracking-wider text-red-400 font-bold text-[1.6rem]">
                Roll No :
              </label>
              <input
                type="text"
                name="name"
                value={roll}
                onChange={(e) => setRoll(e.target.value)}
                className="outline-none h-[2.3rem] tracking-wider text-sky-400 font-bold p-2 "
                placeholder={rollPlaceholder}
                required
              />
            </label>
            <button
              className="cursor-pointer bg-gradient-to-r to-red-500 from-red-400 p-3 text-white shadow-md rounded-[0.3rem]"
              onClick={handleAttendance}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
