import bcrypt from 'bcryptjs'

const users = [
    {
        name: "Admin User",
        email: 'admin@example1.com',
        password: bcrypt.hashSync('12345', 10),
        isAdmin: true
    },
    {
        name: "Junaid Ali",
        email: 'admin@example2.com',
        password: bcrypt.hashSync('12345', 10),
    },
    {
        name: "Moin uddin",
        email: 'admin@example3.com',
        password: bcrypt.hashSync('12345', 10),
    },
    {
        name: "Aniss Rehman",
        email: 'admin@example4.com',
        password: bcrypt.hashSync('12345', 10),
    },
];

export default users;
