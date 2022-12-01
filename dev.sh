npm run copy-files:dev
npx tsc
npx concurrently "npx tsc --watch" "nodemon ./bin/www"