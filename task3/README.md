kubectl apply -f postgres.yaml -f deployment.yaml -f app-config.yaml
kubectl expose deployment hello-deployment