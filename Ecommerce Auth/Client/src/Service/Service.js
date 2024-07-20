export const loginCredentials = [
    {
        label: 'Email',
        placeholder: 'test@gmail.com',
        type: 'email'
    },
    {
        label: 'Password',
        placeholder: 'Test@123',
        type: 'password'
    },
];

export const registerCredentials = [
    {
        label: 'Name',
        type: 'text'
    },
    {
        label: 'Email',
        type: 'email'
    },
    {
        label: 'Password',
        type: 'password'
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
