import React, { useEffect, useState } from "react";
import {
  deleteEmployee,
  listEmployees,
  updateEmployee,
} from "../services/EmployeeService";
import { useNavigate } from "react-router-dom";

const ListEmployeeComponent = () => {
  // const dummyData = [
  //     {
  //         "id": "1",
  //         "firstName": "Asad",
  //         "lastName": "Bashir",
  //         "email": "asad@gmail.com"
  //     },
  //     {
  //         "id": "2",
  //         "firstName": "Ammad",
  //         "lastName": "Choudhary",
  //         "email": "ammad@gmail.com"
  //     },
  //     {
  //         "id": "3",
  //         "firstName": "Khizer",
  //         "lastName": "Imtiaz",
  //         "email": "khizer@gmail.com"
  //     },
  //     {
  //         "id": "4",
  //         "firstName": "Osama",
  //         "lastName": "Malik",
  //         "email": "osmi@gmail.com"
  //     },
  //     {
  //         "id": "5",
  //         "firstName": "Ali",
  //         "lastName": "Hamza",
  //         "email": "ali@gmail.com"
  //     }
  // ]

  const [employees, setEmployees] = useState([]);
  const navigator = useNavigate();
  useEffect(() => {
    getAllEmployees();
  }, []);

  function getAllEmployees() {
    listEmployees()
      .then((respone) => {
        setEmployees(respone.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }
  function addNewEmployee() {
    navigator("/add-employee");
  }

  function updateEmployee(id) {
    navigator(`/edit-employee/${id}`);
  }

  function removeEmployee(id) {
    console.log(id);
    deleteEmployee(id)
      .then((respone) => {
        getAllEmployees();
      })
      .catch((error) => {
        console.error(error);
      });
  }
  return (
    <div className="container">
      <h2 className="text-center">List of Employees</h2>
      <button className="btn btn-primary mb-2" onClick={addNewEmployee}>
        Add Employee
      </button>
      <table className="table table-striped table-bordered">
        <thead>
          <tr>
            <th>Employee Id</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={employee.id}>
              <td>{employee.id}</td>
              <td>{employee.firstName}</td>
              <td>{employee.lastName}</td>
              <td>{employee.email}</td>
              <td>
                <button
                  className="btn btn-info"
                  onClick={() => updateEmployee(employee.id)}
                >
                  Update
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => removeEmployee(employee.id)}
                  style={{ marginLeft: "10px" }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListEmployeeComponent;
