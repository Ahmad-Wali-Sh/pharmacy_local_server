const syncCountryImage = require("./syncCountryImage");
const syncKindImage = require("./syncKindImage");
const syncMedicineImages = require("./syncMedicineImages");
const syncPharmGroupImage = require("./syncPharmGroupImage");


async function syncImages () {
    try {
        await syncMedicineImages().then(() => {
            console.log('medicine images downloaded succesfully!')
        })
        await syncKindImage().then(() => {
            console.log('kind images downloaded succesfully!')
        })
        await syncCountryImage().then(() => {
            console.log('Country images downloaded succesfully!')
        })
        await syncPharmGroupImage().then(() => {
            console.log('Pharm Group images downloaded succesfully!')
        })

    } catch (err) {
        console.log(err)
    }
}

module.exports = syncImages