output "resource_group_id" {
  value = azurerm_resource_group.rg.id
}
output "virtual_network_id" {
  value = azurerm_virtual_network.vnet.id
}


output "container_registry_id" {
  value = azurerm_container_registry.acr.id
}

output "webapp1_id" {
  value = azurerm_linux_web_app.webapp1.id
}

output "webapp2_id" {
  value = azurerm_linux_web_app.webapp2.id
}