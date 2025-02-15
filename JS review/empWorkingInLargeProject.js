// Get all employees across all divisions working on projects with a budget exceeding $150,000

const fs = require("fs")

const data = JSON.parse( fs.readFileSync("./organisation.json") )


function empWorkingInLargeProject(data){

    let empDetails = []

    
    for ( let division of  data["organisation"]["divisions"] ){

        for ( let department of  division["departments"] ){

            for ( let employee of department["employees"]){

                for ( let project of employee["projects"]  ){

                    if ( project["budget"] > 150000 ){

                        empDetails.push( employee["name"] )
                        break

                    }

                }

            }

        }

    }

    return empDetails

}


const result = empWorkingInLargeProject(data)


console.log(result)
console.log(result.length)

