exports.regEx = async (lines) => {

  const start = async () => {
    let recipeImpact = []

    let total = {
      Land_use: 0,
      GHG: 0,
      Acid: 0,
      Eutr: 0,
      Freshwater: 0
    }

    const results = lines.map(async (line) => {
      let food = line[0].split(/\W/)[0]
      food = food.charAt(0).toUpperCase() + food.slice(1);
      let regexFood = new RegExp(`${food}\\w*`)
      let quantity = line[1] / 1000
      const loadedIngredient = await Ingredient.findOne( { 'Product': regexFood })
      if (loadedIngredient) {
        total.Land_use = total.Land_use + parseFloat(loadedIngredient.Land_use * quantity)
        total.GHG = total.GHG + parseFloat(loadedIngredient.GHG * quantity)
        total.Acid = total.Acid + parseFloat(loadedIngredient.Acid * quantity)
        total.Eutr = total.Eutr + parseFloat(loadedIngredient.Eutr * quantity)
        total.Freshwater = total.Freshwater + parseFloat(loadedIngredient.Freshwater * quantity)
        let weightedImpact = {
          _id: loadedIngredient._id,
          Product: loadedIngredient.Product,
          Land_use: loadedIngredient.Land_use * quantity,
          GHG: loadedIngredient.GHG * quantity,
          Acid: loadedIngredient.Acid * quantity,
          Eutr: loadedIngredient.Eutr * quantity,
          Freshwater: loadedIngredient.Freshwater * quantity
        }
        recipeImpact.push(weightedImpact)
        console.log(weightedImpact)
      }   
    })
    
    recipeImpact.push(total)
    console.log("1", recipeImpact)
    return recipeImpact
  }
  return start();
}
