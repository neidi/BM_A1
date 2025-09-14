variable "name" {}
variable "location" {}
variable "resource_group_name" {}
variable "service_plan_id" {}
variable "docker_image_name" {}
variable "docker_registry_url" {}
variable "docker_registry_username" {
  description = "Docker registry username"
  type        = string
  sensitive   = true
}
variable "docker_registry_password" {
  description = "Docker registry password"
  type        = string
  sensitive   = true
}

# To set these securely, use environment variables before running terraform:
# export TF_VAR_docker_registry_username="your-username"
# export TF_VAR_docker_registry_password="your-password"
variable "app_settings" {
  type    = map(string)
  default = {}
}
