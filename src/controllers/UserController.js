const { hash, compare } = require('bcryptjs')
const knex = require('../database/knex')
const sqliteConnection = require('../database/sqlite')
const AppError = require('../utils/AppError')
const DiskStorage = require('../providers/DiskStorage')


class UserController {

  async create(req, res){
    const { name, email, password } = req.body

    const database = await sqliteConnection()
    const emailExists = await database.get('SELECT * FROM users WHERE email = (?)', [email])

    if(emailExists){
      throw new AppError('Este e-mail já existe.')
    }

    const hashedPassword = await hash(password, 8)

    await database.run(
      'INSERT INTO users (name, email, password) VALUES (?, ?, ?)', 
      [name, email, hashedPassword]
    )


    return res.status(201).json()
  }


  async update(req, res){

    const { name, email, password, old_password } = req.body
    const id = req.user.id

    const database = await sqliteConnection()
    const user = await database.get('SELECT * FROM users WHERE id = (?)', [id])

    if(!user){
      throw new AppError('Usuário não encontrado')
    }

    const emailAlreadyExists = await database.get('SELECT * FROM users WHERE email = (?)', [email])

    if(emailAlreadyExists && emailAlreadyExists.id !== user.id){
      throw new AppError('Este email já está em uso.')
    }

    user.name = name ?? user.name
    user.email = email ?? user.email

    if( password && !old_password ){
      throw new AppError('Necessário informar senha atual.')
    }

    if( password && old_password ){
      const checkOldPassword = await compare(old_password, user.password)

      if( !checkOldPassword ){
        throw new AppError('Senha atual não bate.')
      }

      user.password = await hash(password, 8)
    }


    await database.run(`
      UPDATE users SET
      name = ?,
      email = ?,
      password = ?,
      updated_at = DATETIME('now')
      WHERE id = ?`,
      [user.name, user.email, user.password, id]
    )

    return res.json()
  }


  async upload(req, res){
    const id = req.user.id
    const avatarFileName = req.file.filename

    const user = await knex('users').where({ id }).first()

    if(!user){
      throw new AppError('Acess denied', 401)
    }

    if(user.avatar){
      await new DiskStorage().deleteFile(user.avatar)
    }

    const fileName = await new DiskStorage().saveFile(avatarFileName)
    user.avatar = fileName

    await knex('users').update(user).where({ id })

    return res.json(user)
  }
}

module.exports = UserController