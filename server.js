const express = require('express');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const generateTerraform = require('./generateTerraform');
const validatePayload = require('./utils/validator');
const {runTerraform} = require('./utils/terraformRunner');

dotenv.config();
const app = express();
app.use(bodyParser.json());

app.post('/create/:resourceType', async (req, res) => {
    const { resourceType } = req.params;
    const config = req.body;
    const userId = req.body.userId || 'default';
    
    try {
    validatePayload(resourceType, config);
    // 👇 build serviceMap and call generateTerraform properly
    const serviceMap = { [resourceType]: config };
    const { dir: outputDir, success, output, error } = await generateTerraform(serviceMap);
    
    if (!success) {
      return res.status(500).json({ error });
    }
    
    res.json({
      message: 'Infra created successfully',
      output
    });
    } catch (error) {
    console.error('Terraform error:', error);
    res.status(400).json({ error: error.message });
    }
    });

app.post('/generate', async (req, res) => {
    const servicesMap = req.body;

    // Optional: validate here using utils/validator.js

    try {
        const result = await generateTerraform(servicesMap);
        res.json(result);
    } catch (err) {
        res.status(500).json({ error: 'Terraform generation failed', details: err });
    }
});

app.listen(3000, () => console.log('Dynamic MCP Infra API running on port 3000'));