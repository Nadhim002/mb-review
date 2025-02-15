const data = require("./people.js")

function groupOnProfeession(data){
    return data.reduce( 
        (acc , curr) => {

            if ( ! acc[ curr["profession"] ] ){

                acc[ curr["profession"] ] = []
            }

            acc[ curr["profession"] ].push( curr["name"] )

          return acc
      
        } , {}
    )

}

console.log( groupOnProfeession(data) )