# 🛠️ Dynamic Infrastructure Provisioning with Terraform + MCP

This project is an AI-driven platform that provisions AWS infrastructure dynamically using user prompts. It leverages:

* Terraform for infrastructure-as-code
* An MCP (Model Context Protocol) client-server architecture
* Node.js backend
* Pre-defined modular templates for AWS resources (e.g., EC2, S3, Lambda, Cognito)
* REST APIs to create infrastructure based on input JSON or natural language mapped payloads

## 🌐 Architecture Overview
`
1. User sends a prompt or a structured config JSON (e.g., via curl or frontend).
2. The MCP server identifies the resource(s) requested and the intent.
3. Based on the identified resource type(s), the tool loads the appropriate Terraform templates.
4. Templates are filled with user input (or default values).
5. Terraform commands are run per request in isolated workspaces.
6. The infrastructure is provisioned in AWS.
7. Outputs and errors (if any) are returned.

## 📁 Project Structure

```
.
├── templates/
│   ├── ec2.js
│   ├── s3.js
│   ├── vpc.js
│   ├── lambda.js
│   ├── cognito.js
│   ├── cloudfront.js
├── utils/
│   ├── terraformRunner.js
│   ├── validator.js
├── output/
│   └── (auto-generated Terraform files per request)
├── server.js
├── generateTerraform.js
├── .env
└── README.md
```

## 🚀 Supported AWS Resources

* EC2 Instance
* S3 Bucket
* VPC
* Lambda Function
* Cognito User Pool
* CloudFront Distribution
* DynamoDB Table (optional)

## 📦 Requirements

* Node.js (v14+)
* Terraform CLI installed & accessible in PATH
* AWS credentials configured via `~/.aws/credentials` or environment variables

## 🔒 AWS Credentials Setup

Configure your `~/.aws/credentials` file or add these to your `.env` file:

```
AWS_ACCESS_KEY_ID=your-access-key
AWS_SECRET_ACCESS_KEY=your-secret
AWS_REGION=us-east-1
```

## 💡 Usage

### 1. Start the server:

```bash
npm install
node server.js
```

### 2. Make a request to create a resource (example: EC2)

```bash
curl -X POST http://localhost:3000/create/ec2 \
  -H "Content-Type: application/json" \
  -d '{
    "region": "us-east-1",
    "instanceType": "t2.micro",
    "amiId": "ami-0abcdef1234567890",
    "keyName": "your-keypair"
}'
```

### 3. Response will include:

* Infra creation status
* Terraform stdout output
* Error if any

## 🌐 /generate endpoint

To create multiple resources in a single payload:

### POST /generate

Payload example:

```json
{
  "ec2": { ... },
  "s3": { ... },
  "lambda": { ... }
}
```

## ✅ MCP Context

* The tool acts as an MCP server
* It receives prompts or API payloads from an MCP-compatible client (LLM)
* Maps resource types and fills in Terraform-compatible configurations
* Supports dynamic, multi-resource infrastructure provisioning

## 🔒 Best Practices

* Terraform state is isolated per user using UUID workspaces.
* Follows Principle of Least Privilege in IAM roles.
* Validates required fields per resource before provisioning.

## 📌 Notes

* Ensure your AWS credentials have sufficient permissions (ec2, s3, iam, cognito, lambda, etc.).
* Each Terraform run creates a fresh working directory inside `output/`.

## 📤 Cleanup

To destroy the infrastructure, store the workspace ID from creation and run:

```bash
cd output/<workspace_id>
terraform destroy
```

## 📙 Future Improvements

* LLM-driven prompt → config mapping using Bedrock/Gemini/OpenAI
* Infra preview before apply
* Delete/modify endpoints
* Integration with Secrets Manager
* Frontend UI

## 🧑‍💻 Inspired by Platform Engineering + Agentic Workflows

This project blends platform engineering principles with the agentic architecture of MCP.
