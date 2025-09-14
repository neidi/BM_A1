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
