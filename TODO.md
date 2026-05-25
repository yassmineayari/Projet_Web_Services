# TODO (RBAC simplification)

- [ ] Simplifier les guards RBAC pour réduire le nombre de fichiers / logique répétée.
- [ ] Utiliser un seul guard (RolesGuard) + @Roles sur les endpoints.
- [ ] Supprimer l’usage de RoleAuthorizationGuard (si redondant) ou supprimer le fichier si non nécessaire.
- [ ] Corriger la commande de test (pas besoin de `&&` sous cmd).

