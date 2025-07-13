// terraformRunner.js
const { exec } = require('child_process');

const runCommand = (cmd, cwd) =>
    new Promise((resolve, reject) =>
        exec(cmd, { cwd }, (err, stdout, stderr) => {
            if (err) reject(stderr);
            else resolve(stdout);
        })
    );

const runTerraform = async (dir) => {
    console.log(dir)
    try {
        await runCommand('terraform init', dir);
        const applyOutput = await runCommand('terraform apply -auto-approve', dir);
        return { success: true, output: applyOutput };
    } catch (error) {
        return { success: false, error };
    }
};

module.exports = { runTerraform };