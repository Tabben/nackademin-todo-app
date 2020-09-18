const db = require('../Model/user')
const todo = require('../Model/toDo')
const bcrypt = require('bcryptjs')

module.exports = {
    register: async (req, res) => {
        const { username, password, role } = req.body;
        bcrypt.hash(password, 10, async (error, hashedPassword) => {
            try {
                const userExists = await db.findUser(
                    username
                )
                if(!userExists) {
                    const user = await db.addUser(
                        username, 
                        hashedPassword,
                        role
                        );
                    res.json({msg: "Created user succesfully", user: user}).status(200);
                } else {
                    res.json({error: "Username already registered!"})
                }
                
            } catch (error) {
               res.json({ error: error.message });
            }
        })
    },
    login: async (req, res) => {
        const { username, password } = req.body;
        try {
            const user = await db.login(username, password)
            res.json(user)

        } catch (error) {
            res.json({msg: error})
        }   
    },
    delete: async(req, res) => {
    
        const user = req.user._id
       
        try {
            const userExists = await db.findUserById(user)
            
            if(userExists) {
                
                await db.deleteUser(user);
              
                await todo.deleteUserData(user)
              
                res.json({msg: 'User has been deleted'}).status(200);
            } else {
                res.json({error: "User doesn't exist"})
            }
        } catch (error) {
            
        }
    }
}