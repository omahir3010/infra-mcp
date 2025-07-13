module.exports = ({ region, cidrBlock, subnetCidr }) => `
provider "aws" {
region = "${region}"
}

resource "aws_vpc" "main" {
cidr_block = "${cidrBlock}"

tags = {
Name = "MCP-VPC"
}
}

resource "aws_subnet" "public" {
vpc_id = aws_vpc.main.id
cidr_block = "${subnetCidr}"

tags = {
Name = "MCP-Public-Subnet"
}
}
`;