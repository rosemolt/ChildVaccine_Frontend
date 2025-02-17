import React from 'react';
import { NavLink } from 'react-router-dom';


const Sidebar = () => {
    return (
        <div className="sidebar">
            <h2>Admin Dashboard</h2>
            <nav>
                <ul>
                    <li>
                        <NavLink to="/" activeClassName="active">Add Vaccine</NavLink> 
                    </li>
                    {/* <li>
                        <NavLink to="viewcategory" activeClassName="active">View Ride Category</NavLink> 
                    </li>
                    <li>
                        <NavLink to="addride" activeClassName="active">Add Rides</NavLink> 
                    </li>
                    <li>
                        <NavLink to="viewride" activeClassName="active">View Rides</NavLink> 
                    </li>
                    <li>
                        <NavLink to="viewpendingstaff" activeClassName="active">View Pending Staffs</NavLink> 
                    </li>
                    <li>
                        <NavLink to="viewassignedstaff" activeClassName="active">View Assigned Staffs</NavLink> 
                    </li>
                    <li>
                        <NavLink to="addfood" activeClassName="active">Add Food</NavLink> 
                    </li>
                    <li>
                        <NavLink to="viewfood" activeClassName="active">View Food</NavLink> 
                    </li>
                    <li>
                        <NavLink to="paidbooking" activeClassName="active">Paid Customers</NavLink> 
                    </li> */}
                </ul>
            </nav>
            <style jsx>{`
            /* Sidebar styles */
            .sidebar {
                width: 250px;
                padding: 20px;
                background-color: #ffcc00; /* Bright yellow for the sidebar */
                box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.2); /* Add some shadow for depth */
                border-radius: 5px; /* Rounded corners */
            }

            /* Sidebar title styling */
            .sidebar h2 {
                margin-bottom: 20px;
                font-size: 24px; /* Larger font size */
                color: #d63384; /* Fun pink color */
                text-align: center; /* Center the title */
            }

            /* Navigation list styling */
            .sidebar nav ul {
                list-style: none;
                padding: 0;
            }

            /* Navigation item styling */
            .sidebar nav ul li {
                margin: 15px 0; /* Space out the items more */
            }

            /* Link styles */
            .sidebar nav ul li a {
                text-decoration: none;
                color: #007bff; /* Bootstrap primary blue */
                font-size: 18px; /* Slightly larger font for links */
                transition: color 0.3s ease; /* Smooth color transition */
            }

            /* Active link style */
            .sidebar nav ul li a.active {
                font-weight: bold;
                color: #ff5733; /* A contrasting color for active links */
            }

            /* Link hover effect */
            .sidebar nav ul li a:hover {
                color: #ff5733; /* Change color on hover */
            }
      `}</style>
        </div>
    );
};

export default Sidebar;
