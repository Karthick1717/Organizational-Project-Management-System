import { useEffect, useState } from "react";
import {
  getMembers,
  createMember,
} from "../services/memberService";

const TeamMembers = () => {
  const [members, setMembers] =
    useState([]);

  const [formData, setFormData] =
    useState({
      name: "",
      email: "",
      role: "",
      department: "",
    });

  const fetchMembers =
    async () => {
      try {
        const data =
          await getMembers();

        setMembers(data);
      } catch (error) {
        console.log(error);
      }
    };

  useEffect(() => {
    fetchMembers();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });
  };

  const handleSubmit = async (
    e
  ) => {
    e.preventDefault();

    try {
      await createMember(
        formData
      );

      fetchMembers();

      setFormData({
        name: "",
        email: "",
        role: "",
        department: "",
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 p-8">

      <h1 className="text-4xl font-bold mb-6">
        Team Members
      </h1>

      {/* Create Member */}

      <div className="bg-white p-6 rounded-2xl shadow mb-8">

        <h2 className="text-xl font-bold mb-4">
          Add Team Member
        </h2>

        <form
          onSubmit={handleSubmit}
          className="grid md:grid-cols-2 gap-4"
        >

          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            className="border p-3 rounded-xl"
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="border p-3 rounded-xl"
          />

          <input
            type="text"
            name="role"
            placeholder="Role"
            value={formData.role}
            onChange={handleChange}
            className="border p-3 rounded-xl"
          />

          <input
            type="text"
            name="department"
            placeholder="Department"
            value={
              formData.department
            }
            onChange={handleChange}
            className="border p-3 rounded-xl"
          />

          <button className="bg-indigo-600 text-white p-3 rounded-xl md:col-span-2">
            Add Member
          </button>

        </form>

      </div>

      {/* Members Table */}

      <div className="bg-white p-6 rounded-2xl shadow">

        <h2 className="text-xl font-bold mb-4">
          Team List
        </h2>

        <table className="w-full">

          <thead>

            <tr className="border-b">
              <th className="text-left py-3">
                Name
              </th>

              <th className="text-left py-3">
                Email
              </th>

              <th className="text-left py-3">
                Role
              </th>

              <th className="text-left py-3">
                Department
              </th>
            </tr>

          </thead>

          <tbody>

            {members.map(
              (member) => (
                <tr
                  key={
                    member._id
                  }
                  className="border-b"
                >

                  <td className="py-3">
                    {member.name}
                  </td>

                  <td>
                    {member.email}
                  </td>

                  <td>
                    <span className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full">
                      {member.role}
                    </span>
                  </td>

                  <td>
                    {
                      member.department
                    }
                  </td>

                </tr>
              )
            )}

          </tbody>

        </table>

      </div>

    </div>
  );
};

export default TeamMembers;