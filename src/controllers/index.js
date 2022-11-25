const express = require('express');
const axios = require('axios')

const router = express.Router();

const URL_SERVICE = process.env.SERVICE_URL

router.get('/', (req, res) => {
    return res.send('ok')
})

router.get('/paradas-proximas', async (req, res) => {
  try {
    const { latitude, longitude } = req.query

    const { data } = await axios.get(`${URL_SERVICE}/buscarParadasProximas/${longitude}/${latitude}/0/retornoJSON`)

    const dataJson = JSON.parse(data.slice("retornoJSON".length+1, -1))

    return res.status(200).json(dataJson.paradas)
  } catch (error) {
    console.log(error)
    return res.status(500).json({error: 'Houve algum erro.'})
  }
})

router.get('/linhas-parada', async (req, res) => {
  try {
    const { codParada } = req.query

    const { data } = await axios.get(`${URL_SERVICE}/retornaLinhasQueAtendemParada/${codParada}/0/retornoJSON`)

    const dataJson = JSON.parse(data.slice("retornoJSON".length+1, -1))

    return res.status(200).json(dataJson.linhas)
  } catch (error) {
    console.log(error)
    return res.status(500).json({error: 'Houve algum erro.'})
  }
})

router.get('/previsoes-parada', async (req, res) => {
  try {
    const { codParada } = req.query

    const { data } = await axios.get(`${URL_SERVICE}/buscarPrevisoes/${codParada}/0/retornoJSON`)

    const dataJson = JSON.parse(data.slice("retornoJSON".length+1, -1))

    return res.status(200).json(dataJson.previsoes)
  } catch (error) {
    console.log(error)
    return res.status(500).json({error: 'Houve algum erro.'})
  }
})

router.get('/coordenadas-intinerario', async (req, res) => {
  try {
    const { codItinerario } = req.query

    const { data } = await axios.get(`${URL_SERVICE}/buscarItinerario/${codItinerario}/0/retornoJSONItinerario`)

    const dataJson = JSON.parse(data.slice("retornoJSONItinerario".length+1, -1))

    return res.status(200).json(dataJson.itinerarios)
  } catch (error) {
    console.log(error)
    return res.status(500).json({error: 'Houve algum erro.'})
  }
})

router.get('/coordenadas-onibus', async (req, res) => {
  try {
    const { codItinerario } = req.query

    const { data } = await axios.get(`${URL_SERVICE}/retornaVeiculosMapa/${codItinerario}/0/retornoJSONVeiculos`)

    const dataJson = JSON.parse(data.slice("retornoJSONVeiculos".length+1, -1))

    return res.status(200).json(dataJson.veiculos)
  } catch (error) {
    console.log(error)
    return res.status(500).json({error: 'Houve algum erro.'})
  }
})

module.exports = router