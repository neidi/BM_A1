output "container_registry_admin_username" {
  value     = azurerm_container_registry.acr.admin_username
  sensitive = true
}

output "container_registry_admin_password" {
  value     = azurerm_container_registry.acr.admin_password
  sensitive = true
}
