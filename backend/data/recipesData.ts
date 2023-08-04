import RecipeModel from "../models/Recipe";

// Dummy data
async function insertDymmyRecipeData() {
  try {
    await RecipeModel.insertMany([
      {
        name: "Thai green curry",
        ingredients: [
          "1 butternut squash (1.2kg)",
          "groundnut oil",
          "2x 400 g tins of light coconut milk",
          "400 g leftover cooked greens, such as Brussels sprouts, Brussels tops, kale, cabbage, broccoli",
        ],
        instructions: `
        Preheat the oven to 180ºC/350ºF/gas 4.
        Wash the squash, carefully cut it in half lengthways and remove the seeds.
        Cut into 3cm chunks (skin and all) and place in a large roasting tray.
        toss with 1 tablespoon of groundnut oil and a pinch of sea salt and black pepper.
        Roast for 50 minutes, or until soft and golden.
        For the paste, toast the cumin seeds in a dry frying pan for 2 minutes, then tip into a food processor
        `,
        cookingTime: 60,
        category: "64cb38ba1c7c4a980b15baaa",
        image: "/images/thai-green-curry.jpg",
        owner: "64ccb1d6e8f3db5185f79c90",
      },
      {
        name: "Chicken tikka masala",
        ingredients: [
          "1 kg skinless boneless chicken breasts",
          "1 lemon",
          "4 cloves of garlic",
          "thumb-sized piece of ginger",
          "1 teaspoon cayenne pepper",
          "2 teaspoons garam masala",
          "2 teaspoons paprika",
          "1 x 400 g tin of chopped tomatoes",
          "2 x 400 g tins of light coconut milk",
          "1 bunch of fresh coriander (30g)",
        ],
        instructions: `
        Cut the chicken into 3cm chunks and place in a large bowl.
        Squeeze over the lemon juice, then add the garlic, ginger and spices.
        Season with salt and pepper, then mix well.
        Cover and place in the fridge to marinate for at least 1 hour, or ideally overnight.
        Heat a splash of oil in a large pan over a medium heat.
        Add the chicken and cook for 5 minutes, or until golden.
        Add the tomatoes, coconut milk and 200ml of water.
        Bring to the boil, then reduce the heat and simmer for 30 minutes, or until the chicken is cooked through.
        Season to taste, then tear in the coriander leaves just before serving.
        `,
        cookingTime: 90,
        category: "64cb38c71c7c4a980b15bab0",
        image: "/images/chicken-tikka-masala.jpg",
        owner: "64cc9e1c7cfda0365a1ec32c",
      },
      {
        name: "Stir-fried vegetables",
        ingredients: [
          "1 clove of garlic",
          "1 fresh red chilli",
          "3 spring onions",
          "1 small red onion",
          "1 handful of mangetout",
          "a few shiitake mushrooms",
        ],
        instructions: `
        Crush the garlic and finely slice the chilli and spring onion. 

        Peel and finely slice the red onion, and mix with the garlic, chilli and spring onion.
        Shred the mangetout, slice the mushrooms and water chestnuts, and mix with the shredded cabbage in a separate bowl to the onion mixture.

        Heat your wok until it’s really hot. 
        
        Add a splash of oil – it should start to smoke – then the chilli and onion mix. 
        
        Stir for just 2 seconds before adding the other mix. 
        
        Flip and toss the vegetables in the wok if you can; if you can’t, don’t worry, just keep the vegetables moving with a wooden spoon, turning them over every few seconds so they all keep feeling the heat of the bottom of the wok. Season with sea salt and black pepper.

        After a minute or two, the vegetables should have begun to soften. Add the soy sauce and 1 teaspoon of sesame oil and stir in. After about 30 seconds the vegetables should smell amazing! Tip on to a serving dish, sprinkle over some sesame seeds and tuck in
        `,
        cookingTime: 15,
        category: "64cb38961c7c4a980b15baa5",
        image: "/images/stir-fried-vegetables.jpg",
        owner: "64cc9e1c7cfda0365a1ec32c",
      },
      {
        name: "Spring rolls",
        ingredients: [
          "40 g dried Asian mushrooms",
          "50 g vermicelli noodles",
          "200 g Chinese cabbage",
          "1 carrot",
          "3 spring onions",
        ],
        instructions: `
        Put your mushrooms in a medium-sized bowl, cover with hot water and leave for 10 minutes, or until soft. 
        
        Meanwhile, place the noodles in a large bowl, cover with boiling water and leave for 1 minute. Drain, rinse under cold water, then set aside.

        For the filling, finely slice the cabbage and peel and julienne the carrot. Add these to a large bowl with the noodles.
        `,
        cookingTime: 30,
        category: "64cb38961c7c4a980b15baa5",
        image: "/images/spring-rolls.jpg",
        owner: "64ccb1d6e8f3db5185f79c91",
      },
      {
        name: "Tom Daley's sweet & sour chicken",
        ingredients: [
          "x 227 g tin of pineapple in natural juice",
          "1 x 213 g tin of peaches in natural juice",
          "1 tablespoon low-salt soy sauce",
          "1 tablespoon fish sauce",
          "2 teaspoons cornflour",
        ],
        instructions: `
        Drain the juices from the tinned fruit into a bowl, add the soy and fish sauces, then whisk in 1 teaspoon of cornflour until smooth. Chop the pineapple and peaches into bite-sized chunks and put aside.

        Pull off the chicken skin, lay it flat in a large, cold frying pan, place on a low heat and leave for a few minutes to render the fat, turning occasionally. 
        
        Once golden, remove the crispy skin to a plate, adding a pinch of sea salt and five-spice.

        Meanwhile, slice the chicken into 3cm chunks and place in a bowl with 1 heaped teaspoon of five-spice, a pinch of salt, 1 teaspoon of cornflour and half the lime juice. Peel, finely chop and add 1 clove of garlic, then toss to coat.
        `,
        cookingTime: 30,
        category: "64cb38961c7c4a980b15baa5",
        image: "/images/tom-daleys-sweet-sour-chicken.jpg",
      },
      {
        name: "Thai red chicken soup",
        ingredients: [
          "1 x 1.6 kg whole free-range chicken",
          "1 butternut squash (1.2kg)",
          "1 bunch of fresh coriander (30g)",
          "100 g Thai red curry paste",
          "1 x 400 ml tin of light coconut milk",
        ],
        instructions: `
        Sit the chicken in a large, deep pan.

        Carefully halve the squash lengthways, then cut into 3cm chunks, discarding the seeds.

        Slice the coriander stalks, add to the pan with the squash, curry paste and coconut milk, then pour in 1 litre of water. Cover and simmer on a medium heat for 1 hour 20 minutes.

        Use tongs to remove the chicken to a platter. Spoon any fat from the surface of the soup over the chicken, then sprinkle with half the coriander leaves.
        `,
        cookingTime: 90,
        category: "64cb38ba1c7c4a980b15baaa",
        image: "/images/thai-red-chicken-soup.jpg",
        owner: "64ccb1d6e8f3db5185f79c91",
      },
      {
        name: "Chicken Tikka Masala",
        ingredients: [
          "4 chicken breasts",
          "1 cup plain yogurt or Greek yogurt",
          "1 lemon",
          "4 cloves of garlic",
          "thumb-sized piece of ginger",
          "1 teaspoon cayenne pepper",
          "2 teaspoons garam masala",
          "1 teaspoon smoked paprika",
          "2 teaspoons ground cumin",
          "2 teaspoons ground coriander",
          "1 teaspoon turmeric",
          "sea salt",
          "freshly ground black pepper",
          "2 tablespoons olive oil",
          "2 onions",
          "2 fresh green chillies",
          "1 bunch of fresh coriander",
          "1 x 400 g tin of plum tomatoes",
          "1 x 400 g tin of light coconut milk",
        ],
        instructions: `
        In a bowl, whisk together all the ingredients for the marinade; add the chicken and toss to coat. Let marinate for 15 minutes to 1 hour (ideally overnight in the fridge, if time permits.)

        Warm oil in a large skillet (preferably cast iron) over medium-high heat. Once shimmering, add chicken pieces in batches, if necessary, making sure not to crowd the pan. Let them fry, untouched, for 1 minute to develop a crust, then saute until browned for about 5 more minutes. Set aside and keep warm.

        Melt the butter in the same pan. Saute the onions until soft (about 3 minutes) while scraping up any browned bits stuck on the bottom of the pan. Add ginger and garlic; sauté for 30 seconds until fragrant.

        Add in the brown sugar, coriander, cumin, paprika, garam masala, and salt. Stir occasionally for about 15 seconds until fragrant.

        Pour in the tomato sauce; let simmer gently for about 3-5 minutes, stirring occasionally until sauce thickens and becomes deeper in color.

        Stir in the cream until incorporated.

        Add the partially cooked chicken along with its juices back to the pan; cook for an additional 8-10 minutes until chicken is cooked through and the sauce is thick and bubbling. Pour in the water to thin out the sauce, only if necessary.

        Serve over cooked basmati rice, with Naan bread, and garnish with chopped cilantro.
        `,
        cookingTime: 45,
        category: "64cb38c71c7c4a980b15bab0",
        image: "/images/chicken-tikka-masala.jpg",
        owner: "64cb35441c7c4a980b15ba99",
      },
      {
        name: "Mexican Horchata",
        ingredients: [
          "1 cup long grain white rice",
          "2 cinnamon sticks",
          "2 cinnamon sticks (about 3 inches long)",
          "1 can (12 ounce) evaporated milk",
          "1 can (14 ounce) sweetened condensed milk",
          "up to 1/3 cup sugar",
          "1 tablespoon vanilla extract",
          "1/2 teaspoon ground cinnamon",
          "8 cups hot water",
          "Ice , for serving",
        ],
        instructions: `
        Put the raw rice in a blender and pulverize into a powder. Add in the hot water and cinnamon sticks. Keep the lid on and let sit on the countertop overnight (or at least 8 hours) until the water is cool and the cinnamon sticks have hydrated and softened.

        In the morning, make sure the lid is still secure and turn on the blender; blend about for 2 minutes or until the rice and cinnamon sticks are completely ground and incorporated.

        Pour and strain the mixture into a cheese cloth or very fine mesh strainer over a large pitcher. (Discard the gritty rice and cinnamon bits that has collected in the cheese cloth.)

        Add to the pitcher the evaporated milk, sweetened condensed milk, and vanilla; stir to combine. (If the consistency feels too thick, you can add in 1 more cup of cool water. I personally like it thicker, so I don’t add more water.)

        Taste and adjust the sweetness. If it needs more, add in up to 1/3 cup granulated sugar. (I always add this.)

        Now your Horchata is ready. Keep chilled until ready to serve and stir well before serving. Pour into a glass filled with ice and enjoy!
        `,
        cookingTime: 480,
        category: "64cb38d61c7c4a980b15bab5",
        image: "/images/horchata.jpg",
        owner: "64ccb1d6e8f3db5185f79c90",
      },
      {
        name: "Chocolate pots",
        ingredients: [
          "200 g dairy-free dark chocolate (at least 75% cocoa solids)",
          "700 g silken tofu",
          "160 g maple syrup",
          "1 lime , zest of",
          "1 tablespoon vanilla bean paste",
          "1 tablespoon dark rum",
          "1 large pinch of sea salt",
          "1 large pinch of dried chilli flakes",
        ],
        instructions: `
        Place a small pan over a medium-low heat, half-fill with boiling water, then place a medium heatproof bowl on top, making sure the base doesn’t touch the surface of the water. Break in the chocolate, then allow to melt, stirring occasionally.

        Meanwhile, line a medium bowl with a clean tea towel. Add the tofu, bunch up the tea towel and squeeze out the excess moisture into the bowl.

        Add the tofu to a food processor with the remaining ingredients and 1 good pinch of sea salt, then blitz for 1 to 2 minutes, or until smooth.

        Add the melted chocolate and pulse until silky and combined.

        Divide the mixture between little bowls (to make it extra special, I like to use a mixture of espresso cups and cute little glasses).

        Pop in the fridge for 15 minutes to chill, then serve.
        `,
        cookingTime: 30,
        category: "64cb38f51c7c4a980b15babf",
        image: "/images/chocolate-pots.jpg",
        owner: "64ccb1d6e8f3db5185f79c90",
      },
      {
        name: "Italian Pasta Salad",
        ingredients: [
          "12oz multi-colored fusilli pasta",
          "1 cup zesty Italian salad dressing (more as-needed to taste)",
          "1/4 cup McCormick Perfect Pinch – Salad Supreme seasoning (more as-needed)",
          "1/2 can large black olives, pitted (approx. 20 olives, sliced into 2–3 slices each)",
          "1/2 small jar green olives (approx. 20 olives, sliced into 2–3 slices each)",
          "1/2 medium cucumber, diced",
          "1 large beefsteak or 3 Roma tomatoes, diced (or 1 cup halved cherry tomatoes)",
        ],
        instructions: `
        Cook pasta al dente according to package instructions. Drain and rinse with cold water.

        Place drained pasta into medium/large mixing bowl.

        Add black olives, green olives, cucumber and tomatoes to pasta.

        Pour in dressing and 2-3 tablespoons of the seasoning and mix well.

        Taste and add more seasoning and/or dressing as needed.

        Cover and refrigerate for at least 2 hours before serving.
         `,
        cookingTime: 18,
        category: "64cb38e31c7c4a980b15baba",
        image: "/images/italian-pasta-salad.jpg",
        owner: "64ccb1d6e8f3db5185f79c90",
      },
      {
        name: "test",
        ingredients: ["test"],
        instructions: "test",
        cookingTime: 0,
        category: "64cb38e31c7c4a980b15baba",
        image: "/images/italian-pasta-salad.jpg",
        owner: "64cc9e1c7cfda0365a1ec32c",
      },
    ]);
  } catch (error) {
    console.log(error);
  }
}

export default insertDymmyRecipeData;
