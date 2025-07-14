module.exports = ({ region, instanceType, amiId, keyName }) => `

resource "aws_instance" "example" {
ami = "${amiId}"
instance_type = "${instanceType}"
${keyName ? key_name = "${keyName}" : ''}

tags = {
Name = "MCP-EC2"
}
}
`;