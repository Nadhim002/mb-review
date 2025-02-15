const data = require("./people.js")

function avgSalaryByProf(data){

    const salaryList =  data.reduce( 
        (acc , curr) => {

            if ( ! acc[ curr["profession"] ] ){

                acc[ curr["profession"] ] = []
            }

            acc[ curr["profession"] ].push( curr["salary"] ?? 0 )

          return acc
      
        } , {}
    )

    for( let prof in salaryList ){

        salaryList[prof] = arrayAvgCalc( salaryList[prof] )

    }

    return salaryList
}

console.log( avgSalaryByProf(data))


function arrayAvgCalc(arr){

    let sum = 0 

    arr.forEach(element => {
        sum += element  
    })

    return parseFloat((sum / arr.length).toFixed(2) )

}

