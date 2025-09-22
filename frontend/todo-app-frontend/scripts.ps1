#build app for amd64 processors
docker buildx build --platform linux/amd64 -t todo-app-frontend:amd64-beta001 --build-arg BACKEND_URL=https://bma1-int-backend.azurewebsites.net/ .

#tag image for pushing to ACR
docker tag todo-app-frontend:amd64 mgmtacr.azurecr.io/samples/todo-app-frontend:amd64

#push image to ACR
docker push mgmtacr.azurecr.io/samples/todo-app-frontend:amd64 