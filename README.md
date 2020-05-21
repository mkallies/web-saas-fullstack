# web saas starter

## front end

Uses gatsby

## back end

Uses serverless

Boilerplate taken from https://github.com/postlight/serverless-babel-starter

## Copying this project into a new repo

```
npx degit --mode=git mkallies/web-saas-fullstack <folder-name>
```

## Checklist

- [] Change region if applicable (us-east-2 default)
- [] Change service name in serverless.yml
- [] Change table attributes and keyschema in resources/dynamodb-table.yml
- [] Change resource name (NotesTable) in resources/dynamodb-table.yml
- [] Change table name (custom block) in serverless.yml
- [] Change or remove s3-bucket.yml, uncommet in resources block in serverless.yml if needed
- [] Change cognito pool names in resources/cognito-user-pool.yml

Frontend

- [] Change gatsby-config site data
- [] Change client only route prefix in gatsby-config (currently set to /notes)
- [] Change folder 'notes' under pages to what the client only routes will be (dashboard, app, etc)
