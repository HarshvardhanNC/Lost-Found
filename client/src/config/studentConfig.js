// NOTE: This is just for development. In production, these credentials should be stored securely in a backend database
export const studentCredentials = [
    {
        email: 'student1@example.com',
        password: 'student123'
    },
    {
        email: 'student2@example.com',
        password: 'student123'
    },
    {
        email: 'aryan@gmail.com',
        password: 'student123'
    }
];

// Helper function to check if student is registered
export const isRegisteredStudent = (email) => {
    return studentCredentials.some(student => student.email.toLowerCase() === email.toLowerCase());
};

// Helper function to verify student password
export const verifyStudentPassword = (email, password) => {
    const student = studentCredentials.find(student => student.email.toLowerCase() === email.toLowerCase());
    return student && student.password === password;
}; 