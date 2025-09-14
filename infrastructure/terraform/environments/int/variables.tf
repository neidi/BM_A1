variable "resource_group_name" {
  default = "bma1-int-rg"
}

variable "webapp1_name" {
  default = "bma1-int-backend"
}

variable "webapp2_name" {
  default = "bma1-int-frontend"
}

variable "docker_registry_url" {
  default = "https://mgmtacr.azurecr.io"
}

variable "docker_registry_username_int" {
  description = "Docker registry username for int environment"
  type        = string
  sensitive   = true
}
variable "docker_registry_password_int" {
  description = "Docker registry password for int environment"
  type        = string
  sensitive   = true
}

# To set these securely, use environment variables before running terraform:
# export TF_VAR_docker_registry_username_int="your-username"
# export TF_VAR_docker_registry_password_int="your-password"
