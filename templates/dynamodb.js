module.exports = ({ region, tableName, hashKey }) => `
provider "aws" {
region = "${region}"
}

resource "aws_dynamodb_table" "example" {
name = "${tableName}"
billing_mode = "PAY_PER_REQUEST"
hash_key = "${hashKey}"

attribute {
name = "${hashKey}"
type = "S"
}

tags = {
Name = "MCP-Dynamo"
}
}
`;