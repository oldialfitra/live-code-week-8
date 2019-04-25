const Apod = require('../models/apod'),
    axios = require('axios')

var instance = axios.create({
    baseURL: 'https://api.nasa.gov/planetary/apod'
});
instance.defaults.headers.common['Authorization'] = process.env.APODKEY;



class ApodController {
    static createApod(req, res) {
        Apod
            .findOne({
                date: new Date(req.body.date).toISOString().slice(0, 10)
            })
            .then(function (oneApod) {
                if (oneApod) {
                    res.status(400).json({
                        message: 'Apod already exists'
                    })
                }
                else {
                    return axios
                        .get(`https://api.nasa.gov/planetary/apod?api_key=I5mmiJcYCNhDPFizxAlJ4U1jbigj9UjTX7FvOT6X&date=${new Date(req.body.date).toISOString().slice(0, 10)}`)
                }
            })
            .then(function ({ data }) {
                return Apod.create({
                    title: data.title,
                    desc: data.explanation,
                    url: data.url,
                    mediaType: data.media_type,
                    date: data.date
                })
            })
            .then(function (newApod) {
                res.status(201).json(newApod)
            })
            .catch(function (err) {
                if (err.errors.date) {
                    res.status(400).json({
                        message: err.errors.date.message
                    })
                } else {
                    res.status(500).json(err)
                }
            })
    }

    static getAllApod(req, res) {
        Apod
            .find()
            .then(function (allApods) {
                res.status(200).json(allApods)
            })
            .catch(function (err) {
                res.status(500).json(err)
            })
    }

    static getOneApod(req, res) {
        Apod
            .findById(req.params.id)
            .then(function (oneApod) {
                res.status(200).json(oneApod)
            })
            .catch(function (err) {
                res.status(500).json(err)
            })
    }

    static deleteApod(req, res) {
        Apod
            .findByIdAndDelete(req.params.id)
            .then(function (oneApod) {
                res.status(200).json(oneApod)
            })
            .catch(function (err) {
                res.status(500).json(err)
            })
    }

    static updateApod(req, res) {
        Apod
            .findOne({
                date: new Date(req.body.date).toISOString().slice(0, 10)
            })
            .then(function (oneApod) {
                console.log('masuk ke then')
                if (oneApod) {
                    console.log('masuk ke if')
                    res.status(400).json({
                        message: 'Apod already exists'
                    })
                }
                else {
                    return axios
                        .get(`https://api.nasa.gov/planetary/apod?api_key=I5mmiJcYCNhDPFizxAlJ4U1jbigj9UjTX7FvOT6X&date=${new Date(req.body.date).toISOString().slice(0, 10)}`)
                }
            })
            .then(function ({ data }) {
                return Apod.findOneAndUpdate({_id: req.params.id},{
                    title: data.title,
                    desc: data.explanation,
                    url: data.url,
                    mediaType: data.media_type,
                    date: data.date
                })
            })
            .then(function (newApod) {
                res.status(201).json(newApod)
            })
            .catch(function (err) {
                res.status(500).json(err)
            })
    }
}

module.exports = ApodController