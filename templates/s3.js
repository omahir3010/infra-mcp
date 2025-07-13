module.exports = ({ region, bucketName }) => `
provider "aws" {
region = "${region}"
}

resource "aws_s3_bucket" "example" {
bucket = "${bucketName}"

tags = {
Name = "MCP-Bucket"
Environment = "Dev"
}
}
`;

