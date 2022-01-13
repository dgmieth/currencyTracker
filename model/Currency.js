//importing db connection
const db = require('./mysql')
module.exports = class Currency {
    constructor(){

    }
    /*
    ===========================================================================================================
                                            INSTANCE CLASSES
    ===========================================================================================================
    */
    static getCurrentDate(){
        return db.query(`SELECT DATE_FORMAT(NOW(),'%Y-%m-%d') as date;`)
    }
    static insertCurrencyDataInBatch(array){
        return db.query(`INSERT INTO currencies (currencydate, currency, value)
                        VALUES ?;`,[array])
    }
    static insertTodaysCurrencyData(array){
        return db.query(`INSERT INTO currencies (currencydate, currency, value)
                        VALUES ?;`,[array])
    }
    static fetchInformation(){
        return db.query(`CALL fetchInformation();`)
    }
}