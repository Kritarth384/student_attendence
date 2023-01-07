import { useEffect, useState } from "react";
import { v4 as uuid } from "uuid";
import "./App.css";
import AllStudents from "./components/AllStudent";
import CreateStudentForm from "./components/createStudentForm";
import PresentStudent from "./components/PresentStudent";

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

    setName("");
    setRoll("");
    setRollPlaceholder("");
    setNamePlaceholder("");
  }

  function handleStudentLeave(id) {
    const date = new Date();
    setStudents(
      students.map((student) => {
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
            {focusButton ? (
              students.filter((e) => e.checkOut === "00:00:00").length !== 0 ? (
                students.map((student) => {
                  if (student.checkOut === "00:00:00")
                    return (
                      <PresentStudent
                        student={student}
                        handleStudentLeave={handleStudentLeave}
                      />
                    );
                })
              ) : (
                <div className="flex justify-center items-center h-full text-[2rem] font-bold text-red-400 tracking-wider">
                  No Data Available !!
                </div>
              )
            ) : students.length !== 0 ? (
              students.map((student) => {
                return (
                  <AllStudents
                    student={student}
                    handleStudentLeave={handleStudentLeave}
                  />
                );
              })
            ) : (
              <div className="flex justify-center items-center h-full text-[2rem] font-bold text-red-400 tracking-wider">
                No Data Available !!
              </div>
            )}
          </div>
        </div>
        <CreateStudentForm
          name={name}
          setName={setName}
          roll={roll}
          setRoll={setRoll}
          namePlaceholder={namePlaceholder}
          rollPlaceholder={rollPlaceholder}
          handleAttendance={handleAttendance}
        />
      </div>
    </div>
  );
}

export default App;
