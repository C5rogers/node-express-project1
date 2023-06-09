const passport = require('passport')
const { Strategy } = require('passport-local')
const User = require('../database/schemas/User')
const { compareHashedPassword } = require('../utils/helpers')
passport.use(
    new Strategy({
        usernameField: "email"
    }, async(email, password, done) => {

        try {

            if (!email || !password) {
                throw Error('Bad Request. incompleate credentials')
            }

            //find the user from the database
            const userDb = await User.findOne({ email })
            if (!userDb) throw Error('User Not Found!')

            //compare the password
            const isValid = compareHashedPassword(password, userDb.password)
            if (isValid) {
                console.log("authentication successfull")
                passport.serializeUser((userDb, done) => {
                        done(null, userDb)
                    })
                    // done(null, userDb)
            } else {
                console.log("invalid authenticaion")
                done(null, null)
            }
        } catch (error) {
            console.log(error)
            done(error, null)
        }
    })
)