const data = require("./people.js")

// Write a function to return the engineer whose age is more than 30 


function enggAgeMoreThanThirty( data ){

   return data.reduce( 
    (acc , curr) => {

      if ( curr["age"] > 30 && curr["profession"] == "Engineer"){

          acc.push( curr["name"] )


      }

      return acc
  
    } , [] 
)

}

console.log(enggAgeMoreThanThirty( data ).length )

console.log(enggAgeMoreThanThirty( data ) )