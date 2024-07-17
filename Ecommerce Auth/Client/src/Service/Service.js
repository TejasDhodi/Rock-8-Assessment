export const loginCredentials = [
    {
        label: 'Email',
        placeholder: 'test@gmail.com'
    },
    {
        label: 'Password',
        placeholder: 'Test@123'
    },
];

export const registerCredentials = [
    {
        label: 'Name'
    },
    {
        label: 'Email'
    },
    {
        label: 'Password'
    },
];

export const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

export const isValidPassword = (password) => {
    const lengthCheck = password.length >= 8;

    const complexityCheck = /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])/.test(password);

    return lengthCheck && complexityCheck;
};
