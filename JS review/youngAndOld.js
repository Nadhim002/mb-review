const data = require("./people.js")

function youngAndOld(data){


    return data.reduce( 
     (acc , curr) => {
        
        // Check whether the proffession is there or not
        if ( !acc[ curr["profession"] ] ){
            acc[ curr["profession"] ] = {"youngesPerson" : [ curr["name"] , curr["age"] ] , "OldestAge" : [ curr["name"] , curr["age"] ] }
            return acc
        }


        // if the curr member has lesser age than thier peers
        if ( curr["age"] < acc[ curr["profession"] ]["youngesPerson"][1] ){

            acc[ curr["profession"] ]["youngesPerson"]  = [ curr["name"] , curr["age"] ]

        }


        // if the curr member has higher age than thier peers
        if ( curr["age"] > acc[ curr["profession"] ]["OldestAge"][1] ){

            acc[ curr["profession"] ]["OldestAge"]  = [ curr["name"] , curr["age"] ]

        }

        return acc
    
     } , {}
 )
 
}


console.log( youngAndOld(data) )
