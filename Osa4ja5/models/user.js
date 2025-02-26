const mongo = require('mongoose')

const userSchema = mongo.Schema({
    name: String, 
    username: {
        type: String,
        required: true,
        unique: true,
        minLength: 3
    },
    passwordHash: String,
    blogs: [
        {
            type: mongo.Schema.Types.ObjectId,
            ref: 'Blog'
        }
    ]
})

userSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
      delete returnedObject.passwordHash
    }
})

const User = mongo.model('User', userSchema)

module.exports = User