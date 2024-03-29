const express = require('express');
const router = express.Router();
const { generateClothingList } = require('./gpt.js');

// Form page
router.get('/', (req, res) => {
    res.render('form');
});

// Form submission
router.post('/', async (req, res) => {
    // Get the user input from the form
    const userInput = req.body.userInput;

    // Call the GPT method to get the list of shoes
    const clothingList = await generateClothingList(userInput);

    // Render the response page with the list of shoes
    res.render('clothingList', { shoes });
});

module.exports = router;
