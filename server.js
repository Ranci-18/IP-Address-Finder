const express = require('express');
const axios = require('axios');
const app = express();
const PORT = process.env.PORT || 8080;

// proxy route and request to the API
app.get('/api/data:ip', async (req, res) => {
    const { ip } = req.params;
    try {
        const response = await axios.get(`http://ip-api.com/json/${ip}`);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    
})