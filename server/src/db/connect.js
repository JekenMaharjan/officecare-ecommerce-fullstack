import mongoose from 'mongoose'

const connect = async () => {
    const res = await mongoose.connect(process.env.MONGO_URI);

    if (res) {
        console.log("Successfully Connected to MongoDB!!");
    }  else {
        console.log("Failed to Connect to the MongoDB!!")
    }   
}

export default connect;