export const validateEmail = (email)=> {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

export const validatePhoneNumber = (phoneNumber)=> {
    const phoneRegex = /^\+[^+]+$/;
    return phoneRegex.test(phoneNumber);
};

export const validateName = (name)=> {
    return name.trim().length > 0;
};

export const validateCountry = (country) => {
    return country.trim().length > 0;
};