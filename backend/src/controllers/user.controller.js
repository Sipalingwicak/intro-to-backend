import User from "../models.user.models.js"

const registeredUser = async (req, res) => {
    try {
        const { username, password, email} = req.body;

        // basic validation

        if (!username || !email || !password) {
            return res.status(400).json({message: "All fields are important!"})
        }

        //check if user exist already
        const existing = await User.findOne({ email: email.toLowerCase() }) // mencek user dengan emali yang dilowercase
        if (existing) {
            return res.status(400).json({message: "user already exist!"})
        }

        //create user

        const user = await User.create({
            username, 
            email : email.toLowerCase(),
            password,
            loggedIn: false
        });

        res.status(201).json({ 
            message: "User registered",
            user: {id: user._id, email: user.email, username: user.username}
        });
    } catch (error) {
        res.statyus(500).json({message: "Internal Server Error", error: error.message})
    }
}

export {
    registeredUser
}