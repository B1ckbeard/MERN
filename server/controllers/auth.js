import User from "../models/User.js"
import bcrypt from 'bcryptjs'

// Register user
export const register = async (req, res) => {
  try {
    const { username, password } = req.body

    const isUsed = await User.findOne({ username })

    if (isUsed) {
      return res.status(402).json({
        message: 'Данный username уже занят'
      })
    }

    const salt = bcrypt.genSaltSync(10)
    const hash = bcrypt.hashSync(password, salt)

    const newUser = new User ({
      username,
      password: hash
    })

    await newUser.save()

    res.json({
      newUser, message: 'Регистрация прошла успешно'
    })

  } catch (error) {
    res.json({message: 'Ошибка при создании пользователя'})
  }
}

// Login user
export const login = async (req, res) => {
  try {
    const { username, password } = req.body

    const user = await User.findOne({ username })
    
  } catch (error) {
    res.json({message: 'Ошибка при авторизации'})
  }
}

// Get me
export const getMe = (req, res) => {
  try {
    
  } catch (error) {
    console.log(error)
  }
}