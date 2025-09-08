# Configure the Azure provider
terraform {
  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = "~> 4.42.0"
    }
  }

  required_version = ">= 1.1.0"
}

provider "azurerm" {
  features {}
}

resource "azurerm_resource_group" "rg" {
  name     = var.resource_group_name
  location = "Switzerland North"
  tags = {
    Environment = "Terraform Getting Started"
    Team        = "DevOps"
  }
}

# Create a virtual network
resource "azurerm_virtual_network" "vnet" {
  name                = "myTFVnet"
  address_space       = ["10.0.0.0/16"]
  location            = "Switzerland North"
  resource_group_name = azurerm_resource_group.rg.name
}

# Azure Container Registry
resource "azurerm_container_registry" "acr" {
  name                = "myTFContainerRegistry"
  resource_group_name = azurerm_resource_group.rg.name
  location            = azurerm_resource_group.rg.location
  sku                 = "Basic"
  admin_enabled       = true
}

# Web App for Containers 1

resource "azurerm_service_plan" "appserviceplan1" {
  name                = "myTFAppServicePlan1"
  location            = azurerm_resource_group.rg.location
  resource_group_name = azurerm_resource_group.rg.name
  os_type             = "Linux"
  sku_name            = "B1"
}


resource "azurerm_linux_web_app" "webapp1" {
  name                = var.webapp1_name
  location            = azurerm_resource_group.rg.location
  resource_group_name = azurerm_resource_group.rg.name
  service_plan_id     = azurerm_service_plan.appserviceplan1.id

  site_config {
    application_stack {
  docker_image_name = "nginx"
    }
  }
}


resource "azurerm_linux_web_app" "webapp2" {
  name                = var.webapp2_name
  location            = azurerm_resource_group.rg.location
  resource_group_name = azurerm_resource_group.rg.name
  service_plan_id     = azurerm_service_plan.appserviceplan1.id

  site_config {
    application_stack {
  docker_image_name = "nginx"
    }
  }
}