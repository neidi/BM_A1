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

resource "azurerm_virtual_network" "vnet" {
  name                = "myTFVnet"
  address_space       = ["10.0.0.0/16"]
  location            = "Switzerland North"
  resource_group_name = azurerm_resource_group.int.name
}

resource "azurerm_service_plan" "appserviceplan1" {
  name                = "bma1-int-appserviceplan"
  location            = azurerm_resource_group.int.location
  resource_group_name = azurerm_resource_group.int.name
  os_type             = "Linux"
  sku_name            = "B1"
}

resource "azurerm_linux_web_app" "webapp1" {
  name                = var.webapp1_name
  location            = azurerm_resource_group.int.location
  resource_group_name = azurerm_resource_group.int.name
  service_plan_id     = azurerm_service_plan.appserviceplan1.id

  site_config {
    application_stack {
      docker_image_name        = "samples/todo-app:amd64"
      docker_registry_url      = var.docker_registry_url
      docker_registry_username = var.docker_registry_username_int
      docker_registry_password = var.docker_registry_password_int
    }
  }

  tags = {
    Environment = "int"
    Team        = "DevOps"
  }
  logs {
    detailed_error_messages = true
    failed_request_tracing  = true
    http_logs {
      file_system {
        retention_in_days = 0
        retention_in_mb   = 35
      }
    }
  }
}


resource "azurerm_linux_web_app" "webapp2" {
  name                = var.webapp2_name
  location            = azurerm_resource_group.int.location
  resource_group_name = azurerm_resource_group.int.name
  service_plan_id     = azurerm_service_plan.appserviceplan1.id

  site_config {
    application_stack {
      docker_image_name        = "samples/todo-app-frontend:amd64-beta001"
      docker_registry_url      = var.docker_registry_url
      docker_registry_username = var.docker_registry_username_int
      docker_registry_password = var.docker_registry_password_int
    }
  }

  app_settings = {
    NEXT_PUBLIC_API_BASE_URL = "https://${azurerm_linux_web_app.webapp1.default_hostname}"
  }

  tags = {
    Environment = "int"
  }

  logs {
    detailed_error_messages = true
    failed_request_tracing  = true
    http_logs {
      file_system {
        retention_in_days = 0
        retention_in_mb   = 35
      }
    }
  }
}
