provider "azurerm" {
  features {}
}

resource "azurerm_resource_group" "int" {
  name     = var.resource_group_name
  location = "Switzerland North"
  tags = {
    Environment = "int"
    Team        = "DevOps"
  }
}

resource "azurerm_service_plan" "appserviceplan1" {
  name                = "bma1-int-appserviceplan"
  location            = azurerm_resource_group.int.location
  resource_group_name = azurerm_resource_group.int.name
  os_type             = "Linux"
  sku_name            = "B1"
}

module "webapp1" {
  source                  = "../../modules/webapp"
  name                    = var.webapp1_name
  location                = azurerm_resource_group.int.location
  resource_group_name     = azurerm_resource_group.int.name
  service_plan_id         = azurerm_service_plan.appserviceplan1.id
  docker_image_name       = "samples/todo-app:amd64"
  docker_registry_url     = var.docker_registry_url
  docker_registry_username = var.docker_registry_username_int
  docker_registry_password = var.docker_registry_password_int
  app_settings            = {}
}


module "webapp2" {
  source                  = "../../modules/webapp"
  name                    = var.webapp2_name
  location                = azurerm_resource_group.int.location
  resource_group_name     = azurerm_resource_group.int.name
  service_plan_id         = azurerm_service_plan.appserviceplan1.id
  docker_image_name       = "samples/todo-app-frontend:amd64-beta001"
  docker_registry_url     = var.docker_registry_url
  docker_registry_username = var.docker_registry_username_int
  docker_registry_password = var.docker_registry_password_int
  app_settings = {
    NEXT_PUBLIC_API_BASE_URL = "https://${module.webapp1.default_hostname}"
  }
}
