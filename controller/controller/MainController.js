//npm modules
const axios = require('axios').default
//models
const Currency = require('../../model/Currency')
var cron = require('node-cron')
//custom constants and variables
const curArray = [`EUR`,`CAD`,`USD`]
const hours = [10,12,]
/* 
================================================================================================================
                        PAGE FUNCTIONS
================================================================================================================
*/
//render root page
exports.renderRootPage = (req,res,next) =>{
    res.render('rootPage', {})
}
/* 
================================================================================================================
                        PAGE FUNCTIONS
================================================================================================================
*/
//fetchInformation 
exports.fetchInformation = (req,res,next) =>{
    Currency.fetchInformation()
    .then(([info, infoMeta])=>{
        // console.log(info[4])
        // console.log(info[5])
        // console.log(info[6])
        // console.log(info[7])
        res.json({error: false, data:info})
    })
    .catch(err => {
        console.log('fetchInformation->',err)
        res.json({error:true})
    })
}
//node cron
cron.schedule('27 */12 8-18 * * *',()=>{
    console.log('cron')
    axios.get(`https://freecurrencyapi.net/api/v2/latest?apikey=${process.env.API_KEY}d&base_currency=${process.env.API_BASE_CUR}`)
    .then(response => {
        Currency.getCurrentDate()
        .then(([time,timeMeta])=>{
            const d = time[0].date
            var currencyData = []
            for(key in response.data.data){
                if(curArray.includes(key)){
                    currencyData.push([d,key,`${response.data.data[key]}`])
                }
            }
            Currency.insertTodaysCurrencyData(currencyData)
            .then(([answer,meta])=>{
                console.log({youReached: "cronSchedule",
                            db: "saved"})})
                return})
            .catch(err => {
                console.log('insertTodaysCurrencyData => ',err)
                console.log({youReached: "cronSchedule",
                            db: "not saved"})
                return})
        })
        .catch(err => {
            console.log('getCurrentTime-> ',error)
            console.log({youReached: "cronSchedule",
                        db: "cronNotExecuted"})
            return })
    .catch(error => {
        console.log('axios ->', error)
        console.log({youReached: "cronSchedule",
                        db: "cronNotExecuted"})
        return})
},{
    scheduled: true,
    timezone: "America/New_York"
  })
//get history of currency for database
exports.getHistory = (req,res,next) => {
    console.log(req.query)
    axios.get(`https://freecurrencyapi.net/api/v2/historical?apikey=${process.env.API_KEY}&base_currency=${process.env.API_BASE_CUR}&date_from=${req.query.startDate}&date_to=${req.query.endDate}`)
    .then(function (response) {
        // handle success
        console.log(response.data.query);
        var currencyData = []
        for(key in response.data.data){
            // console.log(key)
            for(cur in response.data.data[key]){
                // console.log(cur)
                if(curArray.includes(cur)){
                    currencyData.push([key,cur,`${response.data.data[key][cur]}`])
                }
            }
        }
        res.json({
                youReached: "getHistory",
                db: currencyData})})    
        // Currency.insertCurrencyDataInBatch(currencyData)
        // .then(([answer,meta])=>{
        //     res.json({youReached: "getHistory",
        //                 db: "saved"})})})
        .catch(err => {
            console.log('insertCurrencyDataInBatch => ',err)
            res.json({youReached: "getHistory",
                        db: "not saved"})})
      .catch(function (error) {
        // handle error
        console.log(error)
        console.log('insertCurrencyData => ',err)
            res.json({youReached: "getHistory",
                        db: "API Not called"})})
}
