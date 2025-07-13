module.exports = ({ region, cloudfrontOriginDomain }) => `
provider "aws" {
  region = "${region}"
}

resource "aws_cloudfront_distribution" "example" {
  origin {
    domain_name = "${cloudfrontOriginDomain}"
    origin_id   = "example-origin"
  }

  default_cache_behavior {
    allowed_methods  = ["GET", "HEAD"]
    cached_methods   = ["GET", "HEAD"]
    target_origin_id = "example-origin"

    viewer_protocol_policy = "redirect-to-https"

    forwarded_values {
      query_string = false

      cookies {
        forward = "none"
      }
    }
  }

  enabled         = true
  is_ipv6_enabled = true

  default_root_object = "index.html"

  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }

  viewer_certificate {
    cloudfront_default_certificate = true
  }
}
`;