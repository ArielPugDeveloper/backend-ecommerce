// hash_password.js
const bcrypt = require('bcryptjs');

async function hashPass() {
    const plainPassword = 'mysecretadminpassword'; 
    const hashedPassword = await bcrypt.hash(plainPassword, 10); 
    console.log('--- COPIAR ESTE HASH ---');
    console.log(hashedPassword);
    console.log('-----------------------');
}

hashPass();