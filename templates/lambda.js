module.exports = ({ lambdaName, runtime, handler, s3Bucket, s3Key }) => `
resource "aws_iam_role" "lambda_exec_role" {
name = "${lambdaName}-exec-role"

assume_role_policy = jsonencode({
Version = "2012-10-17",
Statement = [
{
Action = "sts:AssumeRole",
Effect = "Allow",
Principal = {
Service = "lambda.amazonaws.com"
}
}
]
})
}

resource "aws_iam_role_policy_attachment" "lambda_basic_exec" {
role = aws_iam_role.lambda_exec_role.name
policy_arn = "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole"
}

resource "aws_lambda_function" "example" {
function_name = "${lambdaName}"
s3_bucket = "${s3Bucket}"
s3_key = "${s3Key}"
runtime = "${runtime}"
handler = "${handler}"
role = aws_iam_role.lambda_exec_role.arn

timeout = 10
memory_size = 128
}
`;