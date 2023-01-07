export default function CreateStudentForm({
  name,
  setName,
  roll,
  setRoll,
  namePlaceholder,
  rollPlaceholder,
  handleAttendance,
}) {
  return (
    <div>
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
  );
}
