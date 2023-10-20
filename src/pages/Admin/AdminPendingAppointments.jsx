const AdminPendingAppointments = () => {
  return (
    <div className="mx-4 rounded-md">
      <table className="w-full bg-white">
        <thead>
          <tr>
            <th className="py-3 px-5 border-b border-gray-200">
              Name of Visitor
            </th>
            <th className="py-3 px-5 border-b border-gray-200">
              Elder to Visit
            </th>
            <th className="py-3 px-5 border-b border-gray-200">
              Date of Appointment
            </th>
            <th className="py-3 px-5 border-b border-gray-200">Email</th>
            <th className="py-3 px-5 border-b border-gray-200">Address</th>
            <th className="py-3 px-5 border-b border-gray-200">
              Attached Photo
            </th>
            <th className="py-3 px-5 border-b border-gray-200">
              Approve/Decline
            </th>
          </tr>
        </thead>
        <tbody>
          <tr className="text-center">
            <td className="py-3 px-5">Edward Guevarra</td>
            <td className="py-3 px-5">Grandfather</td>
            <td className="py-3 px-5">August 25, 2023</td>
            <td className="py-3 px-5">edwardguevarra2003@gmail.com</td>
            <td className="py-3 px-5">#18 Marco St.</td>
            <td className="py-3 px-5">
              <img
                className="w-14 h-14 m-auto"
                src="https://unsplash.it/100/100"
                alt="placeholder"
              />
            </td>
            <td className="py-3 px-5"></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default AdminPendingAppointments;
