export default function AllStudents({ student, handleStudentLeave }) {
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
        <div className="text-[0.8rem] text-black text-opacity-60">Check In</div>
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
}
