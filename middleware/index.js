import jwt from 'jsonwebtoken'

// Verify user authenticated or not
export const verify = (req, res, next) => {
    const { token } = req.cookies
    if (!token) return res.status(403).json({ message: "Your not Authorized" })
    jwt.verify(token, process.env.SECRETE_KEY, (err, user) => {
        if (err) return res.status(403).json({ message: "Token is not valide" })
        req.user = user
        next()
    })
}

// generate token
export const generateToken = (payload) => {
    return jwt.sign(
        { id: payload.id },
        process.env.SECRETE_KEY,
        {expiresIn:process.env.EXPIRES_IN}
    )
}