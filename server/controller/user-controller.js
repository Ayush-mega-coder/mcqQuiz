import User from '../model/user.js'

export const homePage = async (request,response)=>{
    try{
        let nameObj={
            
                myName:'ayush',
                myPos:'MERN stack'
        }
        response.json(nameObj);

        
    } catch(error){
        console.log("error found",error);
        response.status(500).json({message:"server error"})
    }
}
export const signupUser = async (request, response) => {
    try {
        console.log(request.body)
        const user = { username: request.body.username, name: request.body.name, password: request.body.password };

        const newUser = new User(user);
        await newUser.save();

        return response.status(200).json({ msg: 'Signup successful' });
    } catch (error) {
        console.error('Error in signupUser:', error);
        return response.status(500).json({ msg: 'Error while signing up user' });
    }
};
