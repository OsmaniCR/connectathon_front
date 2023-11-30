echo "Switching to branch main"
git checkout main

echo "Building app ..."
npm run build

echo "Deploying files to server ..."
scp -P 22 -r dist/* root@IP....Ruta de deployment

echo "Deployment Complete!"