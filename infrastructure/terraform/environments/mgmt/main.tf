provider "azurerm" {
  features {}
}

resource "azurerm_resource_group" "mgmt" {
  name     = var.mgmt_resource_group_name
  location = "Switzerland North"
  tags = {
    Environment = "mgmt"
    Team        = "DevOps"
  }
}

resource "azurerm_container_registry" "acr" {
  name                = "mgmtacr"
  resource_group_name = azurerm_resource_group.mgmt.name
  location            = azurerm_resource_group.mgmt.location
  sku                 = "Basic"
  admin_enabled       = true
}

# After creating the container registry, retrieve the admin username and password
# and set them as environment variables for use in other environments.
# Then you have to push your Docker images to this registry before deploying web apps.