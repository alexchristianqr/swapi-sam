# Kubernetes

Kubernetes es una plataforma de código abierto para automatizar la implementación, el escalado y la administración de aplicaciones en contenedores. El proyecto está amparado por la Cloud Native
Computing Foundation (CNCF).

## Official documentation

https://kubernetes.io/es/docs/concepts/overview/
https://docs.nginx.com/nginx-ingress-controller/intro/how-nginx-ingress-controller-works/
https://kubernetes.io/docs/concepts/services-networking/ingress/
https://docs.nginx.com/nginx-service-mesh/tutorials/kic/deploy-with-kic/#install-with-manifests
https://platform9.com/learn/v1.0/tutorials/nginix-controller-via-yaml

## Sample

```bash
# ---------------
# KUBERNETES PODS
# ---------------

# Pod tipo POD
kubectl -n default get pods
kubectl apply -f manifests/samples-kubernetes/pod.yml
kubectl delete -f manifests/samples-kubernetes/pod.yml
kubectl -n default get pods nginx-pod -o yaml
kubectl -n default delete pod nginx-pod

# Pod tipo DEPLOYMENT
kubectl -n default get pods -o wide
kubectl apply -f manifests/samples-kubernetes/pod-deployment.yml
kubectl delete -f manifests/samples-kubernetes/pod-deployment.yml
kubectl -n default get pods nginx-deployment-ID -o yaml
kubectl -n default delete pod nginx-deployment-ID

# Pod tipo DAEMON-SET
kubectl -n default get pods -o wide
kubectl apply -f manifests/samples-kubernetes/pod-daemonset.yml
kubectl delete -f manifests/samples-kubernetes/pod-daemonset.yml
kubectl -n default get pods nginx-daemonset-ID -o yaml
kubectl -n default delete pod nginx-daemonset-ID

# -------------------
# KUBERNETES SERVICES
# -------------------

# Pod servicio tipo CLUSTER-IP
kubectl -n default get pods -o wide
kubectl apply -f manifests/samples-kubernetes/service-clusterip.yml
kubectl delete -f manifests/samples-kubernetes/service-clusterip.yml
kubectl describe svc hello
kubectl exec -it nginx-pod -- sh
curl http://hello:3000 # Ejemplo ping

# Pod servicio tipo NODE-PORT
kubectl -n default get pods -o wide
kubectl apply -f manifests/samples-kubernetes/service-nodeport.yml
kubectl delete -f manifests/samples-kubernetes/service-nodeport.yml
kubectl -n ingress-nginx get svc -o wide
kubectl describe svc hello
kubectl exec -it nginx-pod -- sh
curl http://hello:3000 # Ejemplo ping

# Pod servicio tipo LOAD-BALANCER
kubectl -n default get pods -o wide
kubectl apply -f manifests/samples-kubernetes/service-loadbalancer.yml
kubectl delete -f manifests/samples-kubernetes/service-loadbalancer.yml
kubectl describe svc hello
kubectl exec -it nginx-pod -- sh
curl http://hello:3000 # Ejemplo ping

# -------------------
# KUBERNETES INGRESS
# -------------------

kubectl -n default get pods -o wide

kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v1.0.0/deploy/static/provider/cloud/deploy.yaml
kubectl delete -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v1.0.0/deploy/static/provider/cloud/deploy.yaml
kubectl get pods --all-namespaces -l app.kubernetes.io/name=ingress-nginx
kubectl get services ingress-nginx-controller --namespace=ingress-nginx

kubectl -n ingress-nginx get svc
kubectl apply -f manifests/samples-kubernetes/ingress-nginx.yml
kubectl delete -f manifests/samples-kubernetes/ingress-nginx.yml
kubectl get ing
curl http://kubernetes.docker.internal/v2 # Ejemplo de switch
```

## Kubernetes commands

```bash
# Versión del cliente de kubernetes
kubectl version --output=yaml

# Ayuda
kubectl --help
kubectl config get-contexts

# Configuración de kubernetes en yaml
kubectl config view

# Obtener  todos los pods
kubectl get all # Ver todos los servicios de kubernetes
kubectl get namespaces # Ver nombre del espacio o grupo
kubectl get nodes # Ver nodos del orquestador kubernetes
kubectl get pods # Ver pods
kubectl get svc # Ver servicios
kubectl get pvc # Ver los volumenes
kubectl get sts # Ver statefulset
kubectl get ing # Ver ingress

# Trabajar con los manifiestos
kubectl apply -f [NAME_FILE].yml # Crear yml
kubectl delete -f [NAME_FILE].yml # Eliminar yml definitivamente de kubernetes

# Acceder a la terminal del pod a traves de la API de kubernetes
kubectl exec -it [NAME_POD] -- sh

# Obtener los eventos de un pod
kubectl describe pod [NAME_POD] # Eventos de un pod
kubectl describe svc [NAME_POD] # Eventos de un servicio

# Obtener los pods del namespace [NAME_SPACE]="kube-system"
kubectl -n [NAME_SPACE] get pods # VEr pods
kubectl -n [NAME_SPACE] get pods -o wide # Mostrar mas columnas como "IP"
kubectl -n [NAME_SPACE] get pods [NAME_POD] -o yaml # Ver yml de un pod
kubectl -n [NAME_SPACE] delete pod [NAME_POD] # Eliminar pod y kuberneter lo creará nuevamente
```
