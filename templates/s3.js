module.exports = ({ region, bucketName }) => `

resource "aws_s3_bucket" "example" {
bucket = "${bucketName}"

tags = {
Name = "MCP-Bucket"
Environment = "Dev"
}
}
`;

