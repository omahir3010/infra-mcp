function validatePayload(resourceType, body) {
    const requiredFields = {
        ec2: ['region', 'instanceType', 'amiId'],
        s3: ['region', 'bucketName'],
        vpc: ['region', 'cidrBlock'],
        lambda: ['region', 'functionName', 'runtime', 'handler', 's3Bucket', 's3Key', 'roleArn'],
        cloudfront: ['region', 'bucketDomainName'],
        cognito: [
        'region',
        'userPoolName',
        'appClientName',
        'identityPoolName',
        'callbackUrls',
        'logoutUrls'
        ]
        };

    const missing = requiredFields[resourceType]?.filter(key => !body[key]) || [];
    if (missing.length) {
        throw new Error(`Missing fields: ${missing.join(', ')}`);
    }
}

module.exports = validatePayload;