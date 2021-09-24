import PropTypes from "prop-types";

function User({ user, updateUser }) {
    const handleChange = () => updateUser(user.username);

    return (
        <div>
            <input
                id={user.name}
                username={user.name}
                password={user.password}
                onChange={handleChange}
            />
            <label for={user.name}>{user.name}</label>
        </div>
    );
}

User.propTypes = {
    user: PropTypes.object.isRequired,
    updateUser: PropTypes.func.isRequired,
};

export default User;