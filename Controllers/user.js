const db = require('../Model/user')
const bcrypt = require('bcryptjs')

module.exports = {
    addUser: async (req, res) => {
        const { username, password, role } = req.body;
        bcrypt.hash(password, 10, async (error, hashedPassword) => {
            try {
                const userExists = await db.findUser(
                    username
                )
                if(userExists.length == 0) {
                    const user = await db.addUser(
                        username, 
                        hashedPassword,
                        role
                        );
                    res.json("Created user succesfully").status(200);
                } else {
                    res.json({error: "Username already registered!"})
                }
                
            } catch (error) {
               res.json({ error: error.message });
            }
        })
    }
}