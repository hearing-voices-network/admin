#!/usr/bin/env bash

# Requires the following environment variables:
# $TRAVIS_BRANCH = The branch the build is against.

# Bail out on first error.
set -e

# Get the environment from the branch.
case ${TRAVIS_BRANCH} in
    master )
        ENVIRONMENT=production
        ;;
    develop )
        ENVIRONMENT=staging
        ;;
esac

# Declare the configuration variables for the deployment.
echo "Setting deployment configuration for ${ENVIRONMENT}..."
ENV_SECRET_ID=".env.admin.${ENVIRONMENT}"

# Get the .env file.
echo "Downloading .env file..."
rm -f .env
aws secretsmanager get-secret-value \
    --secret-id ${ENV_SECRET_ID} | \
    python -c "import json,sys;obj=json.load(sys.stdin);print obj['SecretString'];" > .env

# Build.
echo "Building..."
npm run generate

# Deploy to S3.
echo "Deploying to S3..."
aws s3 sync ./dist s3://${AWS_S3_BUCKET}/ \
  --acl public-read \
  --delete

# Invalidate CloudFornt distribution.
echo "Invalidating CloudFront distribution..."
aws cloudfront create-invalidation \
  --distribution-id $AWS_DISTRIBUTION_ID \
  --paths /*