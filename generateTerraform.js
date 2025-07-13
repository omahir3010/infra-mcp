const fs = require('fs');
const path = require('path');
const templates = require('./templates');
const { v4: uuidv4 } = require('uuid');
const { runTerraform } = require('./utils/terraformRunner');

const generateTerraform = async (servicesMap) => {
const uniqueId = uuidv4(); // unique workspace per run
const dir = path.join(__dirname, 'output', uniqueId);
fs.mkdirSync(dir, { recursive: true });

const providerBlock = `provider "aws" { region = "${servicesMap?.ec2?.region || 'us-east-1'}" }`;

let resources = [providerBlock];

for (const [serviceName, config] of Object.entries(servicesMap)) {
const templateFn = templates[serviceName];
if (!templateFn) continue;
const tfCode = templateFn(config);
resources.push(tfCode);
}

const mainTf = resources.join('\n');
fs.writeFileSync(path.join(dir, 'main.tf'), mainTf);
console.log('✅ main.tf written to:', path.join(dir, 'main.tf'));
const result = await runTerraform(dir);
return { dir, ...result };
};

module.exports = generateTerraform;