# Login to the Azure Container Registry
az acr login -n mgmtacr.azurecr.io

# Get the outputs from the mgmt environment to use them in the int environment
cd environments/mgmt
terraform output container_registry_admin_username         
terraform output container_registry_admin_password

# set environment variables 
export TF_VAR_docker_registry_username_int="mgmtacr"
export TF_VAR_docker_registry_password_int="<the_password_you_got_from_the_previous_command>" 

# Deploy the int environment
cd ../int
terraform apply