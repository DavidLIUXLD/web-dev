const validator = require("../utils/validator");
const User = require('../model/User');
const Profile = require('../model/Profile');
const Anime = require('../model/Anime');
const config = require('config');
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

vw_register = async (ctx, next) => {
    return ctx.body = `<h1>register route</h1>`;
}

fn_register = async (ctx, next) => {
    const request = ctx.request.body;
    const result = validator.register.validate(request, {covert: false});
    const value = result.error == null;
    if(!value) {
        ctx.response.status = 400;
        return ctx.response.body = `<h1>incorrect entry of user or password, please try again</h1>`;
    }
    const {name, email, password} = request;
    try{
        let user = await User.findOne({ email });
        if(user){
            ctx.response.status = 400;
            return ctx.response.body = {status: 400, error: {msg: 'User already exists'}};
        }
        const avatar = gravatar.url(email, {
            s: '200',
            r: 'pg',
            d: 'mm'
        });

        user = new User({
            name,
            email,
            avatar,
            password
        });
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        await user.save();
        ctx.cookie.set()   
        const payload = {
            user: {
                id: user.id
            }
        }
        return ctx.response.body = {
            type: 'success',
            msg: 'login sucess',
            token: jwt.sign(payload, config.get('jwtSecret'), {expiresIn: 36000}, (err, token) => {
                if(err) throw err;
                    console.log(token);
            })
        }

    }catch(err){
        console.error(err.message);
        ctx.response.status = err.status || 500;
        ctx.response.message = err.message;

    }
};

vw_login = async (ctx, next) => {
    return ctx.body = `<h1>login route</h1>`;
}

fn_login = async (ctx, next) => {
    const request = ctx.request.body;
    const result = validator.login.validate(request, {covert: false});
    const value = result.error == null;
    if(!value) {
        ctx.response.status = 400;
        return ctx.response.body = `<h1>incorrect entry of user or password, please try again</h1>`;
    }
    const {email, password} = request;
    try{
        let user = await User.findOne({ email });
        if(!user){
            ctx.response.status = 400;
            return ctx.response.body = {error: {msg: 'invalid credential'}};
        }

        const isMarched = await bcrypt.compare(password, user.password);
        
        if(!isMarched) {
            ctx.response.status = 400;
            return ctx.response.body = {error: {msg: 'invalid credential'}};
        }

        const payload = {
            user: {
                id: user.id
            }
        }
        return ctx.body = {
            type: 'success',
            msg: 'login success',
            token: jwt.sign(payload, config.get('jwtSecret'), {expiresIn: 36000},
            (err, token) => {
                if(err) throw err;
                console.log(token);
            })
        }
    }catch(err){
        console.error(err.message);
        ctx.response.status = err.status || 500;
        ctx.response.message = err.message;

    }
};

fn_getProfile = async (ctx, next) => {
    try{
        let token = ctx.header.authorization;
        console.log(token);
        token = token.replace(/^Bearer\s+/, "");
        const payload = jwt.verify(token, config.get('jwtSecret'));
        const id = payload.user.id;
        if(!id) {
            return ctx.body = {
                type: 'error',
                msg: 'not logged in'
            }
        }
        console.log(id);
        const profile = await Profile.findOne({user: id}).populate('user',
        ['name', 'avatar']);
        if(!profile) {
            ctx.response.status = 400;
            return ctx.body = `<h1>profile not found</h1>`
        }else{
            return ctx.response.body = `<h1>welcome</h1>`
        }
    }catch(err){
        console.error(err.message);
        ctx.response.status = err.status || 500;
        ctx.response.message = err.message;

    }
}

const sessionByEmail = async (email) => {
    const filter = { email }
    return session = await User
    .find(filter)
    .select('_id uname avatar')
    .exec()
}

const sessionById = async (id) => {
    const filter = { "_id": mongoose.Types.ObjectId(id) }
    return session = await User
    .find(filter)
    .select('id uname avatar')
    .exec()
}

module.exports = {
    pageRegister: vw_register,
    register: fn_register,
    pageLogin: vw_login,
    login: fn_login,
    getProfile: fn_getProfile
}