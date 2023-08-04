"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Recipe_1 = __importDefault(require("../models/Recipe"));
// Dummy data
function insertDymmyRecipeData() {
    return __awaiter(this, void 0, void 0, function () {
        var error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, Recipe_1.default.insertMany([
                            {
                                name: "Thai green curry",
                                ingredients: [
                                    "1 butternut squash (1.2kg)",
                                    "groundnut oil",
                                    "2x 400 g tins of light coconut milk",
                                    "400 g leftover cooked greens, such as Brussels sprouts, Brussels tops, kale, cabbage, broccoli",
                                ],
                                instructions: "\n        Preheat the oven to 180\u00BAC/350\u00BAF/gas 4.\n        Wash the squash, carefully cut it in half lengthways and remove the seeds.\n        Cut into 3cm chunks (skin and all) and place in a large roasting tray.\n        toss with 1 tablespoon of groundnut oil and a pinch of sea salt and black pepper.\n        Roast for 50 minutes, or until soft and golden.\n        For the paste, toast the cumin seeds in a dry frying pan for 2 minutes, then tip into a food processor\n        ",
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
                                instructions: "\n        Cut the chicken into 3cm chunks and place in a large bowl.\n        Squeeze over the lemon juice, then add the garlic, ginger and spices.\n        Season with salt and pepper, then mix well.\n        Cover and place in the fridge to marinate for at least 1 hour, or ideally overnight.\n        Heat a splash of oil in a large pan over a medium heat.\n        Add the chicken and cook for 5 minutes, or until golden.\n        Add the tomatoes, coconut milk and 200ml of water.\n        Bring to the boil, then reduce the heat and simmer for 30 minutes, or until the chicken is cooked through.\n        Season to taste, then tear in the coriander leaves just before serving.\n        ",
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
                                instructions: "\n        Crush the garlic and finely slice the chilli and spring onion. \n\n        Peel and finely slice the red onion, and mix with the garlic, chilli and spring onion.\n        Shred the mangetout, slice the mushrooms and water chestnuts, and mix with the shredded cabbage in a separate bowl to the onion mixture.\n\n        Heat your wok until it\u2019s really hot. \n        \n        Add a splash of oil \u2013 it should start to smoke \u2013 then the chilli and onion mix. \n        \n        Stir for just 2 seconds before adding the other mix. \n        \n        Flip and toss the vegetables in the wok if you can; if you can\u2019t, don\u2019t worry, just keep the vegetables moving with a wooden spoon, turning them over every few seconds so they all keep feeling the heat of the bottom of the wok. Season with sea salt and black pepper.\n\n        After a minute or two, the vegetables should have begun to soften. Add the soy sauce and 1 teaspoon of sesame oil and stir in. After about 30 seconds the vegetables should smell amazing! Tip on to a serving dish, sprinkle over some sesame seeds and tuck in\n        ",
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
                                instructions: "\n        Put your mushrooms in a medium-sized bowl, cover with hot water and leave for 10 minutes, or until soft. \n        \n        Meanwhile, place the noodles in a large bowl, cover with boiling water and leave for 1 minute. Drain, rinse under cold water, then set aside.\n\n        For the filling, finely slice the cabbage and peel and julienne the carrot. Add these to a large bowl with the noodles.\n        ",
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
                                instructions: "\n        Drain the juices from the tinned fruit into a bowl, add the soy and fish sauces, then whisk in 1 teaspoon of cornflour until smooth. Chop the pineapple and peaches into bite-sized chunks and put aside.\n\n        Pull off the chicken skin, lay it flat in a large, cold frying pan, place on a low heat and leave for a few minutes to render the fat, turning occasionally. \n        \n        Once golden, remove the crispy skin to a plate, adding a pinch of sea salt and five-spice.\n\n        Meanwhile, slice the chicken into 3cm chunks and place in a bowl with 1 heaped teaspoon of five-spice, a pinch of salt, 1 teaspoon of cornflour and half the lime juice. Peel, finely chop and add 1 clove of garlic, then toss to coat.\n        ",
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
                                instructions: "\n        Sit the chicken in a large, deep pan.\n\n        Carefully halve the squash lengthways, then cut into 3cm chunks, discarding the seeds.\n\n        Slice the coriander stalks, add to the pan with the squash, curry paste and coconut milk, then pour in 1 litre of water. Cover and simmer on a medium heat for 1 hour 20 minutes.\n\n        Use tongs to remove the chicken to a platter. Spoon any fat from the surface of the soup over the chicken, then sprinkle with half the coriander leaves.\n        ",
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
                                instructions: "\n        In a bowl, whisk together all the ingredients for the marinade; add the chicken and toss to coat. Let marinate for 15 minutes to 1 hour (ideally overnight in the fridge, if time permits.)\n\n        Warm oil in a large skillet (preferably cast iron) over medium-high heat. Once shimmering, add chicken pieces in batches, if necessary, making sure not to crowd the pan. Let them fry, untouched, for 1 minute to develop a crust, then saute until browned for about 5 more minutes. Set aside and keep warm.\n\n        Melt the butter in the same pan. Saute the onions until soft (about 3 minutes) while scraping up any browned bits stuck on the bottom of the pan. Add ginger and garlic; saut\u00E9 for 30 seconds until fragrant.\n\n        Add in the brown sugar, coriander, cumin, paprika, garam masala, and salt. Stir occasionally for about 15 seconds until fragrant.\n\n        Pour in the tomato sauce; let simmer gently for about 3-5 minutes, stirring occasionally until sauce thickens and becomes deeper in color.\n\n        Stir in the cream until incorporated.\n\n        Add the partially cooked chicken along with its juices back to the pan; cook for an additional 8-10 minutes until chicken is cooked through and the sauce is thick and bubbling. Pour in the water to thin out the sauce, only if necessary.\n\n        Serve over cooked basmati rice, with Naan bread, and garnish with chopped cilantro.\n        ",
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
                                instructions: "\n        Put the raw rice in a blender and pulverize into a powder. Add in the hot water and cinnamon sticks. Keep the lid on and let sit on the countertop overnight (or at least 8 hours) until the water is cool and the cinnamon sticks have hydrated and softened.\n\n        In the morning, make sure the lid is still secure and turn on the blender; blend about for 2 minutes or until the rice and cinnamon sticks are completely ground and incorporated.\n\n        Pour and strain the mixture into a cheese cloth or very fine mesh strainer over a large pitcher. (Discard the gritty rice and cinnamon bits that has collected in the cheese cloth.)\n\n        Add to the pitcher the evaporated milk, sweetened condensed milk, and vanilla; stir to combine. (If the consistency feels too thick, you can add in 1 more cup of cool water. I personally like it thicker, so I don\u2019t add more water.)\n\n        Taste and adjust the sweetness. If it needs more, add in up to 1/3 cup granulated sugar. (I always add this.)\n\n        Now your Horchata is ready. Keep chilled until ready to serve and stir well before serving. Pour into a glass filled with ice and enjoy!\n        ",
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
                                instructions: "\n        Place a small pan over a medium-low heat, half-fill with boiling water, then place a medium heatproof bowl on top, making sure the base doesn\u2019t touch the surface of the water. Break in the chocolate, then allow to melt, stirring occasionally.\n\n        Meanwhile, line a medium bowl with a clean tea towel. Add the tofu, bunch up the tea towel and squeeze out the excess moisture into the bowl.\n\n        Add the tofu to a food processor with the remaining ingredients and 1 good pinch of sea salt, then blitz for 1 to 2 minutes, or until smooth.\n\n        Add the melted chocolate and pulse until silky and combined.\n\n        Divide the mixture between little bowls (to make it extra special, I like to use a mixture of espresso cups and cute little glasses).\n\n        Pop in the fridge for 15 minutes to chill, then serve.\n        ",
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
                                instructions: "\n        Cook pasta al dente according to package instructions. Drain and rinse with cold water.\n\n        Place drained pasta into medium/large mixing bowl.\n\n        Add black olives, green olives, cucumber and tomatoes to pasta.\n\n        Pour in dressing and 2-3 tablespoons of the seasoning and mix well.\n\n        Taste and add more seasoning and/or dressing as needed.\n\n        Cover and refrigerate for at least 2 hours before serving.\n         ",
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
                        ])];
                case 1:
                    _a.sent();
                    return [3 /*break*/, 3];
                case 2:
                    error_1 = _a.sent();
                    console.log(error_1);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.default = insertDymmyRecipeData;
