import PropTypes from "prop-types";

// src imports
import User from "./User";

function UsersList({ users, password, updateUser }) {
    console.log(users);
    console.log(password);

    const filteredItems = users.filter((user) => user.type === password);
    console.log(filteredItems);

    return (
        <div>
            {password} List
            <ul>
                {filteredItems.map((user, index) => (
                    <div key={password + "-" + index}>
                        <User item={user} updateItem={updateUser} />
                    </div>
                ))}
            </ul>
        </div>
    );
}

UsersList.propTypes = {
    users: PropTypes.array.isRequired,
    password: PropTypes.string.isRequired,
    updateUser: PropTypes.func.isRequired,
};

export default UsersList;