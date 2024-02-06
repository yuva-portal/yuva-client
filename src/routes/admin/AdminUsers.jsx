import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

import Loader from "../../components/common/Loader";

import { SERVER_ORIGIN, validation } from "../../utilities/constants";
import HeaderCard from "../../components/common/HeaderCard";
// import { refreshScreen } from "../../utilities/helper_functions";

import css from "../../css/admin/users-page.module.css";

// localhost:800/users/all?page=1&limit=10&search=abhishek&sortBy=fName&sortType=desc

function capitalizeFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.substr(1);
}

const AdminUsers = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [allUsers, setAllUsers] = useState([]);
    const [page, setPage] = useState(1);
    const [sortType, setSortType] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const [totalPages, setTotalPages] = useState(0);

    const navigate = useNavigate();

    const increment = () => {
        if (page < totalPages) setPage((prev) => prev + 1);
    };

    const decrement = () => {
        if (page > 1) {
            setPage((prev) => prev - 1);
        }
    };

    useEffect(() => {
        async function getAllUsers() {
            setIsLoading(true);

            try {
                const adminId = process.env.REACT_APP_ADMIN_ID;
                const adminPassword = process.env.REACT_APP_ADMIN_PASSWORD;
                const basicAuth = btoa(`${adminId}:${adminPassword}`);
                const response = await fetch(
                    `${SERVER_ORIGIN}/api/admin/auth/users/all?page=${page}&limit=20&search=${searchQuery}&sortBy=fName&sortType=${
                        sortType === true ? "asc" : "desc"
                    }`,
                    {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Basic ${basicAuth}`, // Include Basic Authentication
                            "auth-token": localStorage.getItem("token"),
                        },
                    }
                );

                const result = await response.json();
                console.log(result);

                setIsLoading(false);

                if (response.status >= 400 && response.status < 600) {
                    if (response.status === 401) {
                        navigate("/admin/login");
                    } else if (response.status === 500) {
                        toast.error(result.statusText);
                    }
                } else if (response.ok && response.status === 200) {
                    setAllUsers(result.filteredUsers);
                    setTotalPages(result.totalPages);
                } else {
                    // for future
                }
            } catch (err) {
                // console.log(err.message);
                setIsLoading(false);
            }
        }

        getAllUsers();
    }, [page, sortType, searchQuery, navigate]);

    return (
        <div className={css.outerDiv}>
            <HeaderCard>
                <h1 className="headerTitle">Users</h1>

                <hr />
                <p className="headerSubtitle">
                    You can View/Add/Delete users from here
                </p>
                <p className="headerSubtitle">
                    Note: Deleting a user is irreversible. Do it at your own
                    risk.
                </p>
            </HeaderCard>
            <div className={css.filterBtns}>
                <button
                    className={css.sortTypeBtn}
                    onClick={() => setSortType(!sortType)}
                >
                    Sort Type - ({sortType ? "Ascending" : "Descending"})
                </button>
                <div>
                    <input
                        type="text"
                        value={searchQuery} placeholder="Search First Name"
                        onChange={(e) => {
                            setSearchQuery(e.target.value);
                            setPage(1);
                        }}
                        className={css.searchInput}
                    />
                    <button className={css.searchBtn}>Search</button>
                </div>
            </div>
            {isLoading ? (
                <Loader />
            ) : (
                <div>
                    <table>
                        <thead>
                            <tr>
                                <th>Sr no.</th>
                                <th>Full Name</th>
                                <th>Email</th>
                                <th>Mobile no.</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {allUsers?.map((user, idx) => (
                                <tr key={user._id}>
                                    <td>
                                        {page === 1
                                            ? idx + 1
                                            : idx + 1 + page * 20}
                                    </td>
                                    <td>
                                        {capitalizeFirstLetter(user.fName)}{" "}
                                        {capitalizeFirstLetter(user.lName)}
                                    </td>
                                    <td>{user.email}</td>
                                    <td>{user.phone}</td>
                                    <td>
                                        <button
                                            className={css.viewBtn}
                                            onClick={() =>
                                                navigate(
                                                    `/admin/users/${user.userId}`
                                                )
                                            }
                                        >
                                            View Details
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className={css.paginationBtns}>
                        <button
                            className={css.prevBtn}
                            onClick={() => decrement()}
                        >
                            Prev
                        </button>
                        <span>
                            Page: {page} of {totalPages}
                        </span>
                        <button
                            className={css.nextBtn}
                            onClick={() => increment()}
                        >
                            Next
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminUsers;
